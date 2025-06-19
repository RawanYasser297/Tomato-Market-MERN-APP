
import { useParams } from 'react-router-dom';
import { MenuContext } from "../../context/MenuProvider";
import { useContext } from "react";



 const Item = () => {
  const { items } = useContext(MenuContext);
  const params = useParams();
  const id = params.id;
  const foundItem =items.find((item)=> item._id === id)
  console.log(foundItem)

  return (
    <div className="about-meal">
    <p>{foundItem.title}</p>
    </div>
  )
}

export default Item