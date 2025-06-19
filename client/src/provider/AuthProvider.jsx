
import { useContext } from 'react';
import {useLocation , Navigate , Outlet} from 'react-router-dom'
import { UserContext } from '../context/UserContext';


const   AuthProvider= () => {

    const {user}=useContext(UserContext)
    const location =useLocation()
    //How to get roles from accessToken BayLoad instead of save it on useAuth


if(!user){
  return <Navigate to="/login" state={{from:location}} replace />
}


  return <Outlet />;



}


export   default  AuthProvider