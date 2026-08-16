import { Transaction } from "../../models/transactionModel.js";

const getTransactionHandler = async (req, res) => {
  try {
      const transactionList=await Transaction.find().sort({ createdAt: -1 })
     
    return res.status(201).json(transactionList)
  } catch (error) {
    console.error(error);
    return res.status(500).json({
        message: "getTransactionHandler Error",
    });
  }
};  
export default getTransactionHandler