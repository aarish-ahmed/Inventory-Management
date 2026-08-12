import Product from "../../models/productModel.js";
const getOneProductHandler = async (req, res) => {
   try {
     const productId=req.params.id 
     console.log(productId)
    const product=await Product.findById(productId).populate("supplier", "name");
    console.log(product)
    return res.status(200).json([product])
   } catch (error) {
    console.error(error);
    return res.status(500).json({
        message: "Internal Server Error",
    });
   }
};
export default getOneProductHandler