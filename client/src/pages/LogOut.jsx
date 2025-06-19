import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";


axios.defaults.baseURL='http://localhost:5555/'
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
