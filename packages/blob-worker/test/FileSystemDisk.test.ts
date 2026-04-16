import { beforeEach, expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as blobDisk from '../src/parts/blobDisk/blobDisk.js'
import * as blobProcess from '../src/parts/blobProcess/blobProcess.js'

const mockInvoke = jest.fn<(method: string, ...args: readonly unknown[]) => Promise<unknown>>()
const mockRpc = MockRpc.create({
  commandMap: {},
  invoke: mockInvoke,
})
blobProcess.set(mockRpc)

beforeEach(() => {
  jest.resetAllMocks()
})

test('remove', async () => {
  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.remove') {
      return
    }
    throw new Error(`unexpected method ${method}`)
  })
  await blobDisk.remove('/test/path')
})

test('readFile', async () => {
  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.readFile') {
      return 'file content'
    }
    throw new Error(`unexpected method ${method}`)
  })
  const content = await blobDisk.readFile('/test/path')
  expect(content).toBe('file content')
})

test('readDirWithFileTypes', async () => {
  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.readDirWithFileTypes') {
      return [{ name: 'file1' }, { name: 'file2' }]
    }
    throw new Error(`unexpected method ${method}`)
  })
  const files = await blobDisk.readDirWithFileTypes('/test/path')
  expect(files).toEqual([{ name: 'file1' }, { name: 'file2' }])
})

test('getPathSeparator', async () => {
  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.getPathSeparator') {
      return '/'
    }
    throw new Error(`unexpected method ${method}`)
  })
  const separator = await blobDisk.getPathSeparator('/test/path')
  expect(separator).toBe('/')
})

test('readJson', async () => {
  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.readJson') {
      return { key: 'value' }
    }
    throw new Error(`unexpected method ${method}`)
  })
  const json = await blobDisk.readJson('/test/path')
  expect(json).toEqual({ key: 'value' })
})

test('getRealPath', async () => {
  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.getRealPath') {
      return '/real/path'
    }
    throw new Error(`unexpected method ${method}`)
  })
  const path = await blobDisk.getRealPath('/test/path')
  expect(path).toBe('/real/path')
})

test('stat', async () => {
  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.stat') {
      return { size: 100 }
    }
    throw new Error(`unexpected method ${method}`)
  })
  const stats = await blobDisk.stat('/test/path')
  expect(stats).toEqual({ size: 100 })
})

test('createFile', async () => {
  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.writeFile') {
      return
    }
    throw new Error(`unexpected method ${method}`)
  })
  await blobDisk.createFile('/test/path')
})

test('writeFile', async () => {
  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.writeFile') {
      return
    }
    throw new Error(`unexpected method ${method}`)
  })
  await blobDisk.writeFile('/test/path', 'content')
})

test('writeBlob', async () => {
  const blob = new Blob(['abc'])
  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.writeBuffer') {
      return
    }
    throw new Error(`unexpected method ${method}`)
  })
  await blobDisk.writeBlob('file:///test/path', blob)
})

test('mkdir', async () => {
  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.mkdir') {
      return
    }
    throw new Error(`unexpected method ${method}`)
  })
  await blobDisk.mkdir('/test/path')
})

test('rename', async () => {
  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.rename') {
      return
    }
    throw new Error(`unexpected method ${method}`)
  })
  await blobDisk.rename('/old/path', '/new/path')
})

test('copy', async () => {
  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.copy') {
      return
    }
    throw new Error(`unexpected method ${method}`)
  })
  await blobDisk.copy('/old/path', '/new/path')
})
