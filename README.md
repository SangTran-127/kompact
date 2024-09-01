# Kompact

Kompact is a TypeScript backend library for Express that leverages metadata programming using decorators. Inspired by NestJS, it provides a clean and declarative way to define routes, middleware, and request handlers, without using an Inversion of Control (IoC) container.

## Features

- **Decorators for Routes**: Define your Express routes using decorators.
- **Middleware Support**: Easily attach middleware to your routes.
- **Request Handlers**: Simplify the process of handling requests and responses.
- **Metadata Programming**: Utilize metadata to manage route configurations and middleware.

## Installation

You can install Kompact via cli:

```bash
npm install -g kompact-cli
kompact create <project-name>
```

## Usage

Here's an example of how to create a simple Express server using Kompact.

1. Setting Up Your Project

First, ensure your tsconfig.json has the following settings enabled:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true
  }
}
```

2. Example 
   
Controller 

```ts
import {
  Auth,
  Controller,
  CurrentUser,
  Get,
  Post,
  Request,
  Response,
} from "kompact";

@Controller("cat")
export class CatController {
  @Get()
  getCat(req: Request, res: Response) {
    res.send("hello, I sent you a cat");
  }

  @Auth
  @Post()
  addCat(req: Request, res: Response, @CurrentUser user: any) {
    console.log(user);
  }
}
```

In app.ts

```ts
import { KompactApp } from "kompact";
import { CatController } from "@controllers/cat.controller";

const app = new KompactApp({
  controllers: [CatController],
  authenticator: (req, res, next) => {
    // const accessToken = req.headers["authorization"];
    // if (!accessToken) res.status(401);
    req.user = {
      name: "Sang tran",
    };
    return next();
  },
});

app.start(3001, () => {
  console.log(`running at ${3001}`);
});
```

Sorry 😢😢😢😢 I will update the docs later 🙏🙏🙏🙏

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

This `README.md` provides a clear overview of Kompact, including installation instructions, usage examples, and information on how to set up and run the project.
