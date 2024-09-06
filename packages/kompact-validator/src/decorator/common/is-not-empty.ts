export const IsNotEmptyKey = Symbol('IS_NOT_EMPTY');
export function IsNotEmpty() {
  return (target: object, propertyKey: string | symbol) => {
    console.log(target);
  };
}
