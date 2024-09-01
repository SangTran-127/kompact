export const ROUTES_METHOD_METADATA = Symbol('routes')

export enum HttpMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}
export * from './Get'
export * from './Post'
export * from './Patch'
export * from './Put'
export * from './Delete'
