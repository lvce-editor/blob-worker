import { base64StringToBlob } from 'blob-util'
import { binaryStringToBlob, blobToBinaryString } from '../Blob/Blob.ts'
import { handleMessagePort } from '../HandleMessagePort/HandleMessagePort.ts'

export const commandMap: Record<string, any> = {
  'Blob.base64StringToBlob': base64StringToBlob,
  'Blob.binaryStringToBlob': binaryStringToBlob,
  'Blob.blobToBinaryString': blobToBinaryString,
  'Blob.handleMessagePort': handleMessagePort,
}
