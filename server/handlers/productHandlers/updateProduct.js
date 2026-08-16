import cloudinary from "../../config/coudinary.js";
import Product from "../../models/productModel.js";
const updateProductHandler = async (req, res) => {
    try {
        const productId=req.params.id
        console.log(productId)
        const product=await Product.findById( productId)
        if(!product){
        return res.status(404).json({
            message:'product not found'
        })
    }
    let imageUrl= product.image;
    if(req.file){
        const uploadImage= await cloudinary.uploader.upload(req.file.path)
        imageUrl=uploadImage.secure_url
    }
      const warehouses = JSON.parse(req.body.warehouses);
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        productname: req.body.productname,
        sku:req.body.sku,
        category: req.body.category,
        price: req.body.price,
        warehouses,
        supplier: req.body.supplier,
        image: imageUrl,
      },
      { returnDocument: "after",}
    );
    
    const updatedProductList=await Product.find()
    return res.json(updatedProductList)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "updateProductHandler error",
        });
    }
};
export default updateProductHandler