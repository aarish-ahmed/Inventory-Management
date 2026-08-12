import { useEffect } from "react";
import { useState } from "react";
import ProductForm from "../../components/ProductForm/ProductForm";
import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
  const navigate = useNavigate();
  const title = "Add Product";
  const buttonText = "Add";

  const [message, setMessage] = useState();
  const [suppliers, setSupplier] = useState([]);
  const [formData, setFormData] = useState({
    productname: "",
    image: null,
    category: "",
    price: "",
    stock: "",
    supplier: "",
  });
  
  const handleProductForm = async (e) => {
    e.preventDefault();

    const productData = new FormData();

    productData.append("productname", formData.productname);
    productData.append("category", formData.category);
    productData.append("price", formData.price);
    productData.append("stock", formData.stock);
    productData.append("supplier", formData.supplier);
    productData.append("image", formData.image);

    const res = await fetch("http://localhost:5000/product/add", {
      method: "POST",
      credentials: "include",
      body: productData,
    });

    const data = await res.json();
    if (res.ok) {
      console.log(data)
      console.log(data.image)
      navigate("/products");
    } else {
      console.log(data);
      setMessage(data.message);
      e.target.reset;
    }
  };
  useEffect(() => {
    const getSupplier = async () => {
      const res = await fetch("http://localhost:5000/supplier/list", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setSupplier(data);
      } else {
        console.log(data.message);
      }
    };
    getSupplier();
  }, []);

  return (
    <>
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        suppliers={suppliers}
        handleProductForm={handleProductForm}
        title={title}
        buttonText={buttonText}
      />
      <h4>{message}</h4>
    </>
  );
};

export default CreateProduct;
