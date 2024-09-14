import { PROPERTY_KEY } from ".";
import { REQUIRED_KEY } from "../validator";

export function AutoConstructor<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  const propertyNames: string[] =
    Reflect.getMetadata(PROPERTY_KEY, constructor) || [];
  const requiredProperties: string[] =
    Reflect.getMetadata(REQUIRED_KEY, constructor) || [];

  class DecoratedClass extends constructor {
    constructor(...args: any[]) {
      const properties = args[0];
      super();
      propertyNames.forEach((propertyName: string) => {
        if (propertyName in properties) {
          (this as any)[propertyName] = properties[propertyName];
        } else if (requiredProperties.includes(propertyName)) {
          throw new Error(`Missing required property: ${propertyName}`);
        }
      });
    }
  }

  Reflect.defineMetadata(PROPERTY_KEY, propertyNames, DecoratedClass);

  return DecoratedClass;
}
