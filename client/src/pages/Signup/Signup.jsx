import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signupApi} from "../../api/userApi";
import "./Signup.css";

const Signup = () => {
  
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const userData={
      email,
      username,
      password
    }

    try {
      const {res,data}=await signupApi(userData)
      
      console.log(data.message);

      if (!res.ok) {
        setMessage(data.message);
      } else {
        sessionStorage.setItem("verifyEmail", data.email);
        navigate("/verify-email", {
          state: {
            email: data.email,
          },
        });
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create an Account</h2>
        <p className="auth-subtitle">
          Sign up to get started with your dashboard.
        </p>

        <form onSubmit={handleSignup} className="auth-form" autoComplete="off">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              autoComplete="off"
            />
          </div>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              type="text"
              placeholder="Enter username"
              required
              autoComplete="off"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Create a password"
              required
              autoComplete="new-password"
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner"></span> : 'Sign Up'}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>|
          <Link to="/verify-email">Verify</Link>
        </p>
        {message && <div className="auth-message error">{message}</div>}
      </div>
    </div>
  );
};

export default Signup;