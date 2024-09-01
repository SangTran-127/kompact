import type {
  NextFunction as ExpressNextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';

export type Request = ExpressRequest & {
  requestId?: string | string[];
  user?: object;
};
export type Response = ExpressResponse;

export type NextFunction = ExpressNextFunction;

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type Class<T = unknown> = new (...args: unknown[]) => T;

export type ControllerInstance = Class<
  Record<string, (...args: unknown[]) => void>
>;
