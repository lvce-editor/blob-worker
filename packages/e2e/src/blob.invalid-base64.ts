import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'blob.invalid-base64'

export const test: Test = async ({ Command }) => {
  let errorMessage = ''
  try {
    await Command.execute('Blob.base64StringToBlob', '!!!invalid!!!')
  } catch (error) {
    errorMessage = String(error)
  }
  if (!errorMessage.includes('Failed to convert base64 string to blob')) {
    throw new Error(`Expected a normalized base64 conversion error, got ${errorMessage || 'no error'}`)
  }
}
