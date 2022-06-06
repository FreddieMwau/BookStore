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
exports.loginUser = exports.createUser = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const signupValidator_1 = require("../helpers/signupValidator");
const loginValidator_1 = require("../helpers/loginValidator");
dotenv_1.default.config();
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (0, uuid_1.v1)();
        const { userName, userEmail, userPassword } = req.body;
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const { error } = signupValidator_1.signupSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        const hashedPassword = yield bcrypt_1.default.hash(userPassword, 15);
        yield dbPool.request()
            .input('userId', mssql_1.default.VarChar, userId)
            .input('userName', mssql_1.default.VarChar, userName)
            .input('userEmail', mssql_1.default.VarChar, userEmail)
            .input('userPassword', mssql_1.default.VarChar, hashedPassword)
            .execute('createUser');
        const token = jsonwebtoken_1.default.sign(userId, process.env.SECRET_KEY);
        res.status(200).json({ message: "User created successfully", token });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let dbPool = yield mssql_1.default.connect(config_1.default);
        const { userEmail, userPassword } = req.body;
        const { error } = loginValidator_1.loginSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        let user = yield dbPool.request()
            .input('userEmail', mssql_1.default.VarChar, userEmail)
            .execute('getUserByEmail');
        const validatePwd = yield bcrypt_1.default.compare(userPassword, user.recordset[0].userPassword);
        if (!validatePwd) {
            return res.json({ message: "Invalid credentials." });
        }
        const data = user.recordset.map(record => {
            const { userPassword } = record, rest = __rest(record, ["userPassword"]);
            return rest;
        });
        const token = jsonwebtoken_1.default.sign(user.recordset[0].userEmail, process.env.SECRET_KEY);
        res.status(200).json({ message: 'Logged in successfully', token });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.loginUser = loginUser;
