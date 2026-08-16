import Product from "../../models/productModel.js";
import { Transaction } from "../../models/transactionModel.js";
import { Supplier } from "../../models/supplierModel.js";
const purchaseProductHandler = async (req, res) => {
  try {
    const productId = req.params.id;

    const {
      quantity,
      warehouseName,
      supplier,
      unitPrice,
    } = req.body;

    const Quantity = Number(quantity);
    const Price = Number(unitPrice);

    // Validation
    if (!Quantity || Quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    if (Number.isNaN(Price) || Price < 0) {
      return res.status(400).json({
        message: "Invalid purchase price",
      });
    }

    if (!warehouseName) {
      return res.status(400).json({
        message: "Warehouse is required",
      });
    }

    if (!supplier) {
      return res.status(400).json({
        message: "Supplier is required",
      });
    }

    // Find product belonging to logged-in user
    const product = await Product.findOne({
      _id: productId,
      user: req.user.id,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Find exact warehouse
    const warehouse = product.warehouses.find(
      (warehouse) => warehouse.name === warehouseName
    );

    if (!warehouse) {
      return res.status(404).json({
        message: "Warehouse not found",
      });
    }

    // Add stock
    warehouse.stock += Quantity;

    await product.save();

    // Purchase total
    const subtotal = Quantity * Price;

    // Create transaction
    const findSupplier=await Supplier.findById(supplier)
  


if (!findSupplier) {
  return res.status(404).json({
    message: "Supplier not found",
  });
}
    await Transaction.create({
      trxType:'purchase',
      user: req.user.id,
      product: product._id,
      productname: product.productname,
      unitPrice:Price,
      supplier:findSupplier.name,
      warehouseName: warehouse.name,
      quantity: Quantity,
      subtotal,
      type: "purchase",
    });

    // Get updated product
    const updatedProduct = await Product.findById(
      product._id
    ).populate("supplier", "name");

    // Get transaction history
    const transactions = await Transaction.find({
      product: product._id,
    })
      .populate("user", "username")
      .populate("supplier", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Purchase successful",
      product: updatedProduct,
      transactions,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "purchaseProductHandler error",
    });
  }
};

export default purchaseProductHandler;