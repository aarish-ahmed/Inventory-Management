import Product from "../../models/productModel.js";
import { Transaction } from "../../models/transactionModel.js";

const sellProductHandler = async (req, res) => {
  try {
    const productId = req.params.id;

    const findProduct = await Product.findById(productId);

    if (!findProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const populatedProduct = await findProduct.populate(
      "supplier",
      "name"
    );

    const productname = findProduct.productname;
    const supplier = populatedProduct.supplier?.name || "N/A";

    const quantity = Number(req.body.quantity);
    const warehouseName = req.body.warehouse;

    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    const warehouse = findProduct.warehouses.find(
      (warehouse) => warehouse.name === warehouseName
    );

    if (!warehouse) {
      return res.status(404).json({
        message: "Warehouse not found",
      });
    }

    if (quantity > warehouse.stock) {
      return res.status(400).json({
        message: "Quantity exceeds current stock",
      });
    }

    // Reduce warehouse stock
    warehouse.stock -= quantity;

    await findProduct.save();

    const subtotal = findProduct.price * quantity;

    // Create transaction
    await Transaction.create({
      trxType:'sale',
      user: req.user.id,
      unitPrice:findProduct.price,
      product: productId,
      productname,
      supplier,
      warehouse: warehouse._id,
      warehouseName: warehouse.name,
      quantity,
      subtotal,
    });

    // Get updated product
    const updatedProduct = await Product.findById(productId).populate(
      "supplier",
      "name"
    );

    // Get updated transaction history
    const transactions = await Transaction.find({
      product: productId,
    })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Sold successfully",
      product: updatedProduct,
      transactions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "sellProductHandler error",
    });
  }
};

export default sellProductHandler;