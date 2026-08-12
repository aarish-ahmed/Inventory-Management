import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ products, setProduct, showActions }) => {
  const navigate = useNavigate();

  const handleDelete = async (productId) => {
    const res = await fetch(
      `http://localhost:5000/product/delete/${productId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await res.json();

    if (res.ok) {
      setProduct(data);
    } else {
      console.log(data.message);
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/product/edit/${productId}`);
  };

  const handleSell = (productId) => {
    navigate(`/product/sell/${productId}`);
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <div className="product-card" key={product._id}>

          {/* Product Image */}
          <div className="product-image">
            <img
              src={product.image}
              alt={product.productname}
            />
          </div>

          {/* Product Information */}
          <div className="product-content">

            <h2>{product.productname}</h2>

            <p>
              <strong>Supplier:</strong>{" "}
              {product.supplier?.name || "N/A"}
            </p>

            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <p>
              <strong>Price:</strong> ৳{product.price}
            </p>

            <p>
              <strong>Stock:</strong>{" "}
              <span
                className={
                  product.stock === 0
                    ? "stock-out"
                    : product.stock <= 10
                    ? "stock-low"
                    : "stock-good"
                }
              >
                {product.stock}
              </span>
            </p>

          </div>

          {/* Actions */}
          {showActions && (
            <div className="product-actions">

              <button
                className="edit-btn"
                onClick={() => handleUpdate(product._id)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>

              <button
                className="sell-btn"
                onClick={() => handleSell(product._id)}
              >
                Sell
              </button>

            </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default ProductCard;