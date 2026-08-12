import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { loginApi } from "../../api/userApi"
import './Login.css'
import { useAuth } from "../../context/authContext"

const Login = () => {
  const [message, setMessage] = useState()
  const {user,setUser}=useAuth()
  const navigate = useNavigate()
  
  const handleLogin = async(e) => {
    e.preventDefault()
     
    const userData={
      email: e.target.email.value,
     password :e.target.password.value
    }
    const {res,data}=await loginApi(userData)
    
    console.log(data.message)
    
    if(!res.ok){
      setMessage(data.message)
    }
    if(res.ok){
      navigate('/')
      setUser(data.user)
    }
  }
  
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Login</h2>
        <p className="auth-subtitle">Welcome back! Please enter your details.</p>
        
        {/* Added autoComplete="off" here */}
        <form onSubmit={handleLogin} className="auth-form" autoComplete="off">
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
            <label htmlFor="password">Password</label>
            <input 
              name="password" 
              id="password" 
              type="password" 
              placeholder="Enter password" 
              required 
              autoComplete="new-password"
            />
          </div>
          
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p>
  Don't have an account?{" "}
  <Link to="/signup">Sign Up</Link>{" "}
  <Link to='/send-otp'>Forget Password?</Link>
</p>
        {message && <div className="auth-message error">{message}</div>}
      </div>
    </div>
  )
}

export default Login