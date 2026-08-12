import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    image:{
      type:String,
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
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
