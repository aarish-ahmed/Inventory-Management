import { getCurrentUserApi } from "../api/userApi"
import { createContext,useContext,useState,useEffect } from "react"
 

const AuthContext=createContext()
const AuthProvider = ({children}) => {
  console.log('authProvider called')
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const loadUser = async() => {
        try {
        const {data} = await getCurrentUserApi();
        setUser(data);
        console.log('loaduser data',data)
      } catch (error) {
       console.log(error)
      } finally {
        setLoading(false);
      }
    }

    useEffect(()=>{
      console.log('useEffect called')
    loadUser()
    
    },[])
  return (
    <>
    <AuthContext.Provider
    value={{
        user,
        setUser,
        loading,
        isAuthenticated:!!user,
    }}
    >
        {children}
    </AuthContext.Provider>
    </>
  )
}

export default AuthProvider

export const useAuth=()=>useContext(AuthContext)