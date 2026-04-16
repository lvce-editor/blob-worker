import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'blob.invalid-base64'

export const test: Test = async ({ Command, expect }) => {
  await expect(Command.execute('Blob.base64StringToBlob', '!!!invalid!!!')).rejects.toThrow('Failed to convert base64 string to blob')
}