import {useEffect, useState} from "react"
import { jwtDecode } from "jwt-decode";
import { createContext } from "react";
import axios from "axios";
//import{useNavigate} from 'react-router-dom'
//import User from "../../../server/model/User";

axios.defaults.baseURL='http://localhost:5555/'
axios.defaults.withCredentials='true'
export const UserContext =createContext()

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [info, setInfo] = useState(null)
    const [persist, setPersist] = useState(false);
    const [alert, setAlert] = useState("false");
    
    

    const handelRefreshToken=async()=>{
        try{
        const response=await axios.get('api/v1/refresh')
        console.log(response.data.accessToken)
        
        setUser(response.data)

        // setUser ((prev) => ({
        //     ...prev,
        //     accessToken:accessToken,
        // }));
        console.log(response)
       return response.data.accessToken
        }catch(error){
            console.log(error)
        }
    }


    const handleLogout= async()=>{
        try{
        await axios.delete('api/v1/logout')
        setInfo(null)
        setUser(null)
        location.reload();
        }catch(err){
            console.error(err)
        }
            }

            useEffect(()=>{
                if(user){
                    const decoded = jwtDecode(user.accessToken);
                    setInfo(decoded.email);
                }
        
            },[user])


    const value={
        setUser,
        user,
        info,
        setInfo,
        setAlert,
        alert,
        handelRefreshToken,
        handleLogout,
        persist,
        setPersist
    }

   
  return (
    <UserContext.Provider value={value} >
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider


