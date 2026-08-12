import { useState, useEffect } from 'react'
import { dashboardApi } from '../../api/userApi'
import { useAuth } from '../../context/authContext'
import './Dashboard.css' // Ensure this matches your CSS file name

const Dashboard = () => {
  const [message,setMessage]=useState()
  const [analytics, setAnalytics] = useState([])
  
  const {user}=useAuth()
  const getAnalytics = async() => {
    const {res,data}=await dashboardApi()
    if(res.ok){
      setAnalytics(data)
      console.log(data)
    }
    else{
      console.log(data.message)
      setMessage(data.message)
    }
  }
  
  useEffect(()=>{
    getAnalytics()
    console.log('get analytics called')
  },[])

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
      {user && (
        <>
        <h2>Welcome {user.username}</h2>
        </>
      )

      }
        <h2>Dashboard Overview</h2>
       
      </header>
      {message}
      <main className="dashboard-content">
        {analytics.map((analytic, index) => (
          <div className="analytics-grid" key={index}>
            
            <div className="stat-card">
              <span className="stat-label">Total Products</span>
              <h3 className="stat-value">{analytic.totalProducts}</h3>
            </div>
            
            <div className="stat-card">
              <span className="stat-label">Total Suppliers</span>
              <h3 className="stat-value">{analytic.totalSuppliers}</h3>
            </div>
            
            <div className="stat-card">
              <span className="stat-label">Total Transactions</span>
              <h3 className="stat-value">{analytic.totalTransactions}</h3>
            </div>
            
            <div className="stat-card highlight-success">
              <span className="stat-label">Total Revenue</span>
              <h3 className="stat-value">৳{analytic.totalRevenue}</h3>
            </div>
            
            <div className="stat-card highlight-danger">
              <span className="stat-label">Low Stock Alerts</span>
              <h3 className="stat-value">{analytic.lowStockProduct}</h3>
            </div>

          </div>
        ))}
      </main>
      
    </div>
  )
}

export default Dashboard