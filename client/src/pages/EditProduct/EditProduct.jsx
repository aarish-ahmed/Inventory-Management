import { useEffect } from "react";
import { useState } from "react";
import ProductForm from "../../components/ProductForm/ProductForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const title = "Edit Product";
  const buttonText = "Update";
  const [message, setMessage] = useState();
  const [suppliers, setSupplier] = useState([]);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    productname: "",
    image: null,
    category: "",
    price: "",
    stock: "",
    supplier: "",
  });
  
  useEffect(() => {
    const getSupplier = async () => {
      const res = await fetch("http://localhost:5000/supplier/list", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setSupplier(data);
    };
    getSupplier();
  }, []);
  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`http://localhost:5000/product/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setFormData({
  productname: data[0].productname,
  category: data[0].category,
  price: data[0].price,
  stock: data[0].stock,
  supplier: data[0].supplier._id,
  image: null,
});

setImagePreview(data[0].image);
      console.log("data", data);
      console.log("formdata", formData);
    };
    getProduct();
  }, []);
  const handleProductForm = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append("productname", formData.productname);
    productData.append("category", formData.category);
    productData.append("price", formData.price);
    productData.append("stock", formData.stock);
    productData.append("supplier", formData.supplier);
    if (formData.image) {
      productData.append("image", formData.image);
    }
    const res = await fetch(`http://localhost:5000/product/update/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: productData,
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      navigate("/products");
    } else {
      setMessage(data.message);
      e.target.reset;
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
      <h4>{message}</h4>
    </>
  );
};

export default EditProduct;
