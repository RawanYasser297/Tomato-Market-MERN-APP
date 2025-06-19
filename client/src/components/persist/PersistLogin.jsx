import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
//import useRefreshToken from "../../hooks/useRefreshToken";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";


const PersistLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const {user,handelRefreshToken,setUser}=useContext(UserContext)
    useEffect(()=>{
        const verifyRefreshToken=async()=>{
            try {
              const getPersistValue=localStorage.getItem('persist')
              console.log(getPersistValue)
              if (getPersistValue==='true'){
                await handelRefreshToken()
              }
            } catch (e) {
                console.error(e)
            } finally {
                setIsLogin(false)
            }
        }
        

        !user?
         verifyRefreshToken():setIsLogin(false)
    },[handelRefreshToken,user,setUser])

useEffect(()=>{
console.log(`is loading :${isLogin}`)
console.log(`user :${JSON.stringify(user)}`)
},[isLogin,user])


  return (
    <div>
    {
    isLogin?<p>Loading...</p>:<Outlet />
      }
    </div>
  )
}

export default PersistLogin
