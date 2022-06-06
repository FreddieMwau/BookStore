import express from 'express'
import cors from 'cors'


import sqlConfig from './config/config'
import mssql from 'mssql'
import authRouter from './Routes/authRoutes'
import booksRouter from './Routes/bookRoutes'

const app = express()
app.use(cors( {origin: true}))
app.use(express.json())
app.use('/user', authRouter)
app.use('/books', booksRouter)
app.listen(7000, () => {
    console.log("========> Server launched at port 7000");  
})

const checkConnections = async () => {
    try{
        const y = await mssql.connect(sqlConfig)
        if(y.connected){
            console.log("Database connected successfully"); 
        }
    } catch(error:any){
        console.log(error.message);
    }
}

checkConnections()