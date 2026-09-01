import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'blob.binary-string-to-blob'

export const test: Test = async ({ Command, expect }) => {
  const blob = await Command.execute('Blob.binaryStringToBlob', 'Hello World', 'text/plain')

  expect(blob.size).toBe(11)
  expect(blob.type).toBe('text/plain')
}
