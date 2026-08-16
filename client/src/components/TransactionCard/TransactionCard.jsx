import "./TransactionCard.css";

const TransactionCard = ({ transactions, handleReceipt, downloading }) => {
  return (
    <div className="transaction-card-container">

      <div className="transaction-header">
        <span>Product</span>
        <span>Supplier</span>
        <span>Quantity</span>
        <span>Subtotal</span>
        <span>Date</span>
        <span>Type</span>
        <span>Action</span>
      </div>

      <ol className="transaction-list">

        {transactions.length > 0 ? (

          transactions.map((transaction) => (

            <li
              key={transaction._id}
              className="transaction-row"
            >

              <span className="transaction-data">
                {transaction.productname || "N/A"}
              </span>

              <span className="transaction-data">
                {transaction.supplier || "N/A"}
              </span>

              <span className="transaction-data">
                {transaction.quantity}
              </span>

              <span className="transaction-data">
                ৳{transaction.subtotal}
              </span>

              <span className="transaction-data">
                {transaction.createdAt
                  ? new Date(
                      transaction.createdAt
                    ).toLocaleDateString()
                  : "N/A"}
              </span>

              {/* Transaction Type */}

              <span className="transaction-data">
                <span
                  className={`transaction-type ${
                    transaction.trxType === "purchase"
                      ? "purchase-type"
                      : "sale-type"
                  }`}
                >
                  {transaction.trxType || "N/A"}
                </span>
              </span>

              {/* Receipt */}

              <span className="transaction-data">

                <button
                  type="button"
                  className="receipt-btn"
                  onClick={() =>
                    handleReceipt(transaction._id)
                  }
                  disabled={
                    downloading === transaction._id
                  }
                >
                  {downloading === transaction._id
                    ? "Generating..."
                    : "Receipt"}
                </button>

              </span>

            </li>

          ))

        ) : (

          <li className="no-transaction">
            No transaction yet
          </li>

        )}

      </ol>

    </div>
  );
};

export default TransactionCard;