import type { Rpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const invokeAndTransfer = (method: string, ...params: readonly unknown[]): Promise<unknown> => {
  return RendererWorker.invokeAndTransfer(method, ...params)
}

export const sendMessagePortToExtensionHostWorker = (port: MessagePort, rpcId = 0): Promise<void> => {
  return RendererWorker.sendMessagePortToExtensionManagementWorker(port, rpcId)
}

export const set = (rpc: Rpc): void => {
  RendererWorker.set(rpc)
}
