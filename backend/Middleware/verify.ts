import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

interface RequestExtended extends Request{
    users?: any
}

export const verifyToken = (req:RequestExtended, res:Response, next:NextFunction) => {
    const token = req.headers['token'] as string
    if(!token){
        return res.json({error: 'Not authorised to access this route. Token not found'})
    }
    try{
        let decodeToken 
        decodeToken = <JwtPayload>jwt.verify(token, process.env.SECRET_KEY as string)
        req.body.users = decodeToken
    } catch(error:any){
        return res.json({error: 'Invalid token has been provided'})
    }
    next()
}