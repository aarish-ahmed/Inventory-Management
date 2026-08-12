import exprerss from 'express'
import addSupplierHandler from '../handlers/supplierHandlers/addSupplier.js'
import deleteSupplierHandler from '../handlers/supplierHandlers/deleteSupplier.js'
import getSupplierHandler from '../handlers/supplierHandlers/getSupplier.js'
import updateSupplierHandler from '../handlers/supplierHandlers/updateSupplier.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const supplierRoutes=exprerss.Router()

supplierRoutes.post('/add',authMiddleware,addSupplierHandler)
supplierRoutes.delete('/delete/:id',authMiddleware,deleteSupplierHandler)
supplierRoutes.get('/list',authMiddleware,getSupplierHandler)
supplierRoutes.patch('/update/:id',authMiddleware,updateSupplierHandler)

export default supplierRoutes