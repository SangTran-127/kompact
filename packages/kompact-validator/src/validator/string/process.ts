import { StringOptions, ValidateReturn } from "..";
import { pattern as CONST_PATTERN } from "../../constant/regex";

export function validateString(
  str: unknown,
  options?: StringOptions
): ValidateReturn {
  if (typeof str !== "string") {
    return {
      error: new Error(`Type error: ${str} should be a string`),
      valid: false,
    };
  }
  if (options) {
    const { length, max, min, type, pattern } = options;
    if (length && str.length !== length) {
      return {
        error: new Error(`Error: Length of ${str} must be length of ${length}`),
        valid: false,
      };
    }
    if (max && str.length > max) {
      return {
        error: new Error(`Error: Length of ${str} must less than ${max}`),
        valid: false,
      };
    }
    if (min && str.length < min) {
      return {
        error: new Error(`Error: Length of ${str} must be greater than ${min}`),
        valid: false,
      };
    }

    if (pattern) {
      const valid = pattern.test(str);
      return {
        error: valid
          ? undefined
          : new Error(`Error: ${str} must be satisfies pattern ${pattern}`),
        valid,
      };
    }

    if (type) {
      return CONST_PATTERN[type](str);
    }
  }
  return {
    error: undefined,
    valid: true,
  };
}
