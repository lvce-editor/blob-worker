import * as Assert from '../Assert/Assert.ts'

/**
 * Do not use directly, use blobHtml.getChildHandles
 * instead which prompts for the required permission to
 * retrieve the child handles
 */
export const getChildHandles = async (handle: blobDirectoryHandle): Promise<blobHandle[]> => {
  Assert.object(handle)
  // @ts-ignore - values() exists on blobDirectoryHandle but TypeScript types may not include it
  const handles = await Array.fromAsync(handle.values())
  return handles as blobHandle[]
}

export const getFileHandle = (handle: blobDirectoryHandle, name: string): Promise<blobFileHandle> => {
  return handle.getFileHandle(name)
}
