const {connection}=require('./config/db')
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const {userRouter}=require('./routes/user.route')



const app=express()
app.use(express.json())
app.use(cors())
app.use('/user',userRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log('Server connected to database')
    }catch(err){
        console.log(err)
        console.log('Database connection error')
    }
    console.log(`Server started on port ${process.env.port}`)
})
