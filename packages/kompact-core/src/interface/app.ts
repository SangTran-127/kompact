import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from 'express';

export type Request = ExpressRequest;
export type Response = ExpressResponse;
export type NextFunction = ExpressNextFunction;

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type Class<T = unknown> = new (...args: unknown[]) => T;
