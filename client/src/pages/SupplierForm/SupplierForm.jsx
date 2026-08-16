import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSupplier } from "../../api/supplierApi";
import "./SupplierForm.css";

const SupplierForm = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSupplierForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const supplierData = {
        name: e.target.name.value,
        address: e.target.address.value,
        contact: {
          phone: e.target.phone.value,
          email: e.target.email.value,
        },
      };

      const { ok, data } = await createSupplier(supplierData);

      if (ok) {
        navigate("/suppliers");
      } else {
        setMessage(data.message);
        e.target.reset();
      }
    } catch (error) {
      setMessage("An error occurred while adding the supplier.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-page-container">
      <div className="form-container">

        <h2 className="form-title">
          Add Supplier
        </h2>

        <form
          className="custom-form"
          onSubmit={handleSupplierForm}
        >

          {/* Supplier Name */}
          <div className="form-field">
            <label htmlFor="name">
              Supplier Name
            </label>

            <input
              id="name"
              className="form-input"
              placeholder="Enter supplier name"
              name="name"
              type="text"
              required
            />
          </div>

          {/* Address */}
          <div className="form-field">
            <label htmlFor="address">
              Address
            </label>

            <input
              id="address"
              className="form-input"
              placeholder="Division, District, Upazila, Road/Street"
              name="address"
              type="text"
              required
            />
          </div>

          {/* Phone */}
          <div className="form-field">
            <label htmlFor="phone">
              Phone
            </label>

            <input
              id="phone"
              className="form-input"
              placeholder="Enter phone number"
              name="phone"
              type="text"
              required
            />
          </div>

          {/* Email */}
          <div className="form-field">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              className="form-input"
              placeholder="Enter email address"
              name="email"
              type="email"
            />
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
              "Add Supplier"
            )}
          </button>

        </form>

        {message && (
          <p className="error-message">
            {message}
          </p>
        )}

      </div>
    </div>
  );
};

export default SupplierForm;