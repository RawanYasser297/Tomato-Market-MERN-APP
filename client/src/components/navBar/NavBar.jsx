import './nav.css'
import { BiShoppingBag} from "react-icons/bi";
import { Link } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import {useContext } from 'react';
import { ItemContext } from "../../context/ItemProvider";
import { UserContext } from '../../context/UserContext';
import { CgProfile } from "react-icons/cg";
import LogOut from '../../pages/LogOut';
const NaveBar = ({clickLogin ,setClickLogin}) => {
const {cardItem, open, setOpen}=useContext(ItemContext)
const {user}=useContext(UserContext)
  return (
    <div className='container navbar'>
      <FiMenu  className='mobile-menu' onClick={()=>setOpen(!open)}  />
      <div className='rowdies-regular'>Tomato</div>
      <ul className='services'>
        <li><Link to='/'>home</Link></li>
        <li><a href='#menu'>menu</a></li>
        <li><a href='#mobileApp'>mobile app</a></li>
        <li><a href='#aboutUs'>contact us</a></li>
      </ul>
      <div className='shopping-card'>
      <Link to='/cart'><BiShoppingBag className='icon shoppingBag'  /></Link>
      <span className={cardItem.length?'red-dot':''}></span>
      </div>
      
        {
         !user?<Link to='/login' className='sign oswald-login' onClick={()=>setClickLogin(!clickLogin)}>login</Link>:<div  className='user'>
          <Link to='/userOrders' className='profile' >
          <CgProfile  className=' CgProfile'  />                   
          </Link>
          <LogOut />
         </div>
        }
      

    </div>
  )
}

export default NaveBar
