import { createblobProcessRpc } from '../CreateblobProcessRpc/CreateblobProcessRpc.ts'
import * as blobProcess from '../blobProcess/blobProcess.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const initializeblobProcess = async (platform: number): Promise<void> => {
  if (platform === PlatformType.Web) {
    return
  }
  const rpc = await createblobProcessRpc(platform)
  blobProcess.set(rpc)
}
