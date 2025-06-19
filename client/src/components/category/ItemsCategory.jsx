import { useContext } from "react"
import {useParams} from "react-router-dom"
import Rating from "../bestSeller/Rating";
import { ItemContext } from "../../context/ItemProvider";
import { MenuContext } from "../../context/MenuProvider";
import { TbShoppingBagCheck, TbShoppingBag } from "react-icons/tb";

const ItemsCategory = () => {
    const { items } = useContext(MenuContext);
    const category =useParams()
    const {addNewCardItem,cardItem,removeElement}=useContext(ItemContext)
    console.log(items)
    console.log(category.category)

    const mapping =((item, index) => {
 
        const handleAddToCart = () =>{
          addNewCardItem(item.title);
        };
        

        const handleAddToCardIcon = (item) => {
          const added=cardItem.map(item=>item.itemName).includes(item.title)
          console.log("added" + added)
          return  !added?<TbShoppingBag className="TbShoppingBag" onClick={()=>handleAddToCart(item)}/> :<TbShoppingBagCheck className="TbShoppingBagCheck" onClick={()=>removeElement(item.title)}/>
        
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
