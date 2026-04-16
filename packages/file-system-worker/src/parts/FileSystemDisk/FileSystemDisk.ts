import * as blobFetch from '../blobFetch/blobFetch.ts'
import * as blobMemory from '../blobMemory/blobMemory.ts'
import * as blobProcess from '../blobProcess/blobProcess.ts'
import { isHttp } from '../IsHttp/IsHttp.ts'
import { isMemory } from '../IsMemory/IsMemory.ts'

export const remove = async (dirent: string): Promise<void> => {
  if (isMemory(dirent)) {
    return blobMemory.remove(dirent)
  }
  return blobProcess.remove(dirent)
}

export const readFile = async (uri: string): Promise<string> => {
  if (isHttp(uri)) {
    return blobFetch.readFile(uri)
  }
  if (isMemory(uri)) {
    return blobMemory.readFile(uri)
  }
  return blobProcess.readFile(uri)
}

export const appendFile = async (uri: string, text: string): Promise<string> => {
  return blobProcess.appendFile(uri, text)
}

export const readDirWithFileTypes = async (uri: string): Promise<readonly any[]> => {
  return blobProcess.readDirWithFileTypes(uri)
}

export const getPathSeparator = async (root: string): Promise<string> => {
  return blobProcess.getPathSeparator(root)
}

export const readJson = async (uri: string): Promise<any> => {
  if (isHttp(uri)) {
    return blobFetch.readJson(uri)
  }
  if (isMemory(uri)) {
    return blobMemory.readJson(uri)
  }
  return blobProcess.readJson(uri)
}

export const getRealPath = async (path: string): Promise<string> => {
  return blobProcess.getRealPath(path)
}

export const readFileAsBlob = async (uri: string): Promise<Blob> => {
  if (isHttp(uri)) {
    return blobFetch.readFileAsBlob(uri)
  }
  if (uri.startsWith('file:///')) {
    const rest = uri.slice('file:///'.length)
    const remoteUrl = `/remote/${rest}`
    const response = await fetch(remoteUrl)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const blob = await response.blob()
    return blob
  }
  throw new Error('uri not supported')
}

export const stat = async (dirent: string): Promise<any> => {
  return blobProcess.stat(dirent)
}

export const exists = async (uri: string): Promise<any> => {
  if (isHttp(uri)) {
    return blobFetch.exists(uri)
  }
  return blobProcess.exists(uri)
}

export const createFile = async (uri: string): Promise<void> => {
  if (isMemory(uri)) {
    return blobMemory.createFile(uri)
  }
  return blobProcess.writeFile(uri, '')
}

export const writeFile = async (uri: string, content: string): Promise<void> => {
  if (isMemory(uri)) {
    return blobMemory.writeFile(uri, content)
  }
  return blobProcess.writeFile(uri, content)
}

const getBytes = async (blob: Blob): Promise<Uint8Array> => {
  if (blob.bytes) {
    return blob.bytes()
  }
  const buffer = await blob.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  return bytes
}

export const writeBlob = async (uri: string, blob: Blob): Promise<void> => {
  const bytes = await getBytes(blob)
  // @ts-ignore
  await blobProcess.invoke('blob.writeBuffer', uri, bytes)
}

export const mkdir = async (uri: string): Promise<void> => {
  return blobProcess.mkdir(uri)
}

export const rename = async (oldUri: string, newUri: string): Promise<void> => {
  if (isMemory(oldUri) || isMemory(newUri)) {
    return blobMemory.rename(oldUri, newUri)
  }
  return blobProcess.rename(oldUri, newUri)
}

export const copy = async (oldUri: string, newUri: string): Promise<void> => {
  return blobProcess.copy(oldUri, newUri)
}

export const getFolderSize = async (uri: string): Promise<void> => {
  return blobProcess.getFolderSize(uri)
}

export const watchFile = async (id: number, uri: string): Promise<void> => {
  // @ts-ignore
  await blobProcess.invoke('blob.watchFile', id, uri)
}
