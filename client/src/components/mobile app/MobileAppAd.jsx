
import './style.css';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const MobileAppAd = ({id}) => {
  return (
    <section className="mobile-app-ad" id={id}>
      <div className="mobile-app-content">
        <h2>Download Our Mobile App</h2>
        <p>Enjoy fast, easy, and delicious food ordering with our mobile app. Get exclusive deals and a smoother experience!</p>
        <div className="download-buttons">
          <a href="#" className="app-store">
            <FaApple className="icon" />
            <span>App Store</span>
          </a>
          <a href="#" className="google-play">
            <FaGooglePlay className="icon" />
            <span>Google Play</span>
          </a>
        </div>
      </div>
      <div className="mobile-app-image">
        <img src="\Google Play App Store Icons Editorial Image - Illustration of global, game_ 159029210.jpeg" alt="Mobile App Preview" />
      </div>
    </section>
  );
};

export default MobileAppAd;
