import 'reflect-metadata'

export function CurrentUser(
  target: object,
  propertyKey: string | symbol,
  parameterIndex: number,
): void {
  const existingParameters: number[] =
    Reflect.getOwnMetadata('currentUser', target, propertyKey) || []
  existingParameters.push(parameterIndex)
  Reflect.defineMetadata('currentUser', existingParameters, target, propertyKey)
}
