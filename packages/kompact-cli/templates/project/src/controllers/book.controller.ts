import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Response,
  SuccessResponse,
} from 'kompact'
import { bookService } from '../services/book.service'
import { CreateBookDto, UpdateBookDto } from '../dto/book.dto'

@Controller('book')
export class BookController {
  @Get()
  getAllBook(_: Request, res: Response) {
    console.log(bookService.getAllBook())
    new SuccessResponse({
      metadata: [],
      message: 'Get all book successfully',
      statusCode: 200,
    }).send(res)
  }

  @Post()
  addBook(@Body() addBookDto: CreateBookDto, res: Response) {
    console.log(`add book call`)
    new SuccessResponse({
      metadata: bookService.createBook(addBookDto),
      message: 'Add book successfully',
    }).send(res)
  }

  @Get('/:id')
  getBookById(@Param('id') bookId: string, res: Response) {
    new SuccessResponse({
      metadata: bookService.findOne(Number(bookId)),
      message: 'Get book by id successfully',
    }).send(res)
  }

  @Patch('/:id')
  updateBook(
    @Param('id') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
    res: Response,
  ) {
    new SuccessResponse({
      metadata: bookService.update(Number(bookId), updateBookDto),
      message: 'Update book by id successfully',
    }).send(res)
  }

  @Delete('/:id')
  deleteBook(@Param('id') bookId: string, res: Response) {
    new SuccessResponse({
      metadata: bookService.remove(Number(bookId)),
      message: 'Update book by id successfully',
    }).send(res)
  }
}
