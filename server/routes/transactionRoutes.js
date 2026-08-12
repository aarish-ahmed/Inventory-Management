import express from 'express'
import getTransactionHandler from '../handlers/productHandlers/getTransaction.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const transactionRoutes=express.Router()

transactionRoutes.get('/list',authMiddleware,getTransactionHandler)

export default transactionRoutes