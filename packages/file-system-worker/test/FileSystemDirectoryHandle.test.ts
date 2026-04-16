import { expect, jest, test } from '@jest/globals'
import * as blobDirectoryHandle from '../src/parts/blobDirectoryHandle/blobDirectoryHandle.ts'

test('getFileHandle', async () => {
  const mockFileHandle = { kind: 'file', name: 'file1' } as blobFileHandle
  const mockGetFileHandle = jest.fn<(name: string) => Promise<blobFileHandle>>().mockResolvedValue(mockFileHandle)
  const mockHandle = {
    getFileHandle: mockGetFileHandle,
  } as unknown as blobDirectoryHandle
  const result = await blobDirectoryHandle.getFileHandle(mockHandle, 'file1')
  expect(result).toBe(mockFileHandle)
  expect(mockGetFileHandle).toHaveBeenCalledWith('file1')
})

test('getChildHandles', async () => {
  const mockChildHandle = { kind: 'file', name: 'file1' }
  const mockValues = async function* (): AsyncGenerator<blobHandle, void, unknown> {
    yield mockChildHandle as blobHandle
  }
  const mockHandle = {
    values: jest.fn().mockReturnValue(mockValues()),
  } as unknown as blobDirectoryHandle
  const result = await blobDirectoryHandle.getChildHandles(mockHandle)
  expect(result).toEqual([mockChildHandle])
})
