import { Link } from "react-router-dom"
import { FiXCircle } from "react-icons/fi";
import './style.css'
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Alert = () => {
  const {alert,setAlert}=useContext(UserContext)
  console.log('kok')
  return (
<main className="alert">
<div  className="alert-container">
<FiXCircle className="FiXCircle" />
    You need to log in first!
  <Link to='/login' className="login-link " onClick={()=>{
          setAlert(!alert)}}>login</Link>
  <span className="home-link" onClick={()=>setAlert(!alert)}>continue without login</span>
  </div>
</main>
  )
}

export default Alert
