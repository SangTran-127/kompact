import { Controller, Get, Request, Response } from 'kompact'

@Controller('')
export class MainController {
  @Get('')
  getMain(req: Request, res: Response) {
    res.send('hello world')
  }
}
