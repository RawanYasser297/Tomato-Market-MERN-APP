import {useSearchParams,useNavigate} from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { axiosPrivet } from '../../api/axios';

export const VerifyOrder = () => {
const [searchParams,setSearchParams]=useSearchParams()
const navigate=useNavigate()
const success=searchParams.get('success')
const userEmail=searchParams.get('userEmail')
const {user}=useContext(UserContext)
console.log(success,userEmail)
console.log(user)

useEffect(()=>{
    const verify=async ()=>{
        const response=await axiosPrivet.patch('api/v1/verifyOrder',{success,userEmail})
        console.log(response.data)
        if(response.data.success){
            navigate('/userOrders')
        }else{
            navigate('/')
        }
    }

if(user){
    verify()
}
},[])

    return (
    <div>VerifyOrder</div>
    )

}
