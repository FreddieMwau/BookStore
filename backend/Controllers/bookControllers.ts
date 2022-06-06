import { v1 as uid } from 'uuid'
import mssql from 'mssql'
import sqlConfig from '../config/config'
import dotenv from 'dotenv'
import { RequestHandler } from 'express'
import { addBookSchema } from '../helpers/addBookValidator'
dotenv.config()

export const createBook: RequestHandler = async (req, res) => {
    try{
        const bookId = uid()
        // this destructures the request body and only remains with the book property of the request just to handle this endpoint
        const {users, ...book} = req.body
        // const { bookTitle, bookImageUrl, bookDescription, bookAuthor, publishedDate } = req.body as { bookTitle: string, bookImageUrl:string, bookDescription:string, bookAuthor:string, publishedDate:number}
        let dbPool = await mssql.connect(sqlConfig)
        const { error } = addBookSchema.validate(book)
        if (error) {
            return res.json({ error: error.details[0].message })
        }
        await dbPool.request()
            .input('bookId', mssql.VarChar, bookId)
            .input('bookTitle', mssql.VarChar, book.bookTitle)
            .input('bookImageUrl', mssql.VarChar, book.bookImageUrl)
            .input('bookAuthor', mssql.VarChar, book.bookAuthor)
            .input('bookDescription', mssql.VarChar, book.bookDescription)
            .input('publishedDate', mssql.Int, book.publishedDate)
            .execute('addBook')

        res.status(200).json({message:"Book saved successfully"})
    } catch(error:any){
        res.json({error: error.message})
    }
}

export const getAllBooks: RequestHandler = async (req, res) => {
    try{
        let dbPool = await mssql.connect(sqlConfig)
        const books = await dbPool.request()
            .execute('getAllBooks')
        res.status(200).json(books.recordset)
    } catch (error: any){
        res.json({error: error.message})
    }
}

export const getBookById: RequestHandler<{ bookId: string }> = async (req, res) => {
    try{
        const bookId = req.params.bookId
        let dbPool = await mssql.connect(sqlConfig)
        const book = await dbPool.request()
            .input('bookId', mssql.VarChar, bookId)
            .execute('getBookById')
        console.log(book.recordset[0]);
        
        if(!book.recordset[0]){
            return res.json({ message: `Book with id : ${bookId} isn't in our records`})
        }

        res.status(200).json(book.recordset[0])
    } catch(error:any){
        res.json({error: error.message})
    }
}

export const deleteBook: RequestHandler = async (req, res) => {
    try{
        const bookId = req.params.bookId
        let dbPool = await mssql.connect(sqlConfig)
        const book = await dbPool.request()
            .input('bookId', mssql.VarChar, bookId)
            .execute('getBookById')
        if (!book.recordset[0]) {
            return res.json({ message: `Book with id : ${bookId} isn't in our records` })
        }

        await dbPool.request()
            .input('bookId', mssql.VarChar, bookId)
            .execute('deleteBook')

        res.status(200).json({message: 'Book delete successfully from the library records'})
    } catch(error:any){
        res.json({error: error.message})
    }
}

export const updateBook: RequestHandler = async (req, res) => {
    try{
        const bookId = req.params.bookId
        const { bookTitle, bookImageUrl, bookDescription, bookAuthor, publishedDate } = req.body as { bookTitle: string, bookImageUrl: string, bookDescription: string, bookAuthor: string, publishedDate: number }
        let dbPool = await mssql.connect(sqlConfig)
        const book = await dbPool.request()
            .input('bookId', mssql.VarChar, bookId)
            .execute('getBookById')
        if (!book.recordset[0]) {
            return res.json({ message: `Book with id : ${bookId} isn't in our records` })
        }

        await dbPool.request()
            .input('bookId', mssql.VarChar, bookId)
            .input('bookTitle', mssql.VarChar, bookTitle)
            .input('bookImageUrl', mssql.VarChar, bookImageUrl)
            .input('bookAuthor', mssql.VarChar, bookAuthor)
            .input('bookDescription', mssql.VarChar, bookDescription)
            .input('publishedDate', mssql.Int, publishedDate)
            .execute('updateBook')

        res.status(200).json({message: 'Book details updates successfully. '})
    } catch(error:any){
        res.json({error: error.message})
    }
}