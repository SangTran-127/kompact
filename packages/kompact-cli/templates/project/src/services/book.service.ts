import { NotFoundError } from 'kompact'
import { Book, CreateBookDto, UpdateBookDto } from '../dto/book.dto'

export class BookService {
  private readonly bookList: Book[] = []
  private idCounter: number = 1

  createBook(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      ...createBookDto,
      id: this.idCounter++,
    }
    this.bookList.push(newBook)
    return newBook
  }

  getAllBook(): Book[] {
    return this.bookList
  }

  findOne(id: number): Book {
    const book = this.bookList.find(book => book.id === id)
    if (!book) {
      throw new NotFoundError(`Book with ID ${id} not found`)
    }
    return book
  }

  update(id: number, updateBookDto: UpdateBookDto): Book {
    const bookIndex = this.bookList.findIndex(book => book.id === id)
    if (bookIndex === -1) {
      throw new NotFoundError(`Book with ID ${id} not found`)
    }
    const updatedBook = { ...this.bookList[bookIndex], ...updateBookDto }
    this.bookList[bookIndex] = updatedBook
    return updatedBook
  }

  remove(id: number): Book[] {
    const bookIndex = this.bookList.findIndex(book => book.id === id)
    if (bookIndex === -1) {
      throw new NotFoundError(`Book with ID ${id} not found`)
    }
    return this.bookList.splice(bookIndex, 1)
  }
}

export const bookService = new BookService()
