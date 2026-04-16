import * as FileHandleType from '../FileHandleType/FileHandleType.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'
import * as UploadblobHandle from '../UploadblobHandle/UploadblobHandle.ts'

const uploadHandles = async (blobHandles: readonly blobHandle[], pathSeparator: string, root: string): Promise<void> => {
  for (const blobHandle of blobHandles) {
    await UploadblobHandle.uploadHandle(blobHandle, pathSeparator, root, uploadHandles)
  }
}

export const uploadblobHandles = async (root: string, pathSeparator: string, blobHandles: readonly blobHandle[]): Promise<boolean> => {
  if (blobHandles.length === 1) {
    const file = blobHandles[0]
    const { kind, name } = file
    if (kind === FileHandleType.Directory) {
      await RendererProcess.invoke('PersistentFileHandle.addHandle', `/${name}`, file)
      await RendererProcess.invoke('Workspace.setPath', `html:///${name}`)
      return true
    }
  }
  await uploadHandles(blobHandles, pathSeparator, root)
  return false
}
