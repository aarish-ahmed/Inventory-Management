import mongoose from "mongoose";

const supplierSchema = mongoose.Schema(
  { 
    user: {
          type:mongoose.Schema.Types.ObjectId,
          ref:'User',
          required:true,
        },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      email: {
        type: String,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    isActive: {
  type: Boolean,
  default:true
}
  },
  { timestamps: true },
);

export const Supplier = mongoose.model("Supplier", supplierSchema);
