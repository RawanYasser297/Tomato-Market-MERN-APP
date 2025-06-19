import './Category.css'
import categoryList from '../../assets/assets'
import { Link } from 'react-router-dom';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

// Import Swiper styles
import 'swiper/css';

const Category = () => {
   // Using a ref to access the swiper container
  return (
   <div className='category' >
{
            categoryList.map((category, index) => {
                return (
                    <Link  key={index} to={`/category/${category.name}`} className='item' >
                      <img src={category.img} alt={category.name} /> 
                      <p>{category.name}</p>
                    </Link>
                )
          })
        }
    </div>
      )
    }

export default Category
