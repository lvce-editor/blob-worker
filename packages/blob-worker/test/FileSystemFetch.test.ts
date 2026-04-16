import { test, expect, jest } from '@jest/globals'
import * as blobFetch from '../src/parts/blobFetch/blobFetch.ts'

// Mock fetch globally
;(globalThis as any).fetch = jest.fn()

test('readFile should fetch and return text content', async () => {
  // @ts-ignore
  const mockText = jest.fn().mockResolvedValue('file content') as any
  const mockResponse = {
    ok: true,
    text: mockText,
  } as any
  // @ts-ignore
  ;((globalThis as any).fetch as jest.Mock).mockResolvedValue(mockResponse)

  const result = await blobFetch.readFile('http://example.com/file.txt')

  expect((globalThis as any).fetch).toHaveBeenCalledWith('http://example.com/file.txt')
  expect(result).toBe('file content')
})

test('readFile should throw error when response is not ok', async () => {
  const mockResponse = {
    ok: false,
    statusText: 'Not Found',
  } as any
  // @ts-ignore
  ;((globalThis as any).fetch as jest.Mock).mockResolvedValue(mockResponse)

  await expect(blobFetch.readFile('http://example.com/notfound.txt')).rejects.toThrow('Not Found')
})

test('readFileAsBlob should fetch and return blob content', async () => {
  const mockBlob = new Blob(['blob content'])
  // @ts-ignore
  const mockBlobFn = jest.fn().mockResolvedValue(mockBlob) as any
  const mockResponse = {
    blob: mockBlobFn,
    ok: true,
  } as any
  // @ts-ignore
  ;((globalThis as any).fetch as jest.Mock).mockResolvedValue(mockResponse)

  const result = await blobFetch.readFileAsBlob('http://example.com/file.bin')

  expect((globalThis as any).fetch).toHaveBeenCalledWith('http://example.com/file.bin')
  expect(result).toBe(mockBlob)
})

test('readFileAsBlob should throw error when response is not ok', async () => {
  const mockResponse = {
    ok: false,
    statusText: 'Server Error',
  } as any
  // @ts-ignore
  ;((globalThis as any).fetch as jest.Mock).mockResolvedValue(mockResponse)

  await expect(blobFetch.readFileAsBlob('http://example.com/error.bin')).rejects.toThrow('Server Error')
})

test('exists should return true for successful response', async () => {
  const mockResponse = {
    ok: true,
  } as any
  // @ts-ignore
  ;((globalThis as any).fetch as jest.Mock).mockResolvedValue(mockResponse)

  const result = await blobFetch.exists('http://example.com/exists.txt')

  expect(result).toBe(true)
})

test('exists should return false for failed response', async () => {
  const mockResponse = {
    ok: false,
  } as any
  // @ts-ignore
  ;((globalThis as any).fetch as jest.Mock).mockResolvedValue(mockResponse)

  const result = await blobFetch.exists('http://example.com/notfound.txt')

  expect(result).toBe(false)
})

test('getPathSeparator should return forward slash', async () => {
  const result = await blobFetch.getPathSeparator('http://example.com/')
  expect(result).toBe('/')
})

test('readJson should fetch and return JSON content', async () => {
  const mockJson = { key: 'value' }
  // @ts-ignore
  const mockJsonFn = jest.fn().mockResolvedValue(mockJson) as any
  const mockResponse = {
    json: mockJsonFn,
    ok: true,
  } as any
  // @ts-ignore
  ;((globalThis as any).fetch as jest.Mock).mockResolvedValue(mockResponse)

  const result = await blobFetch.readJson('http://example.com/data.json')

  expect((globalThis as any).fetch).toHaveBeenCalledWith('http://example.com/data.json')
  expect(result).toEqual(mockJson)
})

test('readJson should throw error when response is not ok', async () => {
  const mockResponse = {
    ok: false,
    statusText: 'Bad Request',
  } as any
  // @ts-ignore
  ;((globalThis as any).fetch as jest.Mock).mockResolvedValue(mockResponse)

  await expect(blobFetch.readJson('http://example.com/invalid.json')).rejects.toThrow('Bad Request')
})

test('remove should throw not implemented', async () => {
  await expect(blobFetch.remove('http://example.com/file.txt')).rejects.toThrow('not implemented')
})

test('readDirWithFileTypes should throw not implemented', async () => {
  await expect(blobFetch.readDirWithFileTypes('http://example.com/')).rejects.toThrow('not implemented')
})

test('getRealPath should throw not implemented', async () => {
  await expect(blobFetch.getRealPath('http://example.com/file.txt')).rejects.toThrow('not implemented')
})

test('stat should throw not implemented', async () => {
  await expect(blobFetch.stat('http://example.com/file.txt')).rejects.toThrow('not implemented')
})

test('createFile should throw not implemented', async () => {
  await expect(blobFetch.createFile('http://example.com/file.txt')).rejects.toThrow('not implemented')
})

test('writeFile should throw not implemented', async () => {
  await expect(blobFetch.writeFile('http://example.com/file.txt', 'content')).rejects.toThrow('not implemented')
})

test('mkdir should throw not implemented', async () => {
  await expect(blobFetch.mkdir('http://example.com/folder')).rejects.toThrow('not implemented')
})

test('rename should throw not implemented', async () => {
  await expect(blobFetch.rename('http://example.com/old.txt', 'http://example.com/new.txt')).rejects.toThrow('not implemented')
})

test('copy should throw not implemented', async () => {
  await expect(blobFetch.copy('http://example.com/source.txt', 'http://example.com/dest.txt')).rejects.toThrow('not implemented')
})

test('getFolderSize should throw not implemented', async () => {
  await expect(blobFetch.getFolderSize('http://example.com/folder')).rejects.toThrow('not implemented')
})
