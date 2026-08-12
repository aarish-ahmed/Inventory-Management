import Product from "../../models/productModel.js";
import { Transaction } from "../../models/transactionModel.js";
const sellProductHandler = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(req.body)
    
    const findProduct = await Product.findById(productId);
    const PopulateFindProduct= await findProduct.populate('supplier','name')

    const productname= findProduct.productname
   
    const supplier= PopulateFindProduct.supplier.name
    console.log(supplier,'supplied name')
   
    const Quantity = Number(req.body.quantity);
    if (!findProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    if (Quantity <= 0) {
  return res.status(201).json({
    message: "Quantity must be greater than 0",
  });
}  
    if (Quantity > findProduct.stock) {
      return res.status(201).json({
        message: "quantity exceeds current stock",
      });
    }
    const remainingStock = findProduct.stock - Quantity;
    await Product.findByIdAndUpdate(productId, {
      stock: remainingStock,
    });
    const subtotal=findProduct.price*Quantity
    await Transaction.create({
      user:req.user.id,
      product: productId,
      productname,
      supplier,
      quantity: Quantity,
      subtotal,
    });
    
    res.status(200).json({
      
      message: "sold successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "sellProductHandler error",
    });
  }
};
export default sellProductHandler;
