import { useEffect, useState } from "react";
import {
  getProductsApi,
  purchaseProductApi,
} from "../../api/productApi";

const Purchase = () => {
  // ================================
  // PRODUCTS
  // ================================

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);

  // ================================
  // SUPPLIERS
  // ================================

  const [suppliers, setSuppliers] = useState([]);

  // ================================
  // PURCHASE FORM
  // ================================

  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  const [purchasing, setPurchasing] = useState(false);
  const [message, setMessage] = useState("");

  // ================================
  // GET ALL PRODUCTS
  // ================================

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoadingProducts(true);

        let allProducts = [];
        let currentPage = 1;
        let totalPages = 1;

        do {
          const { res, data } = await getProductsApi(currentPage);

          if (!res.ok) {
            console.log(data.message);
            break;
          }

          allProducts = [
            ...allProducts,
            ...(data.products || []),
          ];

          totalPages = data.totalPages || 1;
          currentPage++;

        } while (currentPage <= totalPages);

        setProducts(allProducts);
        setFilteredProducts(allProducts);

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    getAllProducts();
  }, []);

  // ================================
  // GET SUPPLIERS
  // ================================

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/supplier/list",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok) {
          setSuppliers(data);
        } else {
          console.log(data.message);
        }

      } catch (error) {
        console.error(
          "Error fetching suppliers:",
          error
        );
      }
    };

    getSuppliers();
  }, []);

  // ================================
  // SEARCH PRODUCTS
  // ================================

  useEffect(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) => {
      const productName =
        product.productname?.toLowerCase() || "";

      const sku =
        product.sku?.toLowerCase() || "";

      return (
        productName.includes(searchValue) ||
        sku.includes(searchValue)
      );
    });

    setFilteredProducts(filtered);

  }, [search, products]);

  // ================================
  // SELECT PRODUCT
  // ================================

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);

    setSelectedSupplier("");
    setSelectedWarehouse("");
    setQuantity("");
    setUnitPrice("");
    setMessage("");
  };

  // ================================
  // CHANGE PRODUCT
  // ================================

  const handleChangeProduct = () => {
    setSelectedProduct(null);

    setSelectedSupplier("");
    setSelectedWarehouse("");
    setQuantity("");
    setUnitPrice("");
    setMessage("");
    setSearch("");
  };

  // ================================
  // TOTAL STOCK
  // ================================

  const getTotalStock = (product) => {
    return (
      product.warehouses?.reduce(
        (total, warehouse) =>
          total + Number(warehouse.stock || 0),
        0
      ) || 0
    );
  };

  // ================================
  // PURCHASE
  // ================================

  const handlePurchase = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      return;
    }

    setPurchasing(true);
    setMessage("");

    try {
      const { res, data } =
        await purchaseProductApi(
          selectedProduct._id,
          quantity,
          selectedWarehouse,
          selectedSupplier,
          unitPrice
        );

      if (res.ok) {
        setMessage(data.message);

        setSelectedSupplier("");
        setSelectedWarehouse("");
        setQuantity("");
        setUnitPrice("");

        // Refresh products so stock is updated
        let allProducts = [];
        let currentPage = 1;
        let totalPages = 1;

        do {
          const result =
            await getProductsApi(currentPage);

          if (!result.res.ok) break;

          allProducts = [
            ...allProducts,
            ...(result.data.products || []),
          ];

          totalPages =
            result.data.totalPages || 1;

          currentPage++;

        } while (currentPage <= totalPages);

        setProducts(allProducts);

        const updatedProduct =
          allProducts.find(
            (product) =>
              product._id === selectedProduct._id
          );

        if (updatedProduct) {
          setSelectedProduct(updatedProduct);
        }

        setTimeout(() => {
          setMessage("");
        }, 3000);

      } else {
        setMessage(data.message);
      }

    } catch (error) {
      console.error("Purchase error:", error);

      setMessage(
        "Something went wrong while purchasing."
      );

    } finally {
      setPurchasing(false);
    }
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f4f7f6] px-5 py-8">

      <div className="mx-auto w-full max-w-6xl">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-7">

          <h1 className="text-2xl font-semibold text-gray-800">
            Purchase
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Select a product to purchase stock
          </p>

        </div>

        {/* =====================================================
            PRODUCT SELECTION
        ===================================================== */}

        {!selectedProduct && (
          <>

            {/* SEARCH */}

            <div className="mb-6">

              <label
                htmlFor="product-search"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Search Product
              </label>

              <input
                id="product-search"
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by product name or SKU..."
                className="
                  h-11
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-4
                  text-sm
                  text-gray-800
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-green-500
                  focus:ring-2
                  focus:ring-green-100
                "
              />

            </div>

            {/* PRODUCTS HEADER */}

            {!loadingProducts && (
              <div className="mb-4 flex items-center justify-between">

                <h2 className="text-lg font-semibold text-gray-800">
                  Products
                </h2>

                <span className="text-xs text-gray-500">
                  {filteredProducts.length} product
                  {filteredProducts.length !== 1
                    ? "s"
                    : ""}
                </span>

              </div>
            )}

            {/* LOADING */}

            {loadingProducts && (
              <div className="rounded-lg border border-gray-200 bg-white py-12 text-center text-sm text-gray-500">
                Loading products...
              </div>
            )}

            {/* EMPTY */}

            {!loadingProducts &&
              filteredProducts.length === 0 && (
                <div className="rounded-lg border border-gray-200 bg-white py-12 text-center">

                  <p className="text-sm text-gray-500">
                    {search
                      ? "No products found."
                      : "No products available."}
                  </p>

                </div>
              )}

            {/* =================================================
                PRODUCT GRID
            ================================================= */}

            {!loadingProducts &&
              filteredProducts.length > 0 && (

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-4
                    sm:grid-cols-2
                    md:grid-cols-2
                    lg:grid-cols-4
                    xl:grid-cols-4
                  "
                >

                  {filteredProducts.map(
                    (product) => (

                      <div
                        key={product._id}
                        className="
                          overflow-hidden
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          shadow-sm
                          transition
                          duration-200
                          hover:-translate-y-0.5
                          hover:border-gray-300
                          hover:shadow-md
                        "
                      >

                        {/* IMAGE */}

                        <div className="h-28 w-full overflow-hidden bg-gray-100">

                          {product.image ? (

                            <img
                              src={product.image}
                              alt={product.productname}
                              className="
                                h-full
                                w-full
                                object-contain
                              "
                            />

                          ) : (

                            <div className="
                              flex
                              h-full
                              w-full
                              items-center
                              justify-center
                              text-xs
                              text-gray-400
                            ">
                              No Image
                            </div>

                          )}

                        </div>

                        {/* DETAILS */}

                        <div className="p-3">

                          {/* NAME */}

                          <h3
                            className="
                              truncate
                              text-sm
                              font-semibold
                              text-gray-800
                            "
                            title={product.productname}
                          >
                            {product.productname}
                          </h3>

                          {/* SKU + CATEGORY */}

                          <div className="mt-2 flex-col items-center gap-3">

                            {/* SKU */}

                            <div className="min-w-0 flex gap-3">

                              <div className="text-[16px]   tracking-wide text-gray-600">
                                SKU :
                              </div>

                              <div
                                className="
                                  truncate
                                 text-[16px]
                                  text-gray-800
                                "
                                title={product.sku}
                              >
                                {product.sku || "N/A"}
                              </div>

                            </div>

                            {/* CATEGORY */}

                            <div className="min-w-0 flex gap-3">

                              <span className="text-[16px]   tracking-wide text-gray-600">
                                Category :
                              </span>

                              <p
                                className="
                                  truncate
                                  text-[16px]
                                  text-gray-800
                                "
                                title={product.category}
                              >
                                {product.category || "N/A"}
                              </p>

                            </div>

                          </div>

                          {/* STOCK */}

                          <div className="
                            mt-2
                            flex
                            items-center
                            gap-4
                          ">

                            <span className="
                               text-[16px]
                              text-gray-800
                            ">
                              Stock
                            </span>

                            <span className="
                              text-[16px]
                              font-semibold
                              text-gray-800
                            ">
                              {getTotalStock(product)}
                            </span>

                          </div>

                          {/* SELECT BUTTON */}

                          <button
                            type="button"
                            onClick={() =>
                              handleSelectProduct(
                                product
                              )
                            }
                            className="
                              mt-3
                              h-8
                              w-full
                              rounded-md
                              bg-green-500
                              text-xs
                              font-semibold
                              text-white
                              transition
                              hover:bg-green-600
                              active:scale-[0.98]
                            "
                          >
                            Select
                          </button>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

          </>
        )}

        {/* =====================================================
            SELECTED PRODUCT
        ===================================================== */}

        {selectedProduct && (

          <div className="space-y-5">

            {/* PRODUCT SUMMARY */}

            <div className="
              rounded-xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm
            ">

              <div className="
                mb-5
                flex
                items-center
                justify-between
              ">

                <h2 className="
                  text-lg
                  font-semibold
                  text-gray-800
                ">
                  Selected Product
                </h2>

                <button
                  type="button"
                  onClick={handleChangeProduct}
                  className="
                    rounded-md
                    border
                    border-gray-300
                    bg-white
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-gray-600
                    transition
                    hover:bg-gray-50
                  "
                >
                  Change Product
                </button>

              </div>

              <div className="flex items-center gap-4">

                {/* IMAGE */}

                <div className="
                  h-24
                  w-24
                  flex-shrink-0
                  overflow-hidden
                  rounded-lg
                  bg-gray-100
                ">

                  {selectedProduct.image ? (

                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.productname}
                      className="
                        h-full
                        w-full
                        object-contain
                      "
                    />

                  ) : (

                    <div className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      text-xs
                      text-gray-400
                    ">
                      No Image
                    </div>

                  )}

                </div>

                {/* DETAILS */}

                <div className="min-w-0">

                  <h3 className="
                    truncate
                    text-xl
                    font-semibold
                    text-gray-800
                  ">
                    {selectedProduct.productname}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    SKU:
                    <span className="ml-1 font-medium text-gray-700">
                      {selectedProduct.sku || "N/A"}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Category:
                    <span className="ml-1 text-gray-700">
                      {selectedProduct.category ||
                        "N/A"}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500">
                    Current Stock:
                    <span className="ml-1 font-semibold text-gray-800">
                      {getTotalStock(
                        selectedProduct
                      )}
                    </span>
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                WAREHOUSES
            ================================================= */}

            <div className="
              rounded-xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm
            ">

              <h2 className="
                mb-4
                text-lg
                font-semibold
                text-gray-800
              ">
                Warehouse Stock
              </h2>

              <div className="
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-2
                lg:grid-cols-3
              ">

                {selectedProduct.warehouses?.map(
                  (warehouse) => (

                    <div
                      key={warehouse._id}
                      className="
                        rounded-lg
                        border
                        border-gray-200
                        bg-gray-50
                        p-3
                      "
                    >

                      <div className="
                        flex
                        items-center
                        justify-between
                      ">

                        <h3 className="
                          text-sm
                          font-semibold
                          text-gray-800
                        ">
                          {warehouse.name}
                        </h3>

                        <span className="
                          text-sm
                          font-bold
                          text-gray-800
                        ">
                          {warehouse.stock}
                        </span>

                      </div>

                      <p className="
                        mt-1
                        text-xs
                        text-gray-500
                      ">
                        {warehouse.location}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* =================================================
                PURCHASE FORM
            ================================================= */}

            <div className="
              rounded-xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm
            ">

              <h2 className="
                mb-5
                text-lg
                font-semibold
                text-gray-800
              ">
                Purchase Stock
              </h2>

              <form
                onSubmit={handlePurchase}
                className="
                  grid
                  grid-cols-1
                  gap-4
                  md:grid-cols-2
                "
              >

                {/* SUPPLIER */}

                <div>

                  <label className="
                    mb-1.5
                    block
                    text-xs
                    font-semibold
                    text-gray-700
                  ">
                    Supplier
                  </label>

                  <select
                    value={selectedSupplier}
                    onChange={(e) =>
                      setSelectedSupplier(
                        e.target.value
                      )
                    }
                    required
                    className="
                      h-10
                      w-full
                      rounded-md
                      border
                      border-gray-300
                      bg-white
                      px-3
                      text-sm
                      outline-none
                      focus:border-green-500
                      focus:ring-2
                      focus:ring-green-100
                    "
                  >

                    <option value="">
                      Select Supplier
                    </option>

                    {suppliers.map(
                      (supplier) => (

                        <option
                          key={supplier._id}
                          value={supplier._id}
                        >
                          {supplier.name}
                        </option>

                      )
                    )}

                  </select>

                </div>

                {/* WAREHOUSE */}

                <div>

                  <label className="
                    mb-1.5
                    block
                    text-xs
                    font-semibold
                    text-gray-700
                  ">
                    Warehouse
                  </label>

                  <select
                    value={selectedWarehouse}
                    onChange={(e) =>
                      setSelectedWarehouse(
                        e.target.value
                      )
                    }
                    required
                    className="
                      h-10
                      w-full
                      rounded-md
                      border
                      border-gray-300
                      bg-white
                      px-3
                      text-sm
                      outline-none
                      focus:border-green-500
                      focus:ring-2
                      focus:ring-green-100
                    "
                  >

                    <option value="">
                      Select Warehouse
                    </option>

                    {selectedProduct.warehouses?.map(
                      (warehouse) => (

                        <option
                          key={warehouse._id}
                          value={warehouse.name}
                        >
                          {warehouse.name} — Stock:{" "}
                          {warehouse.stock}
                        </option>

                      )
                    )}

                  </select>

                </div>

                {/* QUANTITY */}

                <div>

                  <label className="
                    mb-1.5
                    block
                    text-xs
                    font-semibold
                    text-gray-700
                  ">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(e.target.value)
                    }
                    placeholder="Enter quantity"
                    required
                    className="
                      h-10
                      w-full
                      rounded-md
                      border
                      border-gray-300
                      px-3
                      text-sm
                      outline-none
                      focus:border-green-500
                      focus:ring-2
                      focus:ring-green-100
                    "
                  />

                </div>

                {/* PURCHASE PRICE */}

                <div>

                  <label className="
                    mb-1.5
                    block
                    text-xs
                    font-semibold
                    text-gray-700
                  ">
                    Purchase Price / Unit
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={unitPrice}
                    onChange={(e) =>
                      setUnitPrice(e.target.value)
                    }
                    placeholder="Enter purchase price"
                    required
                    className="
                      h-10
                      w-full
                      rounded-md
                      border
                      border-gray-300
                      px-3
                      text-sm
                      outline-none
                      focus:border-green-500
                      focus:ring-2
                      focus:ring-green-100
                    "
                  />

                </div>

                {/* TOTAL */}

                {quantity && unitPrice && (

                  <div className="
                    rounded-lg
                    border
                    border-gray-200
                    bg-gray-50
                    p-3
                    md:col-span-2
                  ">

                    <p className="
                      text-xs
                      text-gray-500
                    ">
                      Total Purchase Cost
                    </p>

                    <p className="
                      mt-1
                      text-xl
                      font-bold
                      text-gray-800
                    ">
                      ৳
                      {(
                        Number(quantity) *
                        Number(unitPrice)
                      ).toLocaleString()}
                    </p>

                  </div>

                )}

                {/* ACTIONS */}

                <div className="
                  flex
                  gap-2
                  md:col-span-2
                ">

                  <button
                    type="submit"
                    disabled={purchasing}
                    className="
                      rounded-md
                      bg-green-500
                      px-5
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-green-600
                      disabled:cursor-not-allowed
                      disabled:bg-gray-400
                    "
                  >
                    {purchasing
                      ? "Processing..."
                      : "Confirm Purchase"}
                  </button>

                  <button
                    type="button"
                    onClick={handleChangeProduct}
                    disabled={purchasing}
                    className="
                      rounded-md
                      border
                      border-gray-300
                      bg-white
                      px-5
                      py-2.5
                      text-sm
                      font-semibold
                      text-gray-600
                      transition
                      hover:bg-gray-50
                      disabled:opacity-50
                    "
                  >
                    Change Product
                  </button>

                </div>

              </form>

              {/* MESSAGE */}

              {message && (
                <p className="
                  mt-4
                  text-sm
                  font-semibold
                  text-green-600
                ">
                  {message}
                </p>
              )}

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default Purchase;