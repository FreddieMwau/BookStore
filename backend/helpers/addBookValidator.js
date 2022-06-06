"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBookSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addBookSchema = joi_1.default.object({
    bookTitle: joi_1.default.string().required(),
    bookImageUrl: joi_1.default.string().required(),
    bookAuthor: joi_1.default.string().required(),
    bookDescription: joi_1.default.string().required(),
    publishedDate: joi_1.default.number().required()
});
