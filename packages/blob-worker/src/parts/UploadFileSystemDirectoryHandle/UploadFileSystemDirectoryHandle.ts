import * as blobDirectoryHandle from '../blobDirectoryHandle/blobDirectoryHandle.ts'
import * as blobDisk from '../blobDisk/blobDisk.ts'

export const uploadDirectory = async (
  blobHandle: Readonly<blobDirectoryHandle>,
  pathSeparator: string,
  root: string,
  uploadHandles: (blobHandles: readonly blobHandle[], pathSeparator: string, root: string) => Promise<void>,
): Promise<void> => {
  const folderPath = root + pathSeparator + blobHandle.name
  await blobDisk.mkdir(folderPath)
  const childHandles = await blobDirectoryHandle.getChildHandles(blobHandle)
  await uploadHandles(childHandles, pathSeparator, folderPath)
}
