import express from 'express'
import getTransactionHandler from '../handlers/productHandlers/getTransaction.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import getTransactionReceiptHandler from '../handlers/transactionHandlers/getTransactionReceipt.js'

const transactionRoutes=express.Router()

transactionRoutes.get('/list',authMiddleware,getTransactionHandler)
transactionRoutes.get(
  "/receipt/:id",
  authMiddleware,
 getTransactionReceiptHandler
);
export default transactionRoutes