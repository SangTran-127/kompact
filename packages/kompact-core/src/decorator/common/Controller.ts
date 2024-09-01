import { CONTROLLER_AUTH_METADATA, CONTROLLER_PATH_METADATA } from '.'

export function Controller(path: string): ClassDecorator
export function Controller(options: {
  path: string
  auth?: boolean
}): ClassDecorator

export function Controller(
  arg: string | { path: string; auth?: boolean },
): ClassDecorator {
  return (target: object) => {
    if (typeof arg === 'string') {
      Reflect.defineMetadata(CONTROLLER_PATH_METADATA, `/${arg}`, target)
    } else {
      Reflect.defineMetadata(CONTROLLER_PATH_METADATA, `/${arg.path}`, target)
      if (arg.auth) {
        Reflect.defineMetadata(CONTROLLER_AUTH_METADATA, arg.auth, target)
      }
    }
  }
}
