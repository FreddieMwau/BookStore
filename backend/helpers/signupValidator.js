"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = joi_1.default.object({
    userName: joi_1.default.string().required(),
    userEmail: joi_1.default.string().email().required(),
    userPassword: joi_1.default.string().required().min(8).max(30)
});