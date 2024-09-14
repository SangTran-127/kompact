import { NumberOptions } from "..";

export function validateNumber(
  num: unknown,
  options?: NumberOptions
): { error?: Error; valid: boolean } {
  if (typeof num !== "number") {
    return {
      error: new Error(`Type error: ${num} should be a number`),
      valid: false,
    };
  }

  if (options) {
    const { max, min } = options;
    if (max && num > max) {
      return {
        error: new Error(`Error: ${num} must be less than ${max}`),
        valid: false,
      };
    }
    if (min && num < min) {
      return {
        error: new Error(`Error: ${num} must be greater than ${min}`),
        valid: false,
      };
    }
  }
  return {
    error: undefined,
    valid: true,
  };
}
