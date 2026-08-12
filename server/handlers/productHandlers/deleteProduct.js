import Product from "../../models/productModel.js";

const deleteProductHandler = async (req, res) => {
  try {
    const productId = req.params.id;
  
   
    await Product.findOneAndDelete({
      _id:productId,
      user:req.user.id
    });
    const newProductList = await Product.find(
  {user:req.user.id}
).populate("supplier", "name");
    res.status(200).json(newProductList);
    console.log(newProductList)
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "deleteProductHandler error",
    });
  }
};
export default deleteProductHandler;
