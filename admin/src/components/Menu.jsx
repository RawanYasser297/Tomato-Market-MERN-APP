//import {useEffect} from 'react'
import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from "react";
import './css/menu.css'

axios.defaults.baseURL = "http://localhost:5555/";
axios.defaults.withCredentials = true;

const Menu = () => {
  // console.log("Items in Controllers:", items);
  // Check if items are being passed
  const [items,setItems]=useState([])
  const getData=async()=>{
    try{
      const response = await axios.get('/admin');
      if(!response)throw new Error('Something bad happened.');
      console.log(response.data)
      setItems(response.data.items)
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getData();
    },[])

const handelDeleteItem=async(id)=>{
  console.log(id)
  try{
   const response= await axios.delete(`admin/${id}`)
   if(!response.ok){
    console.error('Fetching problems')
   }
    getData();

  }catch(err){
    console.log(err)
  }


}




console.log("ddddd"+items.map(e=>e.title))



  return (
    <div className="controllers-menu">
      <h4 className="menu-h4">menu</h4>
      <p className="menu-length">your list contain {items.length} items</p>
      <ul className="menu-list">
        {items.map((item,index) =><li key={index}>
            <span className="number">{index+1}</span>
            <img src={`http://localhost:5555/${item.image}`} className="menu-images" />
            <div className="item-name">{item.title}</div>
            <Link to={`/editItem/${item._id}`}>
              <RxUpdate className="RxUpdate" />
            </Link>
            <MdDelete className="MdDelete" onClick={()=> handelDeleteItem(item._id)} />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
