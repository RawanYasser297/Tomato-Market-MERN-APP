import { GrStar ,GrStarOutline } from "react-icons/gr";
import './Rating.css'

const Rating = ({rate}) => {
    const r = 5; // assuming this is the rating value
  const stars = [];

  for (let index = 0; index < r; index++) {
    stars.push(<GrStar key={index} className={index<=rate-1?'yellow':'gray'} />);
  }
  return (
    <div className="star">
      {stars}
    </div>
  );
};

export default Rating

