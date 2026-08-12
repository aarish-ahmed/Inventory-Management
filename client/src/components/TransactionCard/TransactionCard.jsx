import "./TransactionCard.css";

const TransactionCard = ({ transactions }) => {
  return (
    <div className="transaction-card-container">
      <div className="transaction-header">
        <span>Product</span>
        <span>Supplier</span>
        <span>Quantity</span>
        <span>Subtotal</span>
        <span>Date</span>
      </div>

      <ol className="transaction-list">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <li key={transaction._id} className="transaction-row">
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
                  ? new Date(transaction.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </li>
          ))
        ) : (
          <p>No transaction yet</p>
        )}
      </ol>
    </div>
  );
};

export default TransactionCard;