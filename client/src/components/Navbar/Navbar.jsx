import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../api/apiUrl";
import { 
  MdSpaceDashboard, 
  MdOutlineInventory2, 
  MdOutlineLocalShipping, 
  MdOutlineReceipt, 
  MdOutlineSettings, 
  MdLogin, 
  MdAppRegistration, 
  MdLogout,
  MdOutlineShoppingCart 
} from "react-icons/md";
import './Navbar.css';

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/user/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (res.ok) {
      navigate('/login');
      setUser();
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo"></div>
        <h2>Base<span>Inventory</span></h2>
      </div>
      
      <nav className="sidebar-nav">
        {user?.role === 'admin' && 
        <>
          <Link to="/" className={isActive("/")}>
            <MdSpaceDashboard className="nav-icon" /> Dashboard
          </Link>
        </>
        }

        <Link to="/products" className={isActive("/products")}>
          <MdOutlineInventory2 className="nav-icon" /> Products
        </Link>

        <Link to="/suppliers" className={isActive("/suppliers")}>
          <MdOutlineLocalShipping className="nav-icon" /> Suppliers
        </Link>

        <Link to="/purchase" className={isActive("/purchase")}>
          <MdOutlineShoppingCart className="nav-icon" /> Purchase
        </Link>

        <Link to="/transaction" className={isActive("/transaction")}>
          <MdOutlineReceipt className="nav-icon" /> Transaction
        </Link>
        
        {user?.role === 'admin' && (
          <Link to="/settings" className={isActive("/settings")}>
            <MdOutlineSettings className="nav-icon" /> Settings
          </Link>
        )}

        {!user && (
          <>
            <Link to="/login" className={isActive("/login")}>
              <MdLogin className="nav-icon" /> Login
            </Link>

            <Link to="/signup" className={isActive("/signup")}>
              <MdAppRegistration className="nav-icon" /> Signup
            </Link>
          </>
        )}
      </nav>
      
      {user && (
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <MdLogout className="nav-icon" /> Logout
          </button>
        </div>
      )}
    </aside>
  );
};

export default Navbar;