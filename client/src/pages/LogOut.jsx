import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";


axios.defaults.baseURL="https://tomato-market-mern-app-server.onrender.com"
axios.defaults.withCredentials='true'

const LogOut = () => {
const {handleLogout}=useContext(UserContext)

    return (
    <button onClick={handleLogout}>
    logout
    </button>
  )
}

export default LogOut
