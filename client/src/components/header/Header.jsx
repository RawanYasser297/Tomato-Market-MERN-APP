import './Header.css'
import {useContext} from'react'
import { ItemContext } from "../../context/ItemProvider";


const Header = () => {
  const {open, setOpen}=useContext(ItemContext)
  return (
    <header className='header'  onClick={()=>setOpen(!open)}>
      <div className='photo'>
        <img src='10.jpeg' className='photo1' />
      </div>
<div className='main'>
<div className='h1'>
<span className='playfair-display-h1'>
  FEEL 
</span>
<span className='playfair-display-h1'>
  GOOD
</span> 
<span className='playfair-display-h1'>
  ABOUT
</span>
<span className='playfair-display-h1'>
  YOUR
</span>
<span className='playfair-display-h1'>
  FOOD
</span>

  </div>
      {/* <h1>order your favorite food here</h1>
      <p>Welcome to our vibrant culinary haven, where every dish tells a story and every flavor is a passport to another part of the world. In a world brimming with diverse cultures, each with its unique ingredients and cooking techniques, we invite you to embark on a gastronomic adventure that transcends borders and traditions....
      </p>

<br/>
<button onClick={()=>setView(true)} className={!view?'view-more':'more'} >view more</button>
<div className={view?'':'more'}>
<p>
At Tomato, we believe that food is not just sustenance; it’s an experience. From the spicy streets of Bangkok to the rustic kitchens of Tuscany, our mission is to celebrate all types of food—whether you’re a fan of savory, sweet, vegetarian, or indulgent delights. Here, you can explore everything from comforting classics to innovative fusion dishes.
</p>
<br/>
<button className='less' onClick={()=>setView(false)}>Less</button>
</div> */}
      </div> 
    </header>
  )
}

export default Header
