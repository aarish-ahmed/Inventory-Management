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

  const handleWarehouseChange = (index, e) => {
    const { name, value } = e.target;

    const updatedWarehouses = [...(formData.warehouses || [])];

    updatedWarehouses[index] = {
      ...updatedWarehouses[index],
      [name]: value,
    };

    setFormData({
      ...formData,
      warehouses: updatedWarehouses,
    });
  };

  const addWarehouse = () => {
    setFormData({
      ...formData,
      warehouses: [
        ...(formData.warehouses || []),
        {
          name: "",
          location: "",
          stock: 0,
        },
      ],
    });
  };

  const removeWarehouse = (index) => {
    const updatedWarehouses = formData.warehouses.filter(
      (_, warehouseIndex) => warehouseIndex !== index
    );

    setFormData({
      ...formData,
      warehouses: updatedWarehouses,
    });
  };

  const onSubmitWrapper = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await handleProductForm(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{title}</h2>

      <form className="custom-form" onSubmit={onSubmitWrapper}>

        {/* Product Name */}
        <div className="form-field">
          <label htmlFor="productname">
            Product Name
          </label>

          <input
            id="productname"
            className="form-input"
            placeholder="Enter product name"
            name="productname"
            type="text"
            onChange={handleChange}
            value={formData.productname}
            required
          />
        </div>

        {/* SKU */}
        <div className="form-field sku-field">
          <label htmlFor="sku">
            SKU
          </label>

          <input
            id="sku"
            className="form-input sku-input"
            placeholder="Enter SKU"
            name="sku"
            type="text"
            onChange={handleChange}
            value={formData.sku || ""}
            required
          />
        </div>

        {/* Category */}
        <div className="form-field">
          <label htmlFor="category">
            Category
          </label>

          <input
            id="category"
            className="form-input"
            placeholder="Enter category"
            name="category"
            type="text"
            onChange={handleChange}
            value={formData.category}
            required
          />
        </div>

        {/* Price */}
        <div className="form-field">
          <label htmlFor="price">
            Selling Price
          </label>

          <input
            id="price"
            className="form-input"
            placeholder="Enter selling price"
            name="price"
            type="number"
            min="0"
            onChange={handleChange}
            value={formData.price}
            required
          />
        </div>

        {/* Warehouses */}
        <div className="warehouse-section">

          <h3 className="warehouse-title">
            Warehouses
          </h3>

          {(formData.warehouses || []).map(
            (warehouse, index) => (
              <div
                className="warehouse-form"
                key={index}
              >

                {/* Warehouse Name */}
                <div className="form-field">
                  <label>
                    Warehouse Name
                  </label>

                  <input
                    className="form-input"
                    placeholder="Enter warehouse name"
                    name="name"
                    type="text"
                    value={warehouse.name}
                    onChange={(e) =>
                      handleWarehouseChange(index, e)
                    }
                    required
                  />
                </div>

                {/* Location */}
                <div className="form-field">
                  <label>
                    Location
                  </label>

                  <input
                    className="form-input"
                    placeholder="Enter location"
                    name="location"
                    type="text"
                    value={warehouse.location}
                    onChange={(e) =>
                      handleWarehouseChange(index, e)
                    }
                    required
                  />
                </div>

                {/* Stock */}
                <div className="form-field">
                  <label>
                    Initial Stock
                  </label>

                  <input
                    className="form-input"
                    placeholder="Stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={warehouse.stock}
                    onChange={(e) =>
                      handleWarehouseChange(index, e)
                    }
                    required
                  />
                </div>

                <button
                  type="button"
                  className="remove-warehouse-btn"
                  onClick={() => removeWarehouse(index)}
                >
                  Remove Warehouse
                </button>

              </div>
            )
          )}

          <button
            type="button"
            className="add-warehouse-btn"
            onClick={addWarehouse}
          >
            + Add Warehouse
          </button>

        </div>

        {/* Image */}
        <div className="form-field">
          <label htmlFor="image">
            Product Image
          </label>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Product preview"
              className="product-image-preview"
            />
          )}

          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        </div>

        {/* Supplier */}
        <div className="form-field">
          <label htmlFor="supplier">
            Supplier
          </label>

          <select
            id="supplier"
            className="form-input"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Supplier
            </option>

            {suppliers.map((supplier) => (
              <option
                key={supplier._id}
                value={supplier._id}
              >
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          className="form-submit-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="spinner"></span>
          ) : (
            buttonText
          )}
        </button>

      </form>
    </div>
  );
};

export default ProductForm;