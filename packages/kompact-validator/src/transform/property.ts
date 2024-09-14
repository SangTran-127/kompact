import { PROPERTY_KEY } from ".";

export function Property() {
    return (target: object, propertyKey: string | symbol) => {
      const properties = Reflect.getMetadata(PROPERTY_KEY, target.constructor) || [];
      properties.push(propertyKey);
      Reflect.defineMetadata(PROPERTY_KEY, properties, target.constructor);
    };
  }
