import compression from 'compression';
import express, { type NextFunction, type Router } from 'express';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';
import {
  CONTROLLER_AUTH_METADATA,
  CONTROLLER_PATH_METADATA,
  ROUTES_METHOD_METADATA,
  Singleton,
} from './decorator';
import { HttpError } from './error';
import type {
  Class,
  Middleware,
  Request,
  Response,
  RouteMethod,
} from './interface';
import { logger } from './logger';
import { extractReqParams } from './utils/extract-controller-param';

@Singleton()
export class KompactApp {
  private readonly app = express();
  private readonly router = new Map<string, Router>();
  // private auth: Middleware;
  // private readonly controllers: any[];
  private readonly middlewares: Middleware[] = [];
  constructor({
    controllers,
    authenticator,
  }: {
    controllers: Class[];
    authenticator?: Middleware;
  }) {
    controllers?.forEach((Controller) => {
      const instance = new Controller();
      const path: string = Reflect.getMetadata(
        CONTROLLER_PATH_METADATA,
        Controller
      );
      const routes: RouteMethod[] = Reflect.getMetadata(
        ROUTES_METHOD_METADATA,
        Controller
      );
      const auth: boolean | undefined = Reflect.getMetadata(
        CONTROLLER_AUTH_METADATA,
        Controller
      );
      const router = express.Router();
      if (auth) {
        if (!authenticator) {
          // TODO: will custom this problem later
          throw new Error(
            `Please provide the authenticator, ${path} are current required authentication`
          );
        }
        router.use(authenticator);
      }
      routes?.forEach((route) => {
        if (route.auth && authenticator) {
          router[route.method](
            route.path,
            authenticator,
            (req: Request, res: Response) => {
              extractReqParams(instance, route, req, res);
            }
          );
        } else {
          router[route.method](
            route.path,
            (req: Request, res: Response, _: NextFunction) => {
              extractReqParams(instance, route, req, res);
            }
          );
        }
      });
      this.router.set(path, router);
    });
  }

  // public addRedis(redisClient: Redis): this {
  //   // will do with logger later
  //   redisClient.connect().catch(console.error)
  //   return this
  // }
  // using prisma for now
  // public addDatabase(database: DatabaseConnector): this {
  //   // will do with logger later
  //   database.connect().then(console.log).catch(console.error)
  //   return this
  // }

  public start(port: number, callback?: () => void): void {
    // init some utils middleware
    this.app.use(express.json()); // json body parser
    // will be custom these param, don't hard code anymore
    this.app.use(helmet()); // help secure Express apps by setting HTTP response headers.
    this.app.use(compression()); // compress file
    this.middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });

    // logging
    this.app.use((req, _, next) => {
      const requestId = req.headers['x-request-id'];
      req.requestId = requestId ?? uuidv4();
      logger.log(`Input params type ${req.method}`, {
        context: req.path,
        requestId: req.requestId,
        metadata: req.method === 'POST' ? req.body : req.query,
      });
      next();
    });

    this.router.forEach((router, path) => {
      this.app.use(path, router);
    });

    // handling error, this middleware after a define routes
    this.app.use((_, __, next) => {
      const error = new HttpError('Not found', 404);
      next(error);
    });

    this.app.use(
      (error: HttpError, req: Request, res: Response, _: NextFunction) => {
        const errorStatus = error.status || 500;
        // Add log for error
        const errorMessage = `Error ${errorStatus} - ${Date.now()}ms - Response: ${JSON.stringify(
          error
        )}`;

        logger.error(errorMessage, {
          context: req.path,
          requestId: req.requestId ?? uuidv4(),
          metadata: { message: error.message },
        });

        res.status(errorStatus).json({
          status: 'error',
          code: errorStatus,
          stack: error.stack, // for development env
          message: error.message || 'Internal Server Error',
        });
      }
    );
    this.app.listen(port, callback);
  }

  public middleware(
    middleware: (req: Request, res: Response, next: NextFunction) => void
  ): this {
    this.middlewares.push(middleware);
    return this;
  }
}