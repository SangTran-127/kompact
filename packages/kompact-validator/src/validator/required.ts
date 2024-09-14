import { Property } from "../transform";

export const REQUIRED_KEY = Symbol("REQUIRED");

export function Required(target: object, propertyKey: string) {
  const metadata: string[] =
    Reflect.getOwnMetadata(REQUIRED_KEY, target.constructor) || [];
  if (!metadata.find((m) => m === propertyKey)) {
    metadata.push(propertyKey);
    Reflect.defineMetadata(REQUIRED_KEY, metadata, target.constructor);
  }
  Property()(target, propertyKey);
}
