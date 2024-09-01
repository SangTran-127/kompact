import { HttpMethod, ROUTES_METHOD_METADATA } from '.'
import { type RouteMethod } from '../../../interface'

export function Get(path?: string) {
  return (target: object, propertyKey: string | symbol) => {
    // target is {}, target.constructor to get its class
    if (!Reflect.hasMetadata(ROUTES_METHOD_METADATA, target.constructor)) {
      Reflect.defineMetadata(ROUTES_METHOD_METADATA, [], target.constructor)
    }
    const routes: RouteMethod[] = Reflect.getMetadata(
      ROUTES_METHOD_METADATA,
      target.constructor,
    )
    routes.push({
      method: HttpMethod.Get,
      path: path ?? '',
      methodName: propertyKey,
      action: target[propertyKey as keyof typeof target],
    })
  }
}
