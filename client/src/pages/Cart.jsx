import { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { ItemContext } from "../context/ItemProvider";
import { IoMdCloseCircleOutline } from "react-icons/io"
import { CgBatteryEmpty } from "react-icons/cg";
import { MenuContext } from "../context/MenuProvider";
import { FiMinus ,FiPlus} from "react-icons/fi";
import './css/cartStyle.css'
import { UserContext } from "../context/UserContext";
import useAxiosPrivet from "../provider/axiosProvider";
//import useAxiosPrivet from "../provider/axiosProvider";

const Cart = () => {
const {removeElement,addNewCardItem,open, setOpen ,cardItem,handelTotalCost,totalCost,handelOrders,total,orderCost,cardTotalCost,getClear}=useContext(ItemContext)
const {items}=useContext(MenuContext)
const {user}=useContext(UserContext)
const axios =useAxiosPrivet()

useEffect(()=>{
  
const updateCartItemDate=async()=>{
  try {
    if(user){
      const response=await axios.patch('api/v1/updateCartItems',{cardItems:cardItem})
      console.log(response.data.cardItems)
    }
  } catch (error) {
    console.log(error)
  }
}
  updateCartItemDate()
},[axios,cardItem,user])


const handleAddToCart = (item) =>{
 //console.log(totalCost)
  addNewCardItem(item.title);
  console.log(user)
  console.log("orderCost" + orderCost)
  console.log("total" + total)
};


const handleDecreaseQuantity = (item) => {
  removeElement(item.title);
};


const findItem=(item)=>{
  const target=cardItem.find(((v) =>v.itemName=== item.title ))
  if(target){
    return target['order']
  }
}


  return (
    <div className="cart" >
      {!cardItem.length?<div className="empty-card" onClick={()=>setOpen(!open)}  >
        <CgBatteryEmpty  className="battery"/>
        <p>your card item is empty go back home and add your order</p>
        </div>
        :<div>
          <table>
          <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Orders</th>
                <th>Offer</th>
                <th>Counter</th>
                <th>Total</th>
                <th>Delete</th>
              </tr>
            </thead>
            
        <tbody>
        {items.filter((item)=>cardItem.some(cartItem => cartItem.itemName === item.title)).map((item,index)=>{

        return(<tr key={index} className="card-item">
      <td> <img src={`https://tomato-market-mern-app-server.onrender.com/${item.image}`} alt="" className="item-image" /></td>
      <td className="table"><p className="item-title">{item.title}</p></td>
      <td className="table"><p className="item-price" >${item.price}</p></td>
      <td className="table"><p className="item-price">{
      handelOrders(item.title)}</p></td>
      <td><p className="item-offer">${item.offer * handelOrders(item.title)}</p></td>
      <td className='counter table'>
              <div className='add-more'>
                <span onClick={()=>{handleAddToCart(item)}}>
                  <FiPlus className='plus' />
                </span>
              <span>{findItem(item)}</span> 
              <span onClick={()=>handleDecreaseQuantity(item)}>
                <FiMinus className='mines' />
              </span>
              </div>
          </td>
      <td className="table">
      <p className="item-total">${handelTotalCost(item)}</p>
      </td>
      <IoMdCloseCircleOutline onClick={()=>getClear(item.title)} className="close-item" />

    
      
      </tr>)})
     }
     </tbody>
     </table>
      
      <div className="customer-container">
      <div className="total-container">
        <h4>Total Cost</h4>
        <p className="total-cost">${cardTotalCost()}</p>
        <hr/>
        <p>Delivery Fee:$2</p>
        <hr/>
        <p>total:${totalCost+2}</p>
      </div>
      <div className="promo-code">
          <h4>promo code</h4>
          <input type="text" placeholder="enter promo code" className="promo-code-input"/>
          <button className="promo-code-btn">apply</button>
        </div>
        <div className="checkout">
         <Link to='/PlaceOrder'><button className="checkout-btn">checkout</button></Link>
        </div>
      </div>
      </div>
      }
      
    </div>
  )
}

export default Cart
