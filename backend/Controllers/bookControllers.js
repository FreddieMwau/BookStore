"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.deleteBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const dotenv_1 = __importDefault(require("dotenv"));
const addBookValidator_1 = require("../helpers/addBookValidator");
dotenv_1.default.config();
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = (0, uuid_1.v1)();
        // this destructures the request body and only remains with the book property of the request just to handle this endpoint
        const _a = req.body, { users } = _a, book = __rest(_a, ["users"]);
        // const { bookTitle, bookImageUrl, bookDescription, bookAuthor, publishedDate } = req.body as { bookTitle: string, bookImageUrl:string, bookDescription:string, bookAuthor:string, publishedDate:number}
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const { error } = addBookValidator_1.addBookSchema.validate(book);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        yield dbPool.request()
            .input('bookId', mssql_1.default.VarChar, bookId)
            .input('bookTitle', mssql_1.default.VarChar, book.bookTitle)
            .input('bookImageUrl', mssql_1.default.VarChar, book.bookImageUrl)
            .input('bookAuthor', mssql_1.default.VarChar, book.bookAuthor)
            .input('bookDescription', mssql_1.default.VarChar, book.bookDescription)
            .input('publishedDate', mssql_1.default.Int, book.publishedDate)
            .execute('addBook');
        res.status(200).json({ message: "Book saved successfully" });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const books = yield dbPool.request()
            .execute('getAllBooks');
        res.status(200).json(books.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const book = yield dbPool.request()
            .input('bookId', mssql_1.default.VarChar, bookId)
            .execute('getBookById');
        console.log(book.recordset[0]);
        if (!book.recordset[0]) {
            return res.json({ message: `Book with id : ${bookId} isn't in our records` });
        }
        res.status(200).json(book.recordset[0]);
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getBookById = getBookById;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const book = yield dbPool.request()
            .input('bookId', mssql_1.default.VarChar, bookId)
            .execute('getBookById');
        if (!book.recordset[0]) {
            return res.json({ message: `Book with id : ${bookId} isn't in our records` });
        }
        yield dbPool.request()
            .input('bookId', mssql_1.default.VarChar, bookId)
            .execute('deleteBook');
        res.status(200).json({ message: 'Book delete successfully from the library records' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.deleteBook = deleteBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const { bookTitle, bookImageUrl, bookDescription, bookAuthor, publishedDate } = req.body;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const book = yield dbPool.request()
            .input('bookId', mssql_1.default.VarChar, bookId)
            .execute('getBookById');
        if (!book.recordset[0]) {
            return res.json({ message: `Book with id : ${bookId} isn't in our records` });
        }
        yield dbPool.request()
            .input('bookId', mssql_1.default.VarChar, bookId)
            .input('bookTitle', mssql_1.default.VarChar, bookTitle)
            .input('bookImageUrl', mssql_1.default.VarChar, bookImageUrl)
            .input('bookAuthor', mssql_1.default.VarChar, bookAuthor)
            .input('bookDescription', mssql_1.default.VarChar, bookDescription)
            .input('publishedDate', mssql_1.default.Int, publishedDate)
            .execute('updateBook');
        res.status(200).json({ message: 'Book details updates successfully. ' });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.updateBook = updateBook;
