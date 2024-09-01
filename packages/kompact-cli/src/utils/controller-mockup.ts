export function controllerMockup(
  controllerName: string,
  serviceName?: string
): string {
  const entity =
    controllerName.charAt(0).toUpperCase() + controllerName.slice(1)
  return `
import { Controller, Get, Post, Patch, Delete, Param, Body, Request, Response, SuccessResponse } from 'kompact';
${
  serviceName
    ? `import { ${serviceName} } from '../services/${serviceName}';`
    : ''
}

@Controller('${controllerName.toLowerCase()}')
export class ${entity}Controller {
  @Get()
  getAll${entity}s(_: Request, res: Response) {
    new SuccessResponse({
      metadata: [],
      message: 'Get all ${controllerName.toLowerCase()}s successfully',
      statusCode: 200,
    }).send(res);
  }

  @Post()
  add${entity}(req: Response, res: Response) {
    new SuccessResponse({
      metadata: {},
      message: 'Add ${controllerName.toLowerCase()} successfully',
    }).send(res);
  }

  @Get('/:id')
  get${entity}ById(@Param('id') id: string, res: Response) {
    new SuccessResponse({
      metadata: {},
      message: 'Get ${entity} by ID successfully',
    }).send(res);
  }

  @Patch('/:id')
  update${entity}(
    @Param('id') id: string,
    @Body() update${entity}Dto: {},
    res: Response
  ) {
    new SuccessResponse({
      metadata: {},
      message: 'Update ${entity.toLowerCase()} by ID successfully',
    }).send(res);
  }

  @Delete('/:id')
  delete${entity}(@Param('id') id: string, res: Response) {
    new SuccessResponse({
      metadata: {},
      message: 'Delete ${entity} by ID successfully',
    }).send(res);
  }
}
`
}
