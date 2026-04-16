import { beforeAll, expect, test } from '@jest/globals'
import { createblobProcessRpcNode } from '../src/parts/CreateblobProcessRpcNode/CreateblobProcessRpcNode.js'

beforeAll(() => {
  // @ts-ignore
  globalThis.location = {
    href: 'http://localhost:3000',
    protocol: 'http:',
  }
})

test('creates file system process rpc', async () => {
  // @ts-ignore
  globalThis.WebSocket = class MockWebSocket extends EventTarget {
    constructor() {
      super()

      setTimeout((): void => {
        this.dispatchEvent(new Event('open'))
      }, 0)
    }

    close(): void {}
  }
  const rpc = await createblobProcessRpcNode()
  expect(rpc).toBeDefined()
  await rpc.dispose()
})

test('handles error when creating file system process rpc', async () => {
  // @ts-ignore
  globalThis.WebSocket = class MockWebSocket extends EventTarget {
    constructor() {
      super()

      setTimeout((): void => {
        this.dispatchEvent(new Event('close'))
      }, 0)
    }

    close(): void {}
  }
  await expect(createblobProcessRpcNode()).rejects.toThrow(new Error('Failed to create file system process rpc: IpcError: Websocket connection was immediately closed'))
})
