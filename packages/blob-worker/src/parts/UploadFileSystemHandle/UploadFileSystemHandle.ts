import * as FileHandleType from '../FileHandleType/FileHandleType.ts'
import * as UploadblobDirectoryHandle from '../UploadblobDirectoryHandle/UploadblobDirectoryHandle.ts'
import * as UploadblobFileHandle from '../UploadblobFileHandle/UploadblobFileHandle.ts'

export const uploadHandle = async (
  blobHandle: Readonly<blobHandle>,
  pathSeparator: string,
  root: string,
  uploadHandles: (blobHandles: readonly blobHandle[], pathSeparator: string, root: string) => Promise<void>,
): Promise<void> => {
  const { kind } = blobHandle
  switch (kind) {
    case FileHandleType.Directory:
      return UploadblobDirectoryHandle.uploadDirectory(blobHandle as blobDirectoryHandle, pathSeparator, root, uploadHandles)
    case FileHandleType.File:
      return UploadblobFileHandle.uploadFile(blobHandle as blobFileHandle, pathSeparator, root)
    default:
      throw new Error(`unsupported file system handle type ${kind}`)
  }
}
