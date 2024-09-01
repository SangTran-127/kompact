import type { Class } from '../interface'

export function PartialType<T>(classRef: Class<T>): Class<Partial<T>> {
  class PartialClass {}

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.keys(classRef.prototype).forEach(key => {
    Object.defineProperty(PartialClass.prototype, key, {
      get() {
        return classRef.prototype[key]
      },
      set(value) {
        classRef.prototype[key] = value
      },
      enumerable: true,
      configurable: true,
    })
  })

  return PartialClass as Class<Partial<T>>
}
