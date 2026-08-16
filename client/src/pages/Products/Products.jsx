import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsApi } from "../../api/productApi";
import { useAuth } from "../../context/authContext";
import "./Products.css";

const Products = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [message, setMessage] = useState("");
  const [products, setProduct] = useState([]);

  const getProductsHandler = async () => {
    const { res, data } = await getProductsApi(page);

    if (res.ok) {
      setProduct(data.products);
      setTotalPage(data.totalPages);
      setMessage("");
    } else {
      console.log(data.message);
   
      setMessage(data.message);

setTimeout(() => {
  setMessage("");
}, 3000);
    }
  };

  useEffect(() => {
    getProductsHandler();
  }, [page]);

  const handleClick = () => {
    navigate("/product/add");
  };

  return (
    <div className="products-page-container">

      {/* HEADER SECTION */}
      <div className="products-header">

        <h1 className="products-title">
          Products
        </h1>

        {user?.role === "admin" && (
          <button
            className="add-product-btn"
            onClick={handleClick}
          >
            Add New Product
          </button>
        )}

      </div>

      {/* ERROR / MESSAGE */}
      {message && (
  <div className="product-form-message">
    {message}
  </div>
)}

      {user && (
        <>
          {/* PRODUCTS */}
          <div className="products-grid">
            <ProductCard
              products={products}
              setProduct={setProduct}
              showActions={true}
            />
          </div>

          {/* PAGINATION */}
          <div className="products-actions-wrapper">

            <div className="pagination-container">

              <button
                className="pagination-btn"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>

              <span className="pagination-page-indicator">
                {page}
              </span>

              <button
                className="pagination-btn"
                disabled={page === totalPage}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>

            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default Products;