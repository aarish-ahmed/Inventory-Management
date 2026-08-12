import { Supplier } from "../../models/supplierModel.js";
const deleteSupplierHandler = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await Supplier.findByIdAndUpdate(id, {
      isActive: false,
    });
    const newSupplierList = await Supplier.find({
        isActive:true,
        user:id
    });
    console.log(newSupplierList)
    res.status(200).json({
        message:'supplier deleted successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "deleteSupplierHandler error",
    });
  }
};
export default deleteSupplierHandler;
