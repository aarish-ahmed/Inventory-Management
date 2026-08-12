import dotenv from'dotenv'
dotenv.config()
import app from './app.js'
import connectDB from './config/db.js'


const port=process.env.PORT

connectDB()

app.listen(port,()=>{
    console.log(`server running on port successfully`)
})



