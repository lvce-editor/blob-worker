import { test, expect } from '@jest/globals'
import { createblobProcessRpcElectron } from '../src/parts/CreateblobProcessRpcElectron/CreateblobProcessRpcElectron.js'
import { createblobProcessRpcNode } from '../src/parts/CreateblobProcessRpcNode/CreateblobProcessRpcNode.js'
import { getRpcFactory } from '../src/parts/GetRpcFactory/GetRpcFactory.js'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.js'

test('returns electron rpc factory for electron platform', () => {
  const factory = getRpcFactory(PlatformType.Electron)
  expect(factory).toBe(createblobProcessRpcElectron)
})

test('returns node rpc factory for remote platform', () => {
  const factory = getRpcFactory(PlatformType.Remote)
  expect(factory).toBe(createblobProcessRpcNode)
})

test('throws error for unexpected platform', () => {
  expect(() => getRpcFactory(999)).toThrow('unexpected platform')
})
