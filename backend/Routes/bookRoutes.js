"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookControllers_1 = require("../Controllers/bookControllers");
const booksRouter = express_1.default.Router();
booksRouter.post('/create', bookControllers_1.createBook);
booksRouter.get('/', bookControllers_1.getAllBooks);
booksRouter.get('/book/:bookId', bookControllers_1.getBookById);
booksRouter.delete('/delete/:bookId', bookControllers_1.deleteBook);
booksRouter.put('/update/:bookId', bookControllers_1.updateBook);
exports.default = booksRouter;
