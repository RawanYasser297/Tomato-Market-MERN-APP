import { Link ,useNavigate } from 'react-router-dom';
import axios from '../api/axios'
import './css/login.css'
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { VscWarning } from "react-icons/vsc";
import { useEffect } from 'react';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailsError, setEmailsError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const navigate = useNavigate();
    const {setUser,user,setPersist,persist}=useContext(UserContext)
    
    const handelSubmit= async(ev)=>{
        ev.preventDefault();
        try{
        const res=await axios.post('api/v1/users/login',{email,password})
        setUser(res.data)
        navigate("/");
        }catch(err){
            if(err.response.data['type']==='email'){
                setEmailsError(err.response.data.msg)
            }else{
                if(err.response.data['type']==='password'){
                    setPasswordError(err.response.data.msg)
                }
            }

        }

    }
    console.log(user)
    
    useEffect(() => {
        // Update localStorage whenever 'persist' changes
        localStorage.setItem("persist", persist);
      }, [persist]);
   

  return (
    <div className='body-auth'>
    <div className="container-auth">
    <h2>Login</h2>
      <form className='authentication' onSubmit={handelSubmit}>
                <div className='inputs'>
                <label>E_Mail</label>
                    <input type={emailsError?'error-input':'text'}  placeholder="Email" onChange={(e)=>{
                        setEmailsError(null)
                        setPasswordError(null)
                        setEmail(e.target.value)
                        }} />
                    {
                        emailsError?<div className='error-compo'>
                        <VscWarning size={20} color="red"/>
                        <p style={{color:'red'}}>{emailsError}</p>
                        </div>:""
                    }
                    
                    <label>Password</label>
                    <input type={passwordError?'error-input':'text'}  placeholder="Password" onChange={(e)=>{
                        setEmailsError(null)
                        setPasswordError(null)
                        setPassword(e.target.value)
                        }} />
                </div>
                {
passwordError?<div className='error-compo'>
    <VscWarning size={20} color="red"/>
    <p style={{color:'red'}}>{passwordError}</p>
</div>:""
                    }
                <div className='remember-me'> 
                <input 
                type='checkBox' 
                id='persist' 
                onChange={()=>setPersist(true)}
                //checked={persist}
                />
                <label htmlFor="persist">Remember me</label>
                </div>
                <button className='button'>SignUp</button>
                <div className='last-line'>
                <p>do not have an account</p>
                <Link to='/register' className='link'>Register</Link>
                </div>
                </form>
                </div>
                </div>
)
}

export default Login
