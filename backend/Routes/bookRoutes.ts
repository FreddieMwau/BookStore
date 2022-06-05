import express from 'express'
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from '../Controllers/bookControllers'
const booksRouter = express.Router()

booksRouter.post('/create', createBook)
booksRouter.get('/', getAllBooks)
booksRouter.get('/book/:bookId', getBookById)
booksRouter.delete('/delete/:bookId', deleteBook)
booksRouter.put('/update/:bookId', updateBook)

export default booksRouter