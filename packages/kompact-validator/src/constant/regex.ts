import { StringTypeOptions } from "../validator";

export const pattern: Record<
  StringTypeOptions,
  (str: string) => { error?: Error; valid: boolean }
> = {
  email: validEmail,
  uuidv4: validUUIDv4,
};

function validEmail(str: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const valid = regex.test(str);
  return {
    error: !valid ? new Error(`Error: ${str} is not a valid email`) : undefined,
    valid,
  };
}

function validUUIDv4(str: string) {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  const valid = regex.test(str);
  return {
    error: !valid
      ? new Error(`Error: ${str} is not a valid UUIDv4`)
      : undefined,
    valid,
  };
}
