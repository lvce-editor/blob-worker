import * as HtmlFile from '../HtmlFile/HtmlFile.ts'

export const getFile = (handle: blobFileHandle): Promise<File> => {
  return handle.getFile()
}

export const getBinaryString = async (handle: blobFileHandle): Promise<string> => {
  const file = await getFile(handle)
  const text = await HtmlFile.getBinaryString(file)
  return text
}

export const write = async (handle: blobFileHandle, content: string): Promise<void> => {
  const writable = await handle.createWritable()
  await writable.write(content)
  await writable.close()
}

export const writeResponse = async (handle: blobFileHandle, response: Response): Promise<void> => {
  const writable = await handle.createWritable()
  if (response.body) {
    await response.body.pipeTo(writable)
  }
}
