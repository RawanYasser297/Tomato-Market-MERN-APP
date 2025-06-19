import { axiosPrivet } from "../api/axios";
//import useRefreshToken from "../hooks/useRefreshToken.js";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext.jsx";


//we gonna use it instead of usual axios
const useAxiosPrivet = () => {
    const {user,setInfo,setUser,handelRefreshToken}=useContext(UserContext)
    // const refresh = useRefreshToken()
    
// set Interceptors of axios
useEffect(() => {
    const  requestIntercept=axiosPrivet.interceptors.request.use(
        (config) => {
            console.log('after config')
            if (!config.headers.Authorization) {
                console.log('after config' + '!config.headers.Authorization' )
                const accessToken=user.accessToken 
                if(accessToken){
                config.headers.Authorization = `Bearer ${accessToken}`
                }
            }
            
            return  config;
        },
        (error) =>Promise.reject(error)
    )

    const responseIntercept = axiosPrivet.interceptors.response.use(
        (response) => {
            console.log("response", response);
            return response;
        }
         ,async (error) => {
            const originalRequest = error?.config;
            // if the error is 401, we refresh the token
            if (error?.response?.status === 403 && !originalRequest?.sent){
                console.log('new new response')
                const newAccessToken = await handelRefreshToken();
                console.log("newAccessToken" + newAccessToken)
                // Retry the original request with the new token
                const originalRequest = error.config;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return await axiosPrivet(originalRequest);
                }

        }
    )
    return()=>{
        axiosPrivet.interceptors.request.eject(requestIntercept);
        axiosPrivet.interceptors.response.eject(responseIntercept);
    }
},[user,setInfo,setUser,handelRefreshToken])

return axiosPrivet

}
export default useAxiosPrivet;
