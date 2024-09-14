import { DateOptions } from '..';

export function validateDate(
  date: unknown,
  options?: DateOptions
): { error?: Error; valid: boolean } {
  if (!(typeof date === 'object' && date instanceof Date)) {
    return {
      error: new Error(`Type error: ${date} should be a number`),
      valid: false,
    };
  }

  if (options) {
    const { fromDate, toDate } = options;
    if (fromDate && new Date(date) < new Date(fromDate)) {
      return {
        error: new Error(`Error: ${date} must be greater than ${fromDate}`),
        valid: false,
      };
    }
    if (toDate && new Date(date) > new Date(toDate)) {
      return {
        error: new Error(`Error: ${date} must be less than ${toDate}`),
        valid: false,
      };
    }
  }
  return {
    error: undefined,
    valid: true,
  };
}
