import { TbShoppingBagCheck, TbShoppingBag } from "react-icons/tb";
import { useParams} from 'react-router-dom';
import { UserContext } from './../../context/UserContext';
import { useContext } from 'react';
import { ItemContext } from '../../context/ItemProvider';
import { MenuContext } from '../../context/MenuProvider';
import Rating from "../bestSeller/Rating";
import './Category.css'

const ItemsCategory = () => {
    const category =useParams()
    const {addNewCardItem,cardItem,removeElement}=useContext(ItemContext)
  const {items}=useContext(MenuContext)
const {user,setAlert,alert}=useContext(UserContext)
  

    const mapping =((item, index) => {
 const handleAddToCart = (item) =>{
    if (user){
    addNewCardItem(item.title);
    }

  };

  


  const handleAddToCardIcon = (item) => {
    const added=cardItem.map(item=>item.itemName).includes(item.title)
    console.log("added" + added)
    return  !added?<TbShoppingBag className="TbShoppingBag" onClick={()=>{
      setAlert(!alert)
      handleAddToCart(item)}}/> :<TbShoppingBagCheck className="TbShoppingBagCheck" onClick={()=>removeElement(item.title)}/>
  
}
      
        return (
          <li key={index} className="item-BS">
          
             <img src={`https://tomato-market-mern-app-server.onrender.com/${item.image}`} alt={item.name} />
            
            <div className="details">
              <h3 className="title">{item.title}</h3>
              <p className="description">{item.category}</p>
              <span className="price">{item.price}$</span>
              <Rating rate={item.rating} className="rating" />
            </div>
            
            {
              handleAddToCardIcon(item)
            }
          </li>
        );
      })
      
      
      
      
        return (
          <div className="best-seller">
            <h2>Best-Selling Delights: A Taste of Excellence</h2>
            <p>
              Discover the irresistible flavors that keep our customers coming back
              for more!
            </p>
            <ul className="list_BS">
              {items.filter((v)=>v.category===category.category).map(mapping)}
            </ul>
          </div>
        );
}

export default ItemsCategory

