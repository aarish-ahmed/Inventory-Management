import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import './Navbar.css'
const Navbar = () => {
  const {user,setUser}=useAuth()
  console.log(user)
 
 
  const navigate=useNavigate()
  const handleLogout = async(e) => {
    e.preventDefault()
    const res=await fetch('http://localhost:5000/user/logout',{
      method:'POST',
      credentials:'include',
    })
    if(res.ok){
       navigate('/login')
       setUser()
    }
  }
  return (
    <>
      <div className="nav">
        <Link to="/">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/suppliers">Suppliers</Link>
        <Link to="/transaction">Transaction</Link>
        {!user && (
          <>
          <Link to="/login">Login</Link>
    <Link to="/signup">Signup</Link>
          </>
        )}
        
       {user && (
  <button onClick={handleLogout}>Logout</button>
)}
        
        
      </div>
    </>
  );
};

export default Navbar;
