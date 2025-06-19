import './Footer.css'
import { FaFacebookF,FaWhatsapp} from "react-icons/fa";
import { FaTwitter ,FaInstagram } from "react-icons/fa6";
import { Link } from 'react-router-dom';

 const Footer = () => {
  return (
    
    <footer className="footer">
  <div className="footer-container">
    <div className="footer-logo">
      <Link to='/' className="footer-logo-text">Tomato</Link>
    </div>

    <div className="footer-social-media">
      <a href="https://www.facebook.com" target="_blank" className="social-icon">
        <FaFacebookF className="fab fa-facebook-f" />
      </a>
      <a href="https://www.twitter.com" target="_blank" className="social-icon">
        <FaTwitter className="fab fa-twitter" />
      </a>
      <a href="https://www.instagram.com" target="_blank" className="social-icon">
        <FaInstagram className="fab fa-instagram" />
      </a>

      
    </div>
    <div className="footer-copyright">
    <p>&copy; 2024 Tomato. All rights reserved.</p>
  </div>
  </div>
</footer>

    
    
)
}

export default Footer