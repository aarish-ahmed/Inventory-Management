import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
      trxType: {
      type: String,
      enum: ["sale", "purchase"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    productname: {
      type: String,
    },

    supplier: {
      type: String,
    },

    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
    },

    warehouseName: {
      type: String,
    },

    quantity: {
      type: Number,
      required: true,
    },
    
    unitPrice: {
      type: Number,
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
