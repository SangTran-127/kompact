export type HttpMethodDecorator = (
  path?: string,
  body?: HttpMethodDecorator,
) => (target: any, propertyKey: string) => void

export type RouteMethod = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  path: string
  action: FunctionConstructor
  auth?: boolean
  methodName: string | symbol
}

export type AuthMethod = {
  controller: string
  method: string
  auth: boolean
}
