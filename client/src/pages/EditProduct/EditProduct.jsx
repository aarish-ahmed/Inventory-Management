import { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm/ProductForm";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../api/apiUrl";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const title = "Edit Product";
  const buttonText = "Update";

  const [message, setMessage] = useState("");
  const [suppliers, setSupplier] = useState([]);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    productname: "",
      sku: "",
    image: null,
    category: "",
    price: "",
    supplier: "",
    warehouses: [],
  });

  // ================================
  // GET SUPPLIERS
  // ================================

  useEffect(() => {
    const getSupplier = async () => {
      try {
        const res = await fetch(
          `${API_URL}/supplier/list`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok) {
          setSupplier(data);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        console.error(error);
        setMessage("Failed to load suppliers");
      }
    };

    getSupplier();
  }, []);

  // ================================
  // GET PRODUCT
  // ================================

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(
          `${API_URL}/product/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        console.log("Product response:", data);

        if (!res.ok) {
          setMessage(data.message);
          return;
        }

        /*
          Support both possible API responses:

          1. { product: {...} }

          2. [{...}]
        */

        const product = data.product || data[0];

        if (!product) {
          setMessage("Product not found");
          return;
        }

        setFormData({
          productname: product.productname || "",
          sku:product.sku || "",
          category: product.category || "",
          price: product.price || "",
          supplier: product.supplier?._id || product.supplier || "",
          image: null,

          // IMPORTANT
          // Load existing warehouses
          warehouses: product.warehouses || [],
        });

        setImagePreview(product.image || "");

      } catch (error) {
        console.error(error);
        setMessage("Failed to load product");
      }
    };

    getProduct();
  }, [id]);

  // ================================
  // UPDATE PRODUCT
  // ================================

  const handleProductForm = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();

      productData.append(
        "productname",
        formData.productname
      );

      productData.append(
        "category",
        formData.category
      );

      productData.append(
        "price",
        formData.price
      );
      productData.append("sku", formData.sku);

      productData.append(
        "supplier",
        formData.supplier
      );

      productData.append(
        "warehouses",
        JSON.stringify(formData.warehouses)
      );

      if (formData.image) {
        productData.append(
          "image",
          formData.image
        );
      }

      const res = await fetch(
        `${API_URL}/product/update/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: productData,
        }
      );

      const data = await res.json();

      console.log("Update response:", data);

      if (res.ok) {
        navigate("/products");
      } else {
        setMessage(data.message);
      }

    } catch (error) {
      console.error(error);
      setMessage("Failed to update product");
    }
  };

  return (
    <>
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        suppliers={suppliers}
        handleProductForm={handleProductForm}
        title={title}
        buttonText={buttonText}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
      />

      {message && <h4>{message}</h4>}
    </>
  );
};

export default EditProduct;