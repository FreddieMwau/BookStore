import express from 'express'
import { createUser, loginUser } from '../Controllers/authControllers'
const authRouter = express.Router()

authRouter.post('/create', createUser);
authRouter.post('/login', loginUser);

export default authRouter