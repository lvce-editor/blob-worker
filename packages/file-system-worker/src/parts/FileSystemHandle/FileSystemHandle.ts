import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const getFileHandles = (ids: readonly string[]): Promise<blobHandle[]> => {
  return RendererProcess.invoke('FileHandles.get', ids) as Promise<blobHandle[]>
}

export const addFileHandle = (fileHandle: blobHandle): Promise<void> => {
  return RendererProcess.invoke('blobHandle.addFileHandle', fileHandle) as Promise<void>
}
