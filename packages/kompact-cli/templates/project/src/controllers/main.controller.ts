import { Controller, Get, Request, Response } from '@kompact/core';

@Controller('')
export class MainController {
  @Get('')
  getMain(req: Request, res: Response) {
    res.send('hello world');
  }
}
