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
  const [totalPage, setTotalPage] = useState();
  const [message, setMessage] = useState();
  const [products, setProduct] = useState([]);

  const getProductsHandler = async () => {
    const { res, data } = await getProductsApi(page);

    if (res.ok) {
      setProduct(data.products);
      setTotalPage(data.totalPages);
    } else {
      console.log(data.message);
      setMessage(data.message);
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

      <h1 className="products-title">
        Products
      </h1>

      {user && (
        <>
          {/* Products */}
          <div className="products-grid">
            <ProductCard
              products={products}
              setProduct={setProduct}
              showActions={true}
            />
          </div>

          {/* Bottom Actions */}
          <div className="products-actions-wrapper">

            <button
              className="add-product-btn"
              onClick={handleClick}
            >
              Add New Product
            </button>

            {/* Pagination */}
            <div className="pagination-container">

              <button
                className="pagination-btn"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>

              <button
                className="pagination-page-indicator"
                disabled
              >
                {page}
              </button>

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

      {message && (
        <p className="products-error-message">
          {message}
        </p>
      )}

    </div>
  );
};

export default Products;