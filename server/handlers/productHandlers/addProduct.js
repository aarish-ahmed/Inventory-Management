import Product from'../../models/productModel.js'
import cloudinary from '../../config/coudinary.js';
const addProductHandler = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)
        const {supplier,category,productname,stock,price}=req.body
    const existingProduct=await Product.findOne({
        user:req.user.id,
        supplier:supplier,
        category:category,
        productname:productname,
    })
    if(existingProduct){
        return res.status(409).json({
            message: 'product already exist'
        })
    }
   const uploadedToCloudinary=await cloudinary.uploader.upload(req.file.path)
    const product=await Product.create({
         user:req.user.id,
         image:uploadedToCloudinary.secure_url,
        supplier,
        category,
        productname,
        price,
        stock,
    })
    console.log(product)
    res.status(201).json({
        message:'product added successfully'
    })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "addProductHandler error",
        });
    }
};
export default addProductHandler