import './pages.css'
import { ItemContext } from "../context/ItemProvider";
import { useContext,useState } from 'react';
import { FaCcVisa , FaPaypal,FaCcMastercard} from "react-icons/fa";
import { MenuContext } from '../context/MenuProvider';
import useAxiosPrivet from '../provider/axiosProvider';
import { UserContext } from '../context/UserContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QVA2fCi9nPjKKJhFU8mElYPz0kfPK6JBpTIKRhyoBta4TFWaDg9nJ9a3jJUAixgiebY4dlg3MePt5OvfUtAi1fE00jM0RvATG');
const PlaceOrder = () => {
  const {handelTotalCost,cardItem,cardTotalCost}=useContext(ItemContext)
  const{items}=useContext(MenuContext)
  const{user}=useContext(UserContext)
  const axios =useAxiosPrivet()
  
  const [data,setData]=useState({
    name: "",
    email:"",
    street:"",
    city:"",
    state:"",
    zip:"",
    country:"",
    phone:""
  })


  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}))
  }

 
  const handelSubmit=async(e)=>{
    e.preventDefault()
  try{
    const findItem = items.filter((item) => 
      cardItem.some(i => i.itemName === item.title)
    );

    
      console.log("orderItems"+JSON.stringify(cardItem))
      console.log("user"+ JSON.stringify(user))

    
      const lineItems = findItem.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.title,
            },
            unit_amount:handelTotalCost(item)* 100, // Convert to cents
        },
        quantity:cardItem.find(i => i.itemName === item.title).order || 1,
    }));


    // Prepare order data
    const orderData = {
        userEmail:user.user.email,
        address: data,
        cartItems:cardItem,
        amount: cardTotalCost(), 
        lineItems:lineItems, // Add line_items to orderData
    };

// to add delivery fee ==>> need to push data 

  // console.log(orderData.lineItems)
  // console.log('useremail'+orderData.userEmail)
  // console.log(findItem) //XXXXXXXX
  // console.log(orderData)
  // console.log(typeof lineItems)

  
    const response = await axios.post('/api/v1/checkout',orderData);
    const stripe = await stripePromise;

            //Redirect to Stripe Checkout
            const { error } = await stripe.redirectToCheckout({
                sessionId: response.data.id, // Access the session ID correctly
            });

            if(error){
                console.error('Error redirecting to checkout:', error);
            }

  console.log(response.data)
  
  }catch(error){
    console.log(error)
  }

}


  return (
    <form  onSubmit={handelSubmit} className='place-order'>
    <h3>Delivery Information</h3>
    <div className="inputs">
    <input placeholder="name" type="text" name='name' value={data.name} onChange={onChangeHandler} />

    <input placeholder="Email" type="email"  name='email'  onChange={onChangeHandler} value={data.email} />
    <input placeholder="Phone number" type="number" name='phone' value={data.phone} onChange={onChangeHandler} />
    <input placeholder="City" type="text" onChange={onChangeHandler} name='city' value={data.city} />
    <input placeholder="Country" type="text" onChange={onChangeHandler} name='country' value={data.country} />
    <input placeholder="State" type="text" onChange={onChangeHandler}  name='state' value={data.state} />
    <input placeholder="Zip" type="number" onChange={onChangeHandler} name='zip' value={data.zip} />
    
    </div>
    <div className="total-container">
    <ul className='payment'>
    <li><a href=""></a><FaCcVisa /></li>
    <li><a href=""></a><FaPaypal   /></li>
    <li><a href=""></a><FaCcMastercard /></li>
    </ul>
        <h4>Total Cost</h4>
        <p className="total-cost">${cardTotalCost()}</p>
        <hr/>
        <p>Delivery Fee:$2</p>
        <hr/>
        <p>total:${Number(cardTotalCost()) +2}</p>
      </div>
    <button type="submit">Place Order</button>
    </form>
  )
}

export default PlaceOrder
