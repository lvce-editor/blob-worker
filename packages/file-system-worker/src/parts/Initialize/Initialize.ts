import { initializeblobProcess } from '../InitializeblobProcess/InitializeblobProcess.ts'

export const initialize = async (platform: number): Promise<void> => {
  await initializeblobProcess(platform)
}
