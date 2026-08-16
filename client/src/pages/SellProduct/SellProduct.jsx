import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getOneProductApi,
  sellProductApi,
} from "../../api/productApi";
import "./SellProduct.css";

const SellProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selling, setSelling] = useState(false);

  // Initial fetch
  useEffect(() => {
    const getProduct = async () => {
      const { res, data } = await getOneProductApi(id);

      if (res.ok) {
        setProduct(data.product);
        setTransactions(data.transactions);
      } else {
        setMessage(data.message);

        setTimeout(() => {
          setMessage("");
        }, 3000);
      }

      setLoading(false);
    };

    getProduct();
  }, [id]);

  // Sell product
  const handleSellProduct = async (e) => {
    e.preventDefault();

    setSelling(true);
    setMessage("");

    const quantity = e.target.quantity.value;

    const { res, data } = await sellProductApi(
      id,
      quantity,
      selectedWarehouse
    );

    if (res.ok) {
      // Update product stock
      setProduct(data.product);

      // Update transaction history
      setTransactions(data.transactions);

      setMessage(data.message);

      // Reset form
      e.target.reset();
      setSelectedWarehouse("");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      setMessage(data.message);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }

    setSelling(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>{message || "Product not found"}</p>;
  }

  const totalStock = product.warehouses?.reduce(
    (total, warehouse) => total + warehouse.stock,
    0
  );

  // Separate transactions
  const sales = transactions.filter(
    (transaction) => transaction.trxType === "sale"
  );

  const purchases = transactions.filter(
    (transaction) => transaction.trxType === "purchase"
  );

  return (
    <div className="sell-product-page">

      {/* PRODUCT DETAILS */}

      <div className="product-details">

        <div className="product-image">
          <img
            src={product.image}
            alt={product.productname}
          />
        </div>

        <div className="product-info">

          <h1>{product.productname}</h1>

          <p>
            <strong>Category:</strong>{" "}
            {product.category}
          </p>

          <p>
            <strong>Supplier:</strong>{" "}
            {product.supplier?.name || "N/A"}
          </p>

          <p>
            <strong>Price:</strong>{" "}
            ৳{product.price}
          </p>

          <p>
            <strong>Total Stock:</strong>{" "}
            {totalStock}
          </p>

        </div>

      </div>


      {/* WAREHOUSES */}

      <div className="warehouse-section">

        <h2>Warehouse Stock</h2>

        <div className="warehouse-list">

          {product.warehouses?.map((warehouse) => (
            <div
              className="warehouse-card"
              key={warehouse._id}
            >

              <h3>{warehouse.name}</h3>

              <p>
                <strong>Location:</strong>{" "}
                {warehouse.location}
              </p>

              <p>
                <strong>Stock:</strong>{" "}
                {warehouse.stock}
              </p>

            </div>
          ))}

        </div>

      </div>


      {/* SELL */}

      <div className="sell-section">

        <h2>Sell Product</h2>

        <form onSubmit={handleSellProduct}>

          <div>
            <label>Warehouse</label>

            <select
              value={selectedWarehouse}
              onChange={(e) =>
                setSelectedWarehouse(e.target.value)
              }
              required
            >

              <option value="">
                Select Warehouse
              </option>

              {product.warehouses?.map((warehouse) => (
                <option
                  key={warehouse._id}
                  value={warehouse.name}
                  disabled={warehouse.stock <= 0}
                >
                  {warehouse.name} — Stock:{" "}
                  {warehouse.stock}
                </option>
              ))}

            </select>

          </div>


          <div>

            <label>Quantity</label>

            <input
              name="quantity"
              type="number"
              min="1"
              placeholder="Enter quantity"
              required
            />

          </div>


          <button
            type="submit"
            disabled={selling}
          >
            {selling ? "Selling..." : "Confirm Sale"}
          </button>

        </form>

        {message && (
          <p>{message}</p>
        )}

      </div>


      {/* SALES HISTORY */}

      <div className="transaction-section">

        <h2>Sales History</h2>

        {sales.length === 0 ? (

          <p>No sales yet.</p>

        ) : (

          <div className="transaction-table">

            <div className="transaction-header">
              <span>Date</span>
              <span>Warehouse</span>
              <span>Quantity</span>
              <span>Sale Price</span>
              <span>Subtotal</span>
              <span>Sold By</span>
            </div>

            {sales.map((transaction) => (

              <div
                className="transaction-row"
                key={transaction._id}
              >

                <span>
                  {new Date(
                    transaction.createdAt
                  ).toLocaleDateString()}
                </span>

                <span>
                  {transaction.warehouseName}
                </span>

                <span>
                  {transaction.quantity}
                </span>

                <span>
                  ৳{transaction.unitPrice}
                </span>

                <span>
                  ৳{transaction.subtotal}
                </span>

                <span>
                  {transaction.user?.username || "N/A"}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* PURCHASE HISTORY */}

      <div className="transaction-section">

        <h2>Purchase History</h2>

        {purchases.length === 0 ? (

          <p>No purchases yet.</p>

        ) : (

          <div className="transaction-table">

            <div className="transaction-header">
              <span>Date</span>
              <span>Supplier</span>
              <span>Warehouse</span>
              <span>Quantity</span>
              <span>Purchase Price</span>
              <span>Subtotal</span>
            </div>

            {purchases.map((transaction) => (

              <div
                className="transaction-row"
                key={transaction._id}
              >

                <span>
                  {new Date(
                    transaction.createdAt
                  ).toLocaleDateString()}
                </span>

                <span>
                  {transaction.supplier || "N/A"}
                </span>

                <span>
                  {transaction.warehouseName}
                </span>

                <span>
                  {transaction.quantity}
                </span>

                <span>
                  ৳{transaction.unitPrice}
                </span>

                <span>
                  ৳{transaction.subtotal}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default SellProduct;