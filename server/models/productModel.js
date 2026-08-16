import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    sku: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    productname: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    warehouses: [
      {
        name: {
          type: String,
        },
        location: {
          type: String,
        },
        stock: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
