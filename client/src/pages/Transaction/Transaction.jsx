import TransactionCard from "../../components/TransactionCard/TransactionCard";
import { useState, useEffect } from "react";
import {
  getTransaction,
  getTransactionReceiptApi,
} from "../../api/transactionApi";
import "./Transaction.css";

const Transaction = () => {
  const [transactions, setTransaction] = useState([]);
  const [downloading, setDownloading] = useState(null);

  // Filter
  const [filter, setFilter] = useState("all");

  const getTransactionHandler = async () => {
    getTransaction(setTransaction);
  };

  useEffect(() => {
    getTransactionHandler();
  }, []);

  // Download receipt
  const handleReceipt = async (transactionId) => {
    try {
      setDownloading(transactionId);

      const res = await getTransactionReceiptApi(transactionId);

      if (!res.ok) {
        console.error(
          "Failed to generate receipt:",
          res.status
        );
        return;
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `receipt-${transactionId}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(
        "Receipt download error:",
        error
      );
    } finally {
      setDownloading(null);
    }
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(
    (transaction) => {
      if (filter === "all") {
        return true;
      }

      return transaction.trxType === filter;
    }
  );

  return (
    <div className="transaction-page-container">

      <h2 className="page-title">
        Transactions
      </h2>


      {/* =========================
          TRANSACTION FILTER
      ========================= */}

      <div className="transaction-filter">

        <button
          type="button"
          className={
            filter === "all"
              ? "filter-btn active"
              : "filter-btn"
          }
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          type="button"
          className={
            filter === "sale"
              ? "filter-btn active sale-filter"
              : "filter-btn"
          }
          onClick={() => setFilter("sale")}
        >
          Sales
        </button>

        <button
          type="button"
          className={
            filter === "purchase"
              ? "filter-btn active purchase-filter"
              : "filter-btn"
          }
          onClick={() => setFilter("purchase")}
        >
          Purchases
        </button>

      </div>


      {/* =========================
          TRANSACTIONS
      ========================= */}

      <TransactionCard
        transactions={filteredTransactions}
        handleReceipt={handleReceipt}
        downloading={downloading}
      />

    </div>
  );
};

export default Transaction;