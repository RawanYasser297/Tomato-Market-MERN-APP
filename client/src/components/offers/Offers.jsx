import './Offers.css'
import { useContext } from 'react';
import { MenuContext } from '../../context/MenuProvider';
import { ItemContext } from '../../context/ItemProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
 import 'swiper/css';
 import { TbShoppingBagCheck, TbShoppingBag } from "react-icons/tb";
import { UserContext } from '../../context/UserContext';

const Offers = () => {
  const {addNewCardItem,cardItem,removeElement}=useContext(ItemContext)
  const {items}=useContext(MenuContext)
  const {user,alert,setAlert}=useContext(UserContext)
  
const offers =items.filter((item) =>item.offer);
  console.log(items)
  console.log(offers)
const offer=(item)=>{
  const price= Number(item.price)
  const discount=Number(item.offer)
  const newPrice= price-discount
  return  newPrice >= 0 ? newPrice : 0;
}

  console.log('hello')
  
  
  const handleAddToCart = (item) =>{
    if (user) {
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
    <Swiper 
    className='swiper-offers'
  modules={[Navigation, Pagination, Scrollbar, A11y]}
  spaceBetween={20}
  navigation
  breakpoints={{
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1280: {
      slidesPerView: 5, // ✅ Five cards on large screens
    }
  }}
    >
          {
        offers.map((item, index) => {
            return (
              <SwiperSlide className='swiperSlide-offers' key={index} style={{width:"180px"}}>
                <div  style={{width:'100%',textAlign:"center"}}>
                 <img src={`https://tomato-market-mern-app-server.onrender.com/${item.image}`} alt={item.title} /> 
                </div>
                 
                  <p className='title-offer-item rowdies-regular' style={{fontSize:'medium',width:'100%',textAlign:"center"}}>{item.title}</p>
                  <div className='price-offer'>
                  <p className='new-Price'>${offer(item)}</p>
                  <p className='price'>${item.price}</p>
                  </div>
                  <div className='icons-offer'>
                  {handleAddToCardIcon(item)} 
                  </div>
              </SwiperSlide>               
            )
      })
    }
  </Swiper>

)} 

export default Offers
