import { VALIDATOR_KEY, ValidatorMetadata } from "..";
import { Property } from "../../transform";

export function UUIDv4(target: object, propertyKey: string) {
  const metadata: ValidatorMetadata<"string">[] =
    Reflect.getOwnMetadata(VALIDATOR_KEY, target, propertyKey) || [];
  if (!metadata.find((m) => m.propertyKey === propertyKey)) {
    metadata.push({
      key: "string",
      propertyKey,
      dataType: "string",
      options: {
        length: 36,
        type: "uuidv4",
      },
    });
    Reflect.defineMetadata(VALIDATOR_KEY, metadata, target, propertyKey);
  }

  Property()(target, propertyKey);
}
