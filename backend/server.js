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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const mssql_1 = __importDefault(require("mssql"));
const authRoutes_1 = __importDefault(require("./Routes/authRoutes"));
const bookRoutes_1 = __importDefault(require("./Routes/bookRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', authRoutes_1.default);
app.use('/books', bookRoutes_1.default);
app.listen(7000, () => {
    console.log("========> Server launched at port 7000");
});
const checkConnections = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const y = yield mssql_1.default.connect(config_1.default);
        if (y.connected) {
            console.log("Database connected successfully");
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
checkConnections();
