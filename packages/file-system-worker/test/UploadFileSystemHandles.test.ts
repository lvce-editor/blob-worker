/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { setFactory } from '../src/parts/RendererProcess/RendererProcess.ts'
import * as UploadblobHandles from '../src/parts/UploadblobHandles/UploadblobHandles.ts'

// @ts-ignore
globalThis.ProgressEvent = class ProgressEvent extends Event {
  constructor(type: string, init?: any) {
    super(type, init)
    this.target = init?.target
  }
  target: any
}

// @ts-ignore
globalThis.FileReader = class FileReader extends EventTarget {
  result: string | ArrayBuffer | null = null
  readyState: number = 0
  error: Error | null = null
  onload: ((event: any) => void) | null = null
  onerror: ((event: any) => void) | null = null
  onloadend: ((event: any) => void) | null = null

  readAsBinaryString(blob: Blob): void {
    this.readyState = 1
    blob
      .arrayBuffer()
      .then((buffer) => {
        const bytes = new Uint8Array(buffer)
        let binaryString = ''
        for (let i = 0; i < bytes.length; i++) {
          binaryString += String.fromCodePoint(bytes[i])
        }
        this.result = binaryString
        this.readyState = 2
        if (this.onload) {
          this.onload({ target: this })
        }
        if (this.onloadend) {
          this.onloadend({ target: this })
        }
      })
      .catch((error) => {
        this.error = error
        this.readyState = 2
        if (this.onerror) {
          this.onerror({ target: this })
        }
        if (this.onloadend) {
          this.onloadend({ target: this })
        }
      })
  }
}

test('uploadblobHandles with single directory', async () => {
  const mockRendererInvoke = jest.fn<(method: string, ...args: readonly unknown[]) => Promise<unknown>>()
  mockRendererInvoke.mockImplementation(async (method: string) => {
    if (method === 'PersistentFileHandle.addHandle') {
      return
    }
    if (method === 'Workspace.setPath') {
      return
    }
    throw new Error(`unexpected method ${method}`)
  })
  const rpc = MockRpc.create({
    commandMap: {},
    invoke: mockRendererInvoke,
  })
  setFactory(async () => rpc)

  const mockDirectoryHandle = {
    kind: 'directory',
    name: 'folder1',
  } as blobDirectoryHandle

  const result = await UploadblobHandles.uploadblobHandles('/root', '/', [mockDirectoryHandle])

  expect(result).toBe(true)
  expect(mockRendererInvoke).toHaveBeenCalledWith('PersistentFileHandle.addHandle', '/folder1', mockDirectoryHandle)
  expect(mockRendererInvoke).toHaveBeenCalledWith('Workspace.setPath', 'html:///folder1')
})

test('uploadblobHandles with single file', async () => {
  const blobProcess = await import('../src/parts/blobProcess/blobProcess.ts')
  const UploadblobHandles = await import('../src/parts/UploadblobHandles/UploadblobHandles.ts')

  const mockblobInvoke = jest.fn<(method: string, ...args: readonly unknown[]) => Promise<unknown>>()
  blobProcess.set({
    invoke: mockblobInvoke,
  } as any)

  const mockRendererInvoke = jest.fn<(method: string, ...args: readonly unknown[]) => Promise<unknown>>()
  mockRendererInvoke.mockImplementation(async (method: string) => {
    if (method === 'Blob.blobToBinaryString') {
      return 'file content'
    }
    throw new Error(`unexpected method ${method}`)
  })
  const rpc = MockRpc.create({
    commandMap: {},
    invoke: mockRendererInvoke,
  })
  setFactory(async () => rpc)

  mockblobInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.writeFile') {
      return
    }
    throw new Error(`unexpected method ${method}`)
  })

  const mockFile = new File(['file content'], 'file1.txt')
  const mockGetFile = jest.fn<() => Promise<File>>().mockResolvedValue(mockFile)
  const mockFileHandle = {
    getFile: mockGetFile,
    kind: 'file',
    name: 'file1.txt',
  } as unknown as blobFileHandle

  const result = await UploadblobHandles.uploadblobHandles('/root', '/', [mockFileHandle])

  expect(result).toBe(false)
  expect(mockblobInvoke).toHaveBeenCalledWith('blob.writeFile', '/root/file1.txt', 'file content')
})

test('uploadblobHandles with multiple handles', async () => {
  const blobProcess = await import('../src/parts/blobProcess/blobProcess.ts')
  const UploadblobHandles = await import('../src/parts/UploadblobHandles/UploadblobHandles.ts')

  const mockFile = new File(['file content'], 'file1.txt')
  const mockChildFile = new File(['child content'], 'file2.txt')

  const mockblobInvoke = jest.fn<(method: string, ...args: readonly unknown[]) => Promise<unknown>>()
  blobProcess.set({
    invoke: mockblobInvoke,
  } as any)

  const mockRendererInvoke = jest.fn<(method: string, ...args: readonly unknown[]) => Promise<unknown>>()
  mockRendererInvoke.mockImplementation(async (method: string, ...args: readonly unknown[]) => {
    if (method === 'Blob.blobToBinaryString') {
      const file = args[0] as File | undefined
      if (file === mockFile) {
        return 'file content'
      }
      if (file === mockChildFile) {
        return 'child content'
      }
      return 'content'
    }
    throw new Error(`unexpected method ${method}`)
  })
  const rpc = MockRpc.create({
    commandMap: {},
    invoke: mockRendererInvoke,
  })
  setFactory(async () => rpc)

  mockblobInvoke.mockImplementation(async (method: string) => {
    if (method === 'blob.writeFile') {
      return
    }
    if (method === 'blob.mkdir') {
      return
    }
    throw new Error(`unexpected method ${method}`)
  })

  const mockGetFile = jest.fn<() => Promise<File>>().mockResolvedValue(mockFile)
  const mockFileHandle = {
    getFile: mockGetFile,
    kind: 'file',
    name: 'file1.txt',
  } as unknown as blobFileHandle
  const mockChildGetFile = jest.fn<() => Promise<File>>().mockResolvedValue(mockChildFile)
  const mockChildHandle = {
    getFile: mockChildGetFile,
    kind: 'file',
    name: 'file2.txt',
  } as unknown as blobFileHandle
  const mockValues = async function* (): AsyncGenerator<blobHandle, void, unknown> {
    yield mockChildHandle as blobHandle
  }
  const mockDirectoryHandle = {
    kind: 'directory',
    name: 'folder1',
    values: jest.fn().mockReturnValue(mockValues()),
  } as unknown as blobDirectoryHandle

  const result = await UploadblobHandles.uploadblobHandles('/root', '/', [mockFileHandle, mockDirectoryHandle])

  expect(result).toBe(false)
  expect(mockblobInvoke).toHaveBeenCalledWith('blob.writeFile', '/root/file1.txt', 'file content')
  expect(mockblobInvoke).toHaveBeenCalledWith('blob.mkdir', '/root/folder1')
})

test('uploadblobHandles with empty array', async () => {
  const blobProcess = await import('../src/parts/blobProcess/blobProcess.ts')
  const UploadblobHandles = await import('../src/parts/UploadblobHandles/UploadblobHandles.ts')

  const mockblobInvoke = jest.fn<(method: string, ...args: readonly unknown[]) => Promise<unknown>>()
  blobProcess.set({
    invoke: mockblobInvoke,
  } as any)

  const mockRendererInvoke = jest.fn<(method: string, ...args: readonly unknown[]) => Promise<unknown>>()
  const rpc = MockRpc.create({
    commandMap: {},
    invoke: mockRendererInvoke,
  })
  setFactory(async () => rpc)

  const result = await UploadblobHandles.uploadblobHandles('/root', '/', [])

  expect(result).toBe(false)
  expect(mockblobInvoke).not.toHaveBeenCalled()
  expect(mockRendererInvoke).not.toHaveBeenCalled()
})
