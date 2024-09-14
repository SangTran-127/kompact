import { NumberOptions, VALIDATOR_KEY, ValidatorMetadata } from '..';
import { Property } from '../../transform';

export function Number(options?: NumberOptions) {
  return (target: object, propertyKey: string) => {
    const metadata: ValidatorMetadata<'number'>[] =
      Reflect.getOwnMetadata(VALIDATOR_KEY, target, propertyKey) || [];

    if (!metadata.find((m) => m.propertyKey === propertyKey)) {
      metadata.push({
        key: 'number',
        propertyKey,
        dataType: 'number',
        options,
      });
      Reflect.defineMetadata(VALIDATOR_KEY, metadata, target, propertyKey);
    }

    Property()(target, propertyKey);
  };
}
