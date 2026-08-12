import { Supplier } from "../../models/supplierModel.js";
const getSupplierHandler = async (req, res) => {
  try {
    console.log("USER ID:", req.user.id);

    const supplierList = await Supplier.find({
      user:req.user.id,
      isActive:true,
    });
    console.log('supplierlist',supplierList)
    return res.status(201).json(supplierList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "getSupplierHandler Error",
    });
  }
};
export default getSupplierHandler;
