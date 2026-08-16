import express from 'express'
import addProductHandler from '../handlers/productHandlers/addProduct.js'
import deleteProductHandler from '../handlers/productHandlers/deleteProduct.js'
import sellProductHandler from '../handlers/productHandlers/sellProduct.js'
import getProductHandler from '../handlers/productHandlers/getProduct.js'
import updateProductHandler from '../handlers/productHandlers/updateProduct.js'
import getOneProductHandler from '../handlers/productHandlers/getOneProduct.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import upload from '../config/multer.js'
import searchProductHandler from '../handlers/productHandlers/searchProduct.js'
import purchaseProductHandler from '../handlers/productHandlers/purchaseProduct.js'
const productRoutes=express.Router()

productRoutes.post('/add',authMiddleware,upload.single('image'),addProductHandler)
productRoutes.delete('/delete/:id',authMiddleware,deleteProductHandler)
productRoutes.get('/list',authMiddleware,getProductHandler)
productRoutes.patch('/update/:id',authMiddleware,upload.single('image'),updateProductHandler)
productRoutes.get('/search', authMiddleware, searchProductHandler)
productRoutes.get('/:id', authMiddleware, getOneProductHandler)
productRoutes.post('/sell/:id',authMiddleware,sellProductHandler)
productRoutes.post( "/purchase/:id",authMiddleware,purchaseProductHandler);

export default productRoutes