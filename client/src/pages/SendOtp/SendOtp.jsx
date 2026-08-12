import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendOtpApi } from "../../api/userApi";
import "./SendOtp.css"; 

const SendOtp = () => {
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    const email = e.target.email.value;
    
    const { res, data } = await sendOtpApi(email);
    
    if (res.ok) {
      sessionStorage.setItem('verifyEmail', data.email);
      navigate('/enter-otp', {
        state: {
          email: data.email
        }
      });
    } else {
      setMessage(data.message);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="otp-page-container">
      <div className="otp-card">
        <h2 className="otp-title">Inventory Management</h2>
        
        <form onSubmit={handleSendOtpSubmit} className="otp-form">
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Enter your email"
              name="email"
              required
              className="otp-input"
            />
          </div>
          
          <button type="submit" className="otp-button" disabled={isLoading}>
            {isLoading ? <span className="spinner"></span> : "Send OTP"}
          </button>
        </form>
        
        {message && <p className="otp-error-message">{message}</p>}
      </div>
    </div>
  );
};

export default SendOtp;