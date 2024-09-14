import "reflect-metadata";
import {
  Options,
  VALIDATOR_KEY,
  ValidatorMetadata,
  ValidatorType,
  validateDate,
  validateNumber,
  validateString,
} from "./validator";

export function validate<T extends object = object>(obj: T) {
  for (let [property, value] of Object.entries(obj)) {
    // Skipping undefined. The transform also handle Optional
    if (typeof value === "undefined") {
      continue;
    }
    const metadata: ValidatorMetadata[] = Reflect.getMetadata(
      VALIDATOR_KEY,
      obj,
      property
    );
    // Currently the first
    const { key, options } = metadata[0];
    const { error, valid } = v[key as ValidatorType](value, options);
    return {
      error,
      valid,
    };
  }
}

const v: {
  [key in ValidatorType]: (
    arg: unknown,
    options: Options[key]
  ) => { error?: Error; valid: boolean };
} = {
  string: validateString,
  number: validateNumber,
  date: validateDate,
};

export function transform<T extends { new (...args: any[]): InstanceType<T> }>(
  instance: object,
  Class: T
): InstanceType<T> {
  return new Class(instance);
}
