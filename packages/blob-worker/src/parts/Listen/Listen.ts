import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'

export const listen = async (): Promise<void> => {
  Object.assign(CommandMapRef.commandMapRef, CommandMap.commandMap)
  await initializeRendererWorker()
}
