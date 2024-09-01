declare namespace Express {
  export interface Request {
    requestId?: string | string[];
    user?: object;
  }
}
