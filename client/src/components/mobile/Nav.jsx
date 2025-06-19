import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaPhoneSquareAlt,FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './style.css'
import { UserContext } from "../../context/UserContext";
import { ItemContext } from "../../context/ItemProvider";
import { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import LogOut from "../../pages/LogOut";
const Nav =   ( {clickLogin, setClickLogin} ) => {
  const {open, setOpen}=useContext(ItemContext)
const {user}=useContext(UserContext)

  return (
      <ul  className={open?'open-menu':'mobile-pages'}  onClick={()=>setOpen(!open)}  >
        <li>
        <Link to='/profile' className='profile-mobile' >
        <CgProfile  className=' CgProfile'  />                   
          </Link>
        </li>
        
        <li className='mobile-icons'><Link to='/' className='a'>
        <FaHome /> <span>home</span>
        </Link></li>
        <li className='mobile-icons'><a href='#menu' className='a'>
          <MdOutlineRestaurantMenu /> <span>menu</span>
          </a>
          </li>
        <li className='mobile-icons'>
          <a href='#mobile' className='a'>
            <FaPhoneSquareAlt /> <span>call us</span>
          </a>
        </li>
        <li> 
           {
         !user?<Link to='/login' className='sign-mobile' onClick={()=>setClickLogin(!clickLogin)}>login</Link>:<div className='user-mobile' >
          <LogOut className='logout' />
         </div>
        }
             </li>
        

      </ul>

    
  )
}

export default Nav
