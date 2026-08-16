import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import { verifyEmailApi } from "../../api/userApi";
import "./VerifyEmail.css";

const VerifyEmail = () => {
 
  const navigate = useNavigate();
  const email = location.state?.email || sessionStorage.getItem("verifyEmail");
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try {
      const otp = e.target.otp.value;
      const userData = {
        email,
        otp
      };
      
      const { res, data } = await verifyEmailApi(userData);
      
      if (res.ok) {
        navigate('/login');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="otp-page-container">
      <div className="otp-card">
        <h2 className="otp-title">Verify Email</h2>
        <p className="otp-subtitle">Please check your spam folder if you don't see any message in one minute.</p>
        
        <form onSubmit={handleVerifyEmailSubmit} className="otp-form">
          <div className="input-group">
            <input 
              type="email" 
              value={email} 
               readOnly
              className="otp-input read-only-input"
            />
          </div>
          
          <div className="input-group">
            <input 
              name="otp" 
              placeholder="Enter your OTP" 
              required
              className="otp-input"
            />
          </div>
          
          <button type="submit" className="otp-button" disabled={isLoading}>
            {isLoading ? <span className="spinner"></span> : "Submit"}
          </button>
        </form>
        
        {message && <p className="otp-error-message">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyEmail;