import { Supplier } from "../../models/supplierModel.js";
const updateSupplierHandler = async (req, res) => {
    try {
        const supplierId=req.params.productId
    const supplier=await Product.findByIdAndUpdate(
        supplierId,
        req.body,
        {new:true}
    )
    if(!supplier){
        return res.status(404).json({
            message:'supplier not found'
        })
    }
    const updatedSupplierList=await Supplier.find()
    return res.json(updatedSupplierList)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "updateSupplierHandler error",
        });
    }
};  
export default updateSupplierHandler