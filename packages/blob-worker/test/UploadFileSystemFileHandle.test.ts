import { beforeEach, expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as blobProcess from '../src/parts/blobProcess/blobProcess.ts'
import { setFactory } from '../src/parts/RendererProcess/RendererProcess.ts'
import * as UploadblobFileHandle from '../src/parts/UploadblobFileHandle/UploadblobFileHandle.ts'

const mockblobInvoke = jest.fn<(method: string, ...args: readonly unknown[]) => Promise<unknown>>()
const mockblobRpc = MockRpc.create({
  commandMap: {},
  invoke: mockblobInvoke,
})

const mockRendererInvoke = jest.fn<(method: string, ...args: readonly unknown[]) => Promise<unknown>>()
const mockRendererRpc = MockRpc.create({
  commandMap: {},
  invoke: mockRendererInvoke,
})

beforeEach(() => {
  jest.resetAllMocks()
  blobProcess.set(mockblobRpc)
  setFactory(async () => mockRendererRpc)
})

test.skip('uploadFile', async () => {
  const mockFile = new File(['file content'], 'file1.txt')
  const mockGetFile = jest.fn<() => Promise<File>>().mockResolvedValue(mockFile)
  const mockFileHandle = {
    getFile: mockGetFile,
    kind: 'file',
    name: 'file1.txt',
  } as unknown as blobFileHandle

  mockblobInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.writeFile') {
      return
    }
    throw new Error(`unexpected method ${method}`)
  })

  mockRendererInvoke.mockImplementation(async (method: string) => {
    if (method === 'Blob.blobToBinaryString') {
      return 'file content'
    }
    throw new Error(`unexpected method ${method}`)
  })

  await UploadblobFileHandle.uploadFile(mockFileHandle, '/', '/root')

  expect(mockRendererInvoke).toHaveBeenCalledWith('Blob.blobToBinaryString', mockFile)
  expect(mockblobInvoke).toHaveBeenCalledWith('blob.writeFile', '/root/file1.txt', 'file content')
})
