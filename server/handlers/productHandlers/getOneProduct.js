import Product from "../../models/productModel.js";
import { Transaction } from "../../models/transactionModel.js";

const getOneProductHandler = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId).populate(
      "supplier",
      "name"
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const transactions = await Transaction.find({
      product: productId,
    })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      product,
      transactions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default getOneProductHandler;