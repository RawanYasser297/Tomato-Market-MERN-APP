import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-flip'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';

const swiper = new Swiper('.swiper', {
    // configure Swiper to use modules
    modules: [Navigation, Pagination],
    direction: 'vertical',
  loop: true,

    navigation: {

        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        
    
      },
      
     
  });
  ;
  swiper.nextEl
  swiper.prevEl
  export default swiper