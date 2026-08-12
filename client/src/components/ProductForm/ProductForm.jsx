import { useState } from "react";
import "./ProductForm.css";

const ProductForm = ({
  formData,
  setFormData,
  suppliers,
  handleProductForm,
  title,
  buttonText,
  imagePreview,
  setImagePreview,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      image: file,
    });

    if (file && setImagePreview) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmitWrapper = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Executes your original submit handler
      await handleProductForm(e); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{title}</h2>

      <form className="custom-form" onSubmit={onSubmitWrapper}>
        <input
          className="form-input"
          placeholder="Product Name"
          name="productname"
          type="text"
          onChange={handleChange}
          value={formData.productname}
          required
        />

        <input
          className="form-input"
          placeholder="Category"
          name="category"
          type="text"
          onChange={handleChange}
          value={formData.category}
          required
        />

        <input
          className="form-input"
          placeholder="Price"
          name="price"
          type="number"
          onChange={handleChange}
          value={formData.price}
          required
        />

        <input
          className="form-input"
          placeholder="Stock"
          name="stock"
          type="number"
          onChange={handleChange}
          value={formData.stock}
          required
        />
        
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Product"
            style={{
              width: "180px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />
        )}
        
        <input 
          type="file" 
          name="image" 
          onChange={handleImageChange} 
          className="file-input"
           
        />

        <select
          className="form-input"
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          required
        >
          <option value="">Select Supplier</option>

          {suppliers.map((supplier) => {
            return (
              <option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </option>
            );
          })}
        </select>

        <button className="form-submit-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <span className="spinner"></span> : buttonText}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;