import { RendererWorker, RpcId } from '@lvce-editor/rpc-registry'

export const sendMessagePortToblobProcess = async (port: MessagePort): Promise<void> => {
  await RendererWorker.sendMessagePortToExtensionHostWorker(port, RpcId.blobWorker)
}
