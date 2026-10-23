import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'

// Keep Blobs inside the browser so the round trip also tests structured cloning
// across the candidate worker's actual RPC boundary.
declare global {
  var invokeBlobCommand: (method: string, ...params: unknown[]) => Promise<any>
  var disposeBlobWorker: () => void
}

test.beforeEach(async ({ page }) => {
  const bundle = await readFile(new URL('../../../.tmp/dist/dist/blobWorkerMain.js', import.meta.url))
  await page.route('https://blob-worker.test/**', async (route) => {
    if (route.request().url().endsWith('/worker.js')) {
      await route.fulfill({ body: bundle, contentType: 'text/javascript' })
    } else {
      await route.fulfill({ body: '<!doctype html><title>Blob worker test</title>', contentType: 'text/html' })
    }
  })
  await page.goto('https://blob-worker.test/')
  await page.evaluate(async () => {
    const worker = new Worker('/worker.js', { type: 'module' })
    const { port1, port2 } = new MessageChannel()
    let nextId = 1
    const pending = new Map<number, { resolve: (value: any) => void; reject: (error: Error) => void }>()
    port1.onmessage = ({ data }) => {
      const callback = pending.get(data.id)
      if (!callback) {
        return
      }
      pending.delete(data.id)
      if (data.error) {
        callback.reject(new Error(data.error.message))
      } else {
        callback.resolve(data.result)
      }
    }
    globalThis.invokeBlobCommand = (method, ...params) => {
      const id = nextId++
      return new Promise((resolve, reject) => {
        pending.set(id, { reject, resolve })
        port1.postMessage({ id, jsonrpc: '2.0', method, params })
      })
    }
    globalThis.disposeBlobWorker = () => {
      port1.close()
      worker.terminate()
    }
    await new Promise<void>((resolve, reject) => {
      worker.onerror = (event) => reject(new Error(event.message))
      worker.onmessage = () => resolve()
      worker.postMessage({ id: 0, jsonrpc: '2.0', method: 'initialize', params: ['message-port', port2] }, [port2])
    })
  })
})

test.afterEach(async ({ page }) => {
  await page.evaluate(() => globalThis.disposeBlobWorker?.())
})

test('base64 round trip through the candidate worker', async ({ page }) => {
  const text = await page.evaluate(async () => {
    const blob = await invokeBlobCommand('Blob.base64StringToBlob', 'SGVsbG8gV29ybGQ=')
    return invokeBlobCommand('Blob.blobToBinaryString', blob)
  })
  expect(text).toBe('Hello World')
})

test('binary string preserves Blob size and type', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const blob = await invokeBlobCommand('Blob.binaryStringToBlob', 'Hello World', 'text/plain')
    return { size: blob.size, type: blob.type }
  })
  expect(result).toEqual({ size: 11, type: 'text/plain' })
})

test('invalid base64 returns the normalized error', async ({ page }) => {
  await expect(page.evaluate(() => invokeBlobCommand('Blob.base64StringToBlob', '!!!invalid!!!'))).rejects.toThrow('Failed to convert base64 string to blob')
})
