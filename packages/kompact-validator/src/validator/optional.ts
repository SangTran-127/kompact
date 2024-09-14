import { Property } from '../transform';

export const OPTIONAL_KEY = Symbol('OPTIONAL');

export function Optional(target: object, propertyKey: string) {
  const metadata: string[] =
    Reflect.getMetadata(OPTIONAL_KEY, target.constructor) || [];
  if (!metadata.find((m) => m === propertyKey)) {
    metadata.push(propertyKey);
    Reflect.defineMetadata(OPTIONAL_KEY, metadata, target.constructor);
  }
  Property()(target, propertyKey);
}
