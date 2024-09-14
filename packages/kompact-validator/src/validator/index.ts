import "reflect-metadata";

export const VALIDATOR_KEY = Symbol("VALIDATOR_KEY");

export type ValidatorType = "string" | "number" | "date";

export type ValidatorMetadata<T extends ValidatorType = any> = {
  key: T;
  propertyKey: string;
  dataType: string;
  options?: Options[T];
};

export type Options = {
  string: StringOptions;
  number: NumberOptions;
  date: DateOptions;
};

export type StringOptions = {
  length?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  type?: StringTypeOptions;
};

export type StringTypeOptions = "uuidv4" | "email";

export type NumberOptions = {
  min?: number;
  max?: number;
};

export type DateOptions = {
  fromDate?: string;
  toDate?: string;
};

export type ValidateReturn = { error?: Error; valid: boolean };

export * from "./date";
export * from "./number";
export * from "./optional";
export * from "./required";
export * from "./string";
