export function AuthController(target: object): void {
  Reflect.defineMetadata('auth', true, target)
}
