import Product from "../../models/productModel.js";
const getProductHandler = async (req, res) => {
  
    try {
        const page=Number(req.query.page)
        const limit=10
        const skip=(page-1)*limit
        const productList = await Product.find({user:req.user.id}).populate("supplier", "name").skip(skip).limit(limit);
        const totalProduct=await Product.countDocuments({user:req.user.id})
        const totalPages=Math.ceil(totalProduct/limit)
        console.log(totalPages)
       
        
    return res.status(200).json({
        products:productList,
        totalPages:totalPages,
    })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "getProductHandler error",
        });
    }
};
export default getProductHandler