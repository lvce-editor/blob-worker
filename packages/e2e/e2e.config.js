import { defineConfig } from '@lvce-editor/test-with-playwright'

export default defineConfig({
  onlyExtension: '.',
  testPath: '.',
  serverPath: '../../node_modules/@lvce-editor/server/bin/server.js',
})
