export type HttpMethodDecorator = (
  path?: string,
  body?: HttpMethodDecorator
) => (target: object, propertyKey: string) => void;

export type RouteMethod = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
  action: FunctionConstructor;
  auth?: boolean;
  methodName: string | symbol;
};

export type AuthMethod = {
  controller: string;
  method: string;
  auth: boolean;
};
