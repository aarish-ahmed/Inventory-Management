import Product from "../../models/productModel.js";
import { Supplier } from "../../models/supplierModel.js";
import { Transaction } from "../../models/transactionModel.js";
import mongoose from "mongoose";
const dashboardHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const totalProducts = await Product.countDocuments({
      user: req.user.id,
    });
    const totalSuppliers = await Supplier.countDocuments({
      user: req.user.id,
    });
    const totalTransactions = await Transaction.countDocuments({
      user: req.user.id,
    });
   
    const revenue= await Transaction.aggregate([
        {
            $match:{
                 user: new mongoose.Types.ObjectId(req.user.id),
            },
        },
        {
            $group:{
                _id:null,
                totalRevenue:{
                    $sum:'$subtotal',
                },
            },
        },
    ])
    console.log(req.user.id);
   
    const totalRevenue= revenue.length>0? revenue[0].totalRevenue : 0;
    
    const lowStockProduct=await Product.countDocuments({
        user:req.user.id,
        stock:{$lt:10},
    })
    
    
    return res.status(200).json([{
       totalSuppliers:totalSuppliers,
       totalProducts:totalProducts,
       totalTransactions:totalTransactions,
       totalRevenue:totalRevenue,
       lowStockProduct:lowStockProduct,
    }])
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export default dashboardHandler;
