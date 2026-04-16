/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import type { blobHandler } from '../blobHandler/blobHandler.ts'

const state: Record<string, blobHandler> = Object.create(null)

export const register = (modules: Record<string, blobHandler>): void => {
  Object.assign(state, modules)
}

export const clear = (): void => {
  for (const key of Object.keys(state)) {
    delete state[key]
  }
}

export const getFn = (protocol: string): blobHandler => {
  return state[protocol]
}
