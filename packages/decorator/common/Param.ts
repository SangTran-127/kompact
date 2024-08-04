export const PARAM_KEY = Symbol('param')

export function Param(paramName?: string) {
  return (
    target: object,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    if (!Reflect.hasMetadata(PARAM_KEY, target, propertyKey)) {
      Reflect.defineMetadata(PARAM_KEY, [], target, propertyKey)
    }
    const params = Reflect.getMetadata(PARAM_KEY, target, propertyKey)
    params.push({ index: parameterIndex, name: paramName })
  }
}
