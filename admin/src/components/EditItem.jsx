import {useParams,Link} from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import categoryList from '../category';

const EditItem = () => {
  
  const params = useParams();
  const id = params.id;
  const [initialValue,setInitialValue]=useState({image: '',
    title: '',
    price: '',
    about: '',
    rating: '',
    offer: '',
    category:''
  })

  const getItem=async()=>{
    try{
const response =await axios.get(`https://tomato-market-mern-app-server.onrender.com/admin/${id}`)
if(!response){
  throw new Error("Item not found")
}
console.log(response.data)
setInitialValue(response.data.dish)
    }catch(error){
      console.log(error)
    }
  }

useEffect(()=>{
  getItem()
  },[])



const UpdateItem=async(e)=>{
   e.preventDefault()
  try{
  const response =await axios.patch(`https://tomato-market-mern-app-server.onrender.com/admin/${id}`,initialValue)
  console.log(response)
  }catch(err){
    console.log(err)
  }
  }
 

  return (<form className="container" onSubmit={UpdateItem} >
      <h4 style={{fontWeight:'bolder',marginBottom:"10px"}}>add new item</h4>
      <div className="new-item-container ">
        <input type="text"
        defaultValue={initialValue.image}
        placeholder="input image file name"
        
        />

        <input
          name="title"
          type="text"
          defaultValue={initialValue.title}
          placeholder="title"
          onChange={(e) => setInitialValue(prev => ({ ...prev, title:e.target.value }))}
        />


        <input
          type="number"
          name="price"
          placeholder="price"
          defaultValue={initialValue.price}
          onChange={(e) => setInitialValue(prev => ({ ...prev, price:e.target.value }))}
        />
       
        <input
          type="text"
          name="about"
          defaultValue={initialValue.about}
          onChange={(e) => setInitialValue(prev => ({ ...prev, about:e.target.value }))}
        />

        <input
          type="text"
          name="rating"
          defaultValue={initialValue.rating}
          onChange={(e) => setInitialValue(prev => ({ ...prev, rating:e.target.value }))}
        />

        <input
          type="text"
          name="offer"
          defaultValue={initialValue.offer}
          onChange={(e) => setInitialValue(prev => ({ ...prev, offer:e.target.value }))}
        />
         <select
          name="category"
          defaultValue={initialValue.category}
          onChange={(e) =>
            setInitialValue((prev) => ({ ...prev, category: e.target.value }))
          }
        >

          <option  value={initialValue.category}>
              {initialValue.category}
            </option>
          
          {categoryList.map((item, index) =>item.name != initialValue.category? (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ):"")}
        </select>

      </div>
      <button type="submit" className="button" style={{margin:"15px"}}>add</button>
      <Link to='/admin' className='back-link' >
      back to menu
      </Link>
    </form>
  )
}

export default EditItem
