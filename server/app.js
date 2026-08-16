import express from 'express'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import productRoutes from './routes/productRoutes.js'
import supplierRoutes from './routes/supplierRoutes.js'

import cors from 'cors'
import transactionRoutes from './routes/transactionRoutes.js'
 
const app=express()
app.use(
  cors({
    origin: "https://base-inventory.netlify.app",
    credentials:true,
  })
);

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use('/user',userRoutes)
app.use('/product',productRoutes)
app.use('/supplier',supplierRoutes)
app.use('/transaction',transactionRoutes)

export default app