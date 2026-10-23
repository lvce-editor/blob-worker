import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'blob.binary-string-to-blob'

export const test: Test = async ({ Command, expect }) => {
  const blob = await Command.execute('Blob.binaryStringToBlob', 'Hello World', 'text/plain')

  if (blob.size !== 11) {
    throw new Error(`Expected blob size to be 11, got ${blob.size}`)
  }
  if (blob.type !== 'text/plain') {
    throw new Error(`Expected blob type to be text/plain, got ${blob.type}`)
  }
}
