import { beforeEach, expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as blobHandlePermission from '../src/parts/blobHandlePermission/blobHandlePermission.ts'
import { setFactory } from '../src/parts/RendererProcess/RendererProcess.ts'

const mockInvoke = jest.fn<(method: string, ...args: readonly unknown[]) => Promise<unknown>>()
const mockRpc = MockRpc.create({
  commandMap: {},
  invoke: mockInvoke,
})

beforeEach(() => {
  jest.resetAllMocks()
  setFactory(async () => mockRpc)
})

test('requestPermission', async () => {
  const mockHandle = { kind: 'file', name: 'file1' } as blobHandle
  const options = { mode: 'read' as const }
  mockInvoke.mockImplementation(async (method: string) => {
    if (method === 'blobHandle.requestPermission') {
      return 'granted' as PermissionState
    }
    throw new Error(`unexpected method ${method}`)
  })
  const result = await blobHandlePermission.requestPermission(mockHandle, options)
  expect(result).toBe('granted')
  expect(mockInvoke).toHaveBeenCalledWith('blobHandle.requestPermission', mockHandle, options)
})

test('queryPermission', async () => {
  const mockQueryPermission = jest.fn<(options: Readonly<{ mode?: 'read' | 'readwrite' }>) => Promise<PermissionState>>().mockResolvedValue('granted')
  const mockHandle = {
    kind: 'file',
    name: 'file1',
    queryPermission: mockQueryPermission,
  } as unknown as blobHandle & { queryPermission: (options: Readonly<{ mode?: 'read' | 'readwrite' }>) => Promise<PermissionState> }
  const options = { mode: 'read' as const }
  const result = await blobHandlePermission.queryPermission(mockHandle, options)
  expect(result).toBe('granted')
  expect(mockQueryPermission).toHaveBeenCalledWith(options)
})
