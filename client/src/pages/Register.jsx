import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import './css/login.css'
import { VscWarning } from "react-icons/vsc";


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailsError, setEmailsError] = useState(null);
    const [passwordError,setPasswordError] = useState(null);
    const [nameError,setNameError] = useState(null);
    const [confirmError,setConfirmError] = useState(null);

    const handelSubmit= async(ev)=>{
        ev.preventDefault();
        console.log('register')
        try{
        const res=await axios.post('api/v1/users/sign',{username,email,password,confirmPassword})
        console.log(res.data)
        }catch(err){
            if(err.response.data['type']==='name'){
                setNameError(err.response.data.msg)
            }
                if(err.response.data['type']==='email'){
                    setEmailsError(err.response.data.msg)
                }
                    if(err.response.data['type']==='Password'){
                        setPasswordError(err.response.data.msg)
                    }
                        if(err.response.data['type']==='confirmPassword'){
                            setConfirmError(err.response.data.msg)
                        }
                
            
            

    }
}
      return (
        <div className='body-auth'>
        <div className='container-auth'>
        <h2>Register</h2>
        <form className='authentication' onSubmit={handelSubmit}>
                    
                    <div className='inputs'>
                    <label>Name</label>
                    <input type={nameError?'error-input':'text'} placeholder="User Name" onChange={(e)=>{
                        setEmailsError(null)
                        setNameError(null)
                        setPasswordError(null)
                        setConfirmError(null)
                        setUsername(e.target.value)}} />
                    {
                        nameError?<div className='error-compo'>
                        <VscWarning size={20} color="red"/>
                        <p style={{color:'red'}}>{nameError}</p>
                        </div>:""
                    }
                    <label>E_Mail</label>
                    <input type={emailsError?'error-input':'text'} placeholder="Email" onChange={(e)=>{
                       setEmailsError(null)
                       setNameError(null)
                       setPasswordError(null)
                       setConfirmError(null)
                        setEmail(e.target.value)}} />   
                {
                        emailsError?<div className='error-compo'>
                        <VscWarning size={20} color="red"/>
                        <p style={{color:'red'}}>{emailsError}</p>
                        </div>:""
                    }
                    <label>Password</label>
                    <input type={passwordError?'error-input':'text'}  placeholder="Password" onChange={(e)=>{
                        setEmailsError(null)
                        setNameError(null)
                        setPasswordError(null)
                        setConfirmError(null)
                        setPassword(e.target.value)}} />
                    {
                    passwordError?<div className='error-compo'>
                    <VscWarning size={20} color="red"/>
                    <p style={{color:'red'}}>{passwordError}</p>
                    </div>:""
                    }
                    <label>Confirm Password</label>
                    <input type={confirmError?'error-input':'text'}  placeholder="Confirm Password" onChange={(e)=>{
                        setEmailsError(null)
                        setNameError(null)
                        setPasswordError(null)
                        setConfirmError(null)
                        setConfirmPassword(e.target.value)}} 
                         />
                         {
                        confirmError?<div className='error-compo'>
                        <VscWarning size={20} color="red"/>
                        <p style={{color:'red'}}>{confirmError}</p>
                        </div>:""
                    }
                    
                    <div className='checkbox'>
                    <input type='checkbox' />
                    <p>deal with your privacy and security terms</p>
                    </div>
                    </div>
    
                    <button className='button'>SignUp</button>
                    <div className='last-line'>
                    <p>already have an account</p>
                    <Link to='/login'>Login</Link>
                    </div>
                    </form>
                    </div>
                    </div>
                
    )
}

export default Register
