import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const requestPermission = async (handle: Readonly<blobHandle>, options: Readonly<{ mode?: 'read' | 'readwrite' }>): Promise<PermissionState> => {
  // query permission, but from renderer process
  // because handle.requestPermission is not implemented
  // in a worker, see https://github.com/WICG/blob-access/issues/289
  const permissionTypeNow = await RendererProcess.invoke('blobHandle.requestPermission', handle, options)
  return permissionTypeNow as PermissionState
}

export const queryPermission = async (handle: Readonly<blobHandle>, options: Readonly<{ mode?: 'read' | 'readwrite' }>): Promise<PermissionState> => {
  // @ts-ignore - queryPermission exists on blobHandle but TypeScript types may not include it
  return handle.queryPermission(options)
}
