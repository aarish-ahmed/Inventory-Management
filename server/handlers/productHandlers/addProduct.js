import Product from "../../models/productModel.js";
import cloudinary from "../../config/coudinary.js";

const addProductHandler = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const {
      supplier,
      category,
      productname,
      price,
      sku,
    } = req.body;

    const warehouses = JSON.parse(req.body.warehouses);

    // Check if product already exists
    const existingProduct = await Product.findOne({
      user: req.user.id,
      sku: sku,
    });

    if (existingProduct) {
      return res.status(409).json({
        message: "Product with this SKU already exists",
      });
    }

    // Product data
    const productData = {
      user: req.user.id,
      supplier,
      category,
      productname,
      sku,
      price,
      warehouses,
    };

    // Upload image only if an image was provided
    if (req.file) {
      const uploadedToCloudinary =
        await cloudinary.uploader.upload(req.file.path);

      productData.image = uploadedToCloudinary.secure_url;
    }

    // Create product
    const product = await Product.create(productData);

    console.log(product);

    return res.status(201).json({
      message: "Product added successfully",
      product,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "addProductHandler error",
    });
  }
};

export default addProductHandler;