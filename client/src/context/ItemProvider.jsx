import { createContext,useContext,useEffect,useState } from "react"
import { UserContext } from "./UserContext";
import { MenuContext } from "./MenuProvider";
import useAxiosPrivet from "../provider/axiosProvider";

export const ItemContext=createContext()

const ItemProvider = ({children}) => {
  const [cardItem, setCardItem] = useState([]);
  const [totalCost, setTotalCost] = useState([]);
  const [ordersCost, setOrderCost] = useState(0);
  const [open,setOpen]=useState(false)
  const [total, setTotal] = useState(0);
  const {items}=useContext(MenuContext)
  const {user}=useContext(UserContext)
  const  axios=useAxiosPrivet()
  
  
  
  

  const handelOrders=(title)=>{
    const findTitle=cardItem.find(item=>item.itemName===title)
    if(findTitle){
    return  findTitle.order 
    }
    
  }





  const handelTotalCost=(myItem)=>{
    const findTitle=cardItem.find(item=>item.itemName===myItem.title)
    if(findTitle){
      const res=(findTitle.order * myItem.price)-(myItem.offer * handelOrders(myItem.title))
      return res
    }
    
    
  
  }

  
  

  const addNewCardItem = async(itemName)=>{
      if(!cardItem.map(e=>e.itemName).includes(itemName)){
        const findPrice=items.find(e=>e.title===itemName)
        setCardItem((prevItems)=>([...prevItems,{itemName,order: 1,price:findPrice.price,offer:findPrice.offer||0}])) 
      }else{
        const index = cardItem.findIndex(item => item.itemName === itemName);
        if (index !== -1) {
          // U pdate the order of the found item
          setCardItem(prevItems =>{
            const newItems = [...prevItems];
            newItems[index].order += 1;  //Increment order by 1
            return newItems;
          });

          
      }
    }
    
    
    }

  
  
    
    
  
    const removeElement=(itemName)=>{

      const fondItem =cardItem.find(item=>item.itemName===itemName)
      if(fondItem && fondItem.order===1){
        setCardItem(prevItems=>prevItems.filter(item=>item.itemName!==itemName))
        
      }else{
        const index = cardItem.findIndex(item => item.itemName === itemName);
        if (index !== -1) {
          // Update the order of the found item
          setCardItem(prevItems => {
            const newItems = [...prevItems];
              newItems[index].order -= 1; // Increment order by 1
              return newItems;
          })
  }
      }
   
}

const getClear=(itemName)=>{
  
  setCardItem(prevItems=>prevItems.filter(item=>item.itemName!==itemName))

}

const cardTotalCost=()=>{
  const mapping =items.map(item=>{
   return  handelTotalCost(item)
  })
  console.log(mapping)
const filtering=mapping.filter(item=>Number(item)
)
console.log(filtering)

  const totalData=filtering.reduce((previousValue, currentValue) => {
          return previousValue+ currentValue
    });
    return totalData

    
  
}

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


const contextValue ={
  addNewCardItem,
  removeElement,
  cardItem,
  setCardItem,
  handelTotalCost,
  totalCost,
  setTotalCost,
  open,
  setOpen,
  handelOrders,
  setTotal,
  total,
  ordersCost,
  setOrderCost,
  cardTotalCost,
  updateCartItemDate,
  getClear
}

  useEffect(()=>{
    console.log("cardItem"+JSON.stringify(cardItem))
  console.log("cardItem"+ typeof cardItem)

  },[cardItem])

  return (
    <ItemContext.Provider value={contextValue}>
      {children}
    </ItemContext.Provider>
  )

}

export default ItemProvider
