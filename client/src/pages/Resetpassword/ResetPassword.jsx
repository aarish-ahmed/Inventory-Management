import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { resetPasswordApi } from "../../api/userApi"
const ResetPassword = () => {
    const navigate=useNavigate()
    const email=location.state?.email ||sessionStorage.getItem('verifyEmail')
    
    const [message,setMessage]=useState()
    const handleResetpassword = async(e) => {
        e.preventDefault()
        console.log(email)
        const password=e.target.password.value
        const userData={
          email,
          password,
        }
        const {res,data}=await resetPasswordApi(userData)
        if(res.ok){
          
            navigate('/login')

        }
        else{
            setMessage(data.message)
        }
    }
  return (
    <>
    <h3>Inventory Management</h3>
    <form onSubmit={handleResetpassword}>
        <input
    name='email'
    value={email}
    readOnly
    ></input>
    <input
    name='password'
    placeholder="enter new password"
    ></input>
    <button type='submit'>Confirm</button>
    </form>
    <p>{message}</p>
    </>
  )
}

export default ResetPassword