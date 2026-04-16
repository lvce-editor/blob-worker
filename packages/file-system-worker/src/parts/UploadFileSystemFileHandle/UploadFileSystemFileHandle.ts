import * as blobDisk from '../blobDisk/blobDisk.ts'
import * as blobFileHandle from '../blobFileHandle/blobFileHandle.ts'
import * as Path from '../Path/Path.ts'

export const uploadFile = async (blobHandle: blobFileHandle, pathSeparator: string, root: string): Promise<void> => {
  const content = await blobFileHandle.getBinaryString(blobHandle)
  const to = Path.join(pathSeparator, root, blobHandle.name)
  await blobDisk.writeFile(to, content)
}
