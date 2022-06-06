import {v1 as uid} from 'uuid'
import mssql from 'mssql'
import sqlConfig from '../config/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { signupSchema } from '../helpers/signupValidator'
import { loginSchema } from '../helpers/loginValidator'
dotenv.config()

interface RequestExtended extends Request {
    users?: any
}

export const createUser = async (req:Request, res:Response, next: NextFunction) => {
    try{
        const userId = uid()
        const {userName, userEmail, userPassword} = req.body as {userName: string, userEmail: string, userPassword: string}
        let dbPool = await mssql.connect(sqlConfig)
        const {error} = signupSchema.validate(req.body)
        if(error){
            return res.json({error: error.details[0].message})
        }
        const hashedPassword = await bcrypt.hash(userPassword, 15)
        await dbPool.request()
            .input('userId', mssql.VarChar, userId)
            .input('userName', mssql.VarChar, userName)
            .input('userEmail', mssql.VarChar, userEmail)
            .input('userPassword', mssql.VarChar, hashedPassword)
            .execute('createUser')
        res.status(200).json({message: "User created successfully"})
    } catch (error:any){
        res.json({error: error.message})
    }
}

export const loginUser : RequestHandler = async(req, res) => {
    try{
        let dbPool = await mssql.connect(sqlConfig)
        const {userEmail, userPassword} = req.body as {userEmail: string, userPassword: string}
        const { error } = loginSchema.validate(req.body)
        if (error) {
            return res.json({ error: error.details[0].message })
        }
        let user = await dbPool.request()
            .input('userEmail', mssql.VarChar, userEmail)
            .execute('getUserByEmail')

        const validatePwd = await bcrypt.compare(userPassword, user.recordset[0].userPassword)
        if(!validatePwd){
            return res.json({message: "Invalid credentials."})
        }
        const data = user.recordset.map(record => {
            const {userPassword, ...rest} = record
            return rest
        })

        const token = jwt.sign(user.recordset[0].userEmail, process.env.SECRET_KEY as string)
        res.status(200).json({message: 'Logged in successfully', token})
    } catch (error:any){
        res.json({error: error.message})
    }
}