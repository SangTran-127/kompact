import { PARAM_KEY, BODY_KEY } from '../decorator';
import { Request, Response, RouteMethod } from '../interface';

export const extractReqParams = (
  instanceController: Record<string, (...args: unknown[]) => void>,
  route: RouteMethod,
  req: Request,
  res: Response
) => {
  const prototype: object = Object.getPrototypeOf(instanceController);
  const args: unknown[] = [];
  const paramMetadata = Reflect.getMetadata(
    PARAM_KEY,
    prototype,
    route.methodName
  );
  const bodyMetadata = Reflect.getMetadata(
    BODY_KEY,
    prototype,
    route.methodName
  );

  if (paramMetadata) {
    paramMetadata.forEach(
      ({ index, name }: { index: number; name: string }) => {
        // incase if name is undefined = @Param() params: object
        args[index] = req.params[name] || req.params;
      }
    );
  }

  if (bodyMetadata) {
    bodyMetadata.forEach(
      ({ index, field }: { index: number; field: string }) => {
        // incase if name is undefined = @Body() body: object
        args[index] = req.body[field] || req.body;
      }
    );
  }

  if (Array.isArray(args) && args.length > 0) {
    instanceController[route.action.name](...args, res);
  } else {
    instanceController[route.action.name](req, res);
  }
};
