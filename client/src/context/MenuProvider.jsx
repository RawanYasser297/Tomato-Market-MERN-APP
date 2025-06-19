import { createContext ,useEffect,useState } from "react"
import { axiosPrivet } from "../api/axios";
export const MenuContext=createContext()



const MenuProvider = ({children}) => {
  const [items, setItems] = useState([]);
  const getData=async()=>{
      try{
          const response=await axiosPrivet.get('/api/items')
          if(!response)throw new Error('Something bad happened.');
          setItems(response.data.items)
  }
  catch(error){
      console.error(error)
  }
  }
      useEffect(() => {
          getData()
        },[]);
      
  return (
    <MenuContext.Provider value={{setItems,items}}>
      {children}
    </MenuContext.Provider>
  )
}



export default MenuProvider
