import * as GetFilePathElectron from '../GetFilePathElectron/GetFilePathElectron.ts'
import * as blobHandle from './blobHandle.ts'

export const name = 'blobHandle'

export const Commands = {
  addFileHandle: blobHandle.addFileHandle,
  getFileHandles: blobHandle.getFileHandles,
  getFilePathElectron: GetFilePathElectron.getFilePathElectron,
}
