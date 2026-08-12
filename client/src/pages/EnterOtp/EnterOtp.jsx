import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { enterOtpApi } from "../../api/userApi";
import "./EnterOtp.css"; // Ensure this matches your CSS file name

const EnterOtp = () => {
  
  const navigate = useNavigate();
  const email = location.state?.email || sessionStorage.getItem("verifyEmail");
  
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnterOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(""); // Clear previous messages
    
    try {
      const otp = e.target.otp.value;
      const userData = {
        email,
        otp,
      };
      
      const { res, data } = await enterOtpApi(userData);
      
      if (res.ok) {
        sessionStorage.setItem("verifyEmail", data.email);
        navigate("/reset-password", {
          state: {
            email: data.email,
          },
        });
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
        <h2 className="otp-title">Enter OTP</h2>
        <p className="otp-subtitle">Please enter the verification code sent to your email.</p>

        <form onSubmit={handleEnterOtpSubmit} className="otp-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              value={email || ""} 
              readOnly 
              className="otp-input read-only-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="otp">OTP</label>
            <input 
              id="otp" 
              name="otp" 
              placeholder="Enter your OTP" 
              required
              className="otp-input"
            />
          </div>

          <button type="submit" className="otp-button" disabled={isLoading}>
            {isLoading ? <span className="spinner"></span> : "Verify OTP"}
          </button>
        </form>
        
        {message && <p className="otp-error-message">{message}</p>}
      </div>
    </div>
  );
};

export default EnterOtp;