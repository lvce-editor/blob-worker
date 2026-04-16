import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'blob.base64-string-to-blob'

export const test: Test = async ({ Command, expect }) => {
  const base64String = 'SGVsbG8gV29ybGQ='

  const blob = await Command.execute('Blob.base64StringToBlob', base64String)
  const binaryString = await Command.execute('Blob.blobToBinaryString', blob)

  expect(binaryString).toBe('Hello World')
}