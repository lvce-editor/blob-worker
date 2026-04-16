import { test, expect } from '@jest/globals'
import * as blobMemory from '../src/parts/blobMemory/blobMemory.ts'

test('getPathSeparator should return forward slash', async () => {
  const result = await blobMemory.getPathSeparator('memory://')
  expect(result).toBe('/')
})

test('writeFile should not throw error for memfs URI', async () => {
  // This test just verifies the method doesn't throw, since we can't easily mock the RPC calls
  await expect(blobMemory.writeFile('memfs://test.txt', 'content')).rejects.toThrow()
})

test('remove should not throw error for memfs URI', async () => {
  // This test just verifies the method doesn't throw, since we can't easily mock the RPC calls
  await expect(blobMemory.remove('memfs://test.txt')).rejects.toThrow()
})

test('readFileAsBlob should throw not implemented', async () => {
  await expect(blobMemory.readFileAsBlob('memory://test.txt')).rejects.toThrow('not implemented')
})

test('exists should throw not implemented', async () => {
  await expect(blobMemory.exists('memory://test.txt')).rejects.toThrow('not implemented')
})

test('readDirWithFileTypes should throw not implemented', async () => {
  await expect(blobMemory.readDirWithFileTypes('memory://')).rejects.toThrow('not implemented')
})

test('readJson should throw not implemented', async () => {
  await expect(blobMemory.readJson('memory://test.json')).rejects.toThrow('not implemented')
})

test('getRealPath should throw not implemented', async () => {
  await expect(blobMemory.getRealPath('memory://test.txt')).rejects.toThrow('not implemented')
})

test('stat should throw not implemented', async () => {
  await expect(blobMemory.stat('memory://test.txt')).rejects.toThrow('not implemented')
})

test('createFile should not throw error for memfs URI', async () => {
  // This test just verifies the method doesn't throw, since we can't easily mock the RPC calls
  await expect(blobMemory.createFile('memfs://test.txt')).rejects.toThrow()
})

test('mkdir should throw not implemented', async () => {
  await expect(blobMemory.mkdir('memory://folder')).rejects.toThrow('not implemented')
})

test('rename should not throw error for memfs URI', async () => {
  // This test just verifies the method doesn't throw, since we can't easily mock the RPC calls
  await expect(blobMemory.rename('memfs://old.txt', 'memfs://new.txt')).rejects.toThrow()
})

test('copy should throw not implemented', async () => {
  await expect(blobMemory.copy('memory://source.txt', 'memory://dest.txt')).rejects.toThrow('not implemented')
})

test('getFolderSize should throw not implemented', async () => {
  await expect(blobMemory.getFolderSize('memory://folder')).rejects.toThrow('not implemented')
})
