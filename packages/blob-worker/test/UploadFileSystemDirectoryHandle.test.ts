import { beforeEach, expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as blobProcess from '../src/parts/blobProcess/blobProcess.ts'
import * as UploadblobDirectoryHandle from '../src/parts/UploadblobDirectoryHandle/UploadblobDirectoryHandle.ts'

const mockInvoke = jest.fn<(method: string, ...args: readonly unknown[]) => Promise<unknown>>()
const mockRpc = MockRpc.create({
  commandMap: {},
  invoke: mockInvoke,
})
blobProcess.set(mockRpc)

beforeEach(() => {
  jest.resetAllMocks()
})

test('uploadDirectory', async () => {
  const mockChildHandle = { kind: 'file', name: 'file1' } as blobHandle
  const mockValues = async function* (): AsyncGenerator<blobHandle, void, unknown> {
    yield mockChildHandle
  }
  const mockDirectoryHandle = {
    kind: 'directory',
    name: 'folder1',
    values: jest.fn().mockReturnValue(mockValues()),
  } as unknown as blobDirectoryHandle

  const mockUploadHandles = jest.fn<(blobHandles: readonly blobHandle[], pathSeparator: string, root: string) => Promise<void>>()

  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.mkdir') {
      return
    }
    throw new Error(`unexpected method ${method}`)
  })

  await UploadblobDirectoryHandle.uploadDirectory(mockDirectoryHandle, '/', '/root', mockUploadHandles)

  expect(mockInvoke).toHaveBeenCalledWith('blob.mkdir', '/root/folder1')
  expect(mockUploadHandles).toHaveBeenCalledWith([mockChildHandle], '/', '/root/folder1')
})
