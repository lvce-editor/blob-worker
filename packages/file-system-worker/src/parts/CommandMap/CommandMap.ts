import { base64StringToBlob } from 'blob-util'
import { binaryStringToBlob, blobToBinaryString } from '../Blob/Blob.ts'
import * as blob from '../blobDisk/blobDisk.ts'
import * as FileWatcher from '../FileWatcher/FileWatcher.ts'
import * as HandleMessagePort from '../HandleMessagePort/HandleMessagePort.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import { uploadblobHandles } from '../UploadblobHandles/UploadblobHandles.ts'

export const commandMap: Record<string, any> = {
  'Blob.base64StringToBlob': base64StringToBlob,
  'Blob.binaryStringToBlob': binaryStringToBlob,
  'Blob.blobToBinaryString': blobToBinaryString,
  'blob.appendFile': blob.appendFile,
  'blob.copy': blob.copy,
  'blob.createFile': blob.createFile,
  'blob.executeWatchCallback': FileWatcher.executeWatchCallback,
  'blob.exists': blob.exists,
  'blob.getFolderSize': blob.getFolderSize,
  'blob.getPathSeparator': blob.getPathSeparator,
  'blob.getRealPath': blob.getRealPath,
  'blob.handleMessagePort': HandleMessagePort.handleMessagePort,
  'blob.mkdir': blob.mkdir,
  'blob.readDirWithFileTypes': blob.readDirWithFileTypes,
  'blob.readFile': blob.readFile,
  'blob.readFileAsBlob': blob.readFileAsBlob,
  'blob.readJson': blob.readJson,
  'blob.remove': blob.remove,
  'blob.rename': blob.rename,
  'blob.stat': blob.stat,
  'blob.unwatchFile': FileWatcher.unwatchFile,
  'blob.uploadblobHandles': uploadblobHandles,
  'blob.watchFile': FileWatcher.watchFile,
  'blob.writeBlob': blob.writeBlob,
  'blob.writeFile': blob.writeFile,
  'Initialize.initialize': Initialize.initialize,
}
