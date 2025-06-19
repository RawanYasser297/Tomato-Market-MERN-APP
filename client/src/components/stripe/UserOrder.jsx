import { UserContext } from "../../context/UserContext";
import { useContext ,useState} from "react";
import useAxiosPrivet from "../../provider/axiosProvider";
import { useEffect } from "react";
//import { ItemContext } from "../../context/ItemProvider";
import './css/userOrders.css'
import { format} from "date-fns";
const UserOrder = () => {
const {user}=useContext(UserContext)
const axios=useAxiosPrivet()
const [orders, setOrders] = useState([]);
useEffect(()=>{
      const getOrders = async () => {
            if (user) {
              const response = await axios.post("/api/v1/userOrders");
              const user=response.data.order
              user.reverse();
              console.log(user)
              if(user.length>5){
                setOrders(user.slice(0,5))
              }else{
                setOrders(user)
              }
      }
    }
        getOrders()
    },[])

  return (
    <div className="my-orders">
    {
      orders.map((order, index) => (
        <div key={index} className="my-order">
          <h4>{index + 1}</h4>
          <div>
            {
              order.cartItems.map((CI,II)=><div key={II}  className="cardItems" >
              <p>{CI['itemName']+" " + "x" +" " + CI['order']}</p> 
              <p className="PU">price par unit $ {CI.price}</p>
              <p className="OU">offer per unit $ {CI.offer}</p>
              </div>
              )
            }
          </div>
          <div className="amount">total ${order['amount']}</div>
          <span className="date">{format(new Date(order['Date']),"MM/dd/yyyy")}</span>
          </div>
      ))

    }

    </div>
  )
}

export default UserOrder
