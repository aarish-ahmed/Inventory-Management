import TransactionCard from "../../components/TransactionCard/TransactionCard";
import { useState, useEffect } from "react";
import { getTransaction } from "../../api/transactionApi";
import "./Transaction.css";

const Transaction = () => {
 
  const [transactions, setTransaction] = useState([]);
  
  const getTransactionHandler = async () => {
    getTransaction(setTransaction);
  };
  
  useEffect(() => {
    getTransactionHandler();
  }, []);

  return (
    <div className="transaction-page-container">
      <h2 className="page-title">Transactions</h2>
      
      <TransactionCard transactions={transactions} />
     
    </div>
  );
};

export default Transaction;