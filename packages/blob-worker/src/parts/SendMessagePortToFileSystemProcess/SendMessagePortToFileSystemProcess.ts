import { RendererWorker, RpcId } from '@lvce-editor/rpc-registry'

export const sendMessagePortToblobProcess = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePortForblobProcess.handleMessagePortForblobProcess'
  await RendererWorker.invokeAndTransfer('SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess', port, command, RpcId.blobWorker)
}
