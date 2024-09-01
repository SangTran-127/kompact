// will be disable single later
export function Singleton() {
  return <T extends new (...args: any[]) => any>(target: T) => {
    let instance: T
    return class {
      constructor(...args: any[]) {
        if (instance) {
          console.error(`Cannot re-create singleton instance`)
          return instance
        }
        // eslint-disable-next-line new-cap, @typescript-eslint/no-unsafe-argument
        instance = new target(...args)
        return instance
      }
    } as T
  }
}
