export const BODY_KEY = Symbol('BODY')

export function Body(fieldName?: string) {
  return (
    target: object,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    if (!Reflect.hasMetadata(BODY_KEY, target, propertyKey)) {
      Reflect.defineMetadata(BODY_KEY, [], target, propertyKey)
    }
    const bodies = Reflect.getMetadata(BODY_KEY, target, propertyKey)
    bodies.push({ index: parameterIndex, field: fieldName })
  }
}
