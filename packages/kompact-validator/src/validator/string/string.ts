import { StringOptions, VALIDATOR_KEY, ValidatorMetadata } from "..";
import { Property } from "../../transform";

export function String(options?: StringOptions) {
  return (target: object, propertyKey: string) => {
    const metadata: ValidatorMetadata<"string">[] =
      Reflect.getOwnMetadata(VALIDATOR_KEY, target, propertyKey) || [];

    if (!metadata.find((m) => m.propertyKey === propertyKey)) {
      metadata.push({
        key: "string",
        propertyKey,
        dataType: "string",
        options,
      });
      Reflect.defineMetadata(VALIDATOR_KEY, metadata, target, propertyKey);
    }

    Property()(target, propertyKey);
  };
}
