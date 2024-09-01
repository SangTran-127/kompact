import type { Response } from '../interface';

export enum StatusCode {
  OK = 200,
  CREATED = 201,
}

export const ReasonStatusCode = {
  [StatusCode.OK]: 'Success',
  [StatusCode.CREATED]: 'Created',
} as const;

export type SuccessResponseParams = {
  message?: string;
  statusCode?: StatusCode;
  reasonStatusCode?: typeof ReasonStatusCode;
  metadata?: Record<string, unknown>;
};

export class SuccessResponse {
  message: string;
  statusCode: StatusCode;
  metadata: Record<string, unknown>;

  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode,
    metadata = {},
  }: SuccessResponseParams) {
    this.message = message ?? reasonStatusCode[statusCode];
    this.statusCode = statusCode;
    this.metadata = metadata;
  }

  send(res: Response, header: Record<string, string> = {}): any {
    return res.status(this.statusCode).json(this);
  }
}
