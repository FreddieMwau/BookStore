import express from 'express'
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from '../Controllers/bookControllers'
import { verifyToken } from '../Middleware/verify'
const booksRouter = express.Router()

booksRouter.post('/create', createBook)
booksRouter.get('/', verifyToken, getAllBooks)
booksRouter.get('/book/:bookId', getBookById)
booksRouter.delete('/delete/:bookId', verifyToken, deleteBook)
booksRouter.put('/update/:bookId', verifyToken, updateBook)

export default booksRouter