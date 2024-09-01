import { ReasonStatusCode, StatusCode } from '../constant';

export class HttpError extends Error {
  public status: number;
  // will be change number to an enum or object later
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class ConflictRequestError extends HttpError {
  constructor(
    message = ReasonStatusCode[StatusCode.CONFLICT],
    statusCode = StatusCode.CONFLICT
  ) {
    super(message, statusCode);
  }
}

export class BadRequestError extends HttpError {
  constructor(
    message = ReasonStatusCode[StatusCode.BAD_REQUEST],
    statusCode = StatusCode.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}

export class AuthFailureError extends HttpError {
  constructor(
    message = ReasonStatusCode[StatusCode.UNAUTHORIZED],
    statusCode = StatusCode.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}

export class NotFoundError extends HttpError {
  constructor(
    message = ReasonStatusCode[StatusCode.NOT_FOUND],
    statusCode = StatusCode.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

export class ForbiddenError extends HttpError {
  constructor(
    message = ReasonStatusCode[StatusCode.FORBIDDEN],
    statusCode = StatusCode.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}
