import { type Rpc } from '@lvce-editor/rpc'
import { createblobProcessRpcElectron } from '../CreateblobProcessRpcElectron/CreateblobProcessRpcElectron.ts'
import { createblobProcessRpcNode } from '../CreateblobProcessRpcNode/CreateblobProcessRpcNode.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

interface RpcFactory {
  (): Promise<Rpc>
}

export const getRpcFactory = (platform: number): RpcFactory => {
  switch (platform) {
    case PlatformType.Electron:
      return createblobProcessRpcElectron
    case PlatformType.Remote:
      return createblobProcessRpcNode
    default:
      throw new Error(`unexpected platform`)
  }
}
