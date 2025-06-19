import './About.css'
const About = ({id}) => {
  return (
    <section className="about-us" id={id}>
        <div className='one'>
        <img className='about-image' src="https://tomato-market-mern-app-server.onrender.com/images/Delivery.jpeg" alt="" />
        <div className="about-us-content">
            <h3 className='playfair-display-h3'>Fast and Reliable Home Delivery Service</h3>
            <p className='about-p'>
             we understand the importance of enjoying your favorite meals in the comfort of your home. That's why we offer a fast, reliable, and convenient delivery service directly to your doorstep. Whether you're craving a quick snack or a full meal, our team is dedicated to ensuring your order arrives hot, fresh, and on time. We take pride in delivering delicious food right to your door with minimal wait time, so you can relax and enjoy your meal without any hassle. Simply place your order online or by phone, and let us handle the rest. With our commitment to quality.
            </p>

        </div>
        </div>
        <div className='two'>
        <img className='about-image' src="https://tomato-market-mern-app-server.onrender.com/images/Data entry jobs blue RGB color icon (1).jpeg" alt="" />
        <div className="about-us-content">
            <h3 className='playfair-display-h3'>Fast and Easy Ordering – Call Our Hotline Now!</h3>
            <p className='about-p'>
            we make ordering your favorite meals quick and effortless. Whether you’re at home, at work, or on the go, you can place your order in just a few seconds. For immediate assistance or to make an order, simply call our hotline at [Your Hotline Number]. Our friendly team is ready to take your call, answer your questions, and get your delicious meal on its way in no time! Enjoy a fast and seamless ordering experience – when hunger strikes, we're here to serve you quickly and efficiently. Don't wait – call us now and enjoy your meal in no time!
            </p>

        </div>
        </div>
        <div className='three'>
        <img className='about-image' src="https://tomato-market-mern-app-server.onrender.com/images/Location map animation.jpeg" alt="" />
        <div className="about-us-content">
            <h3 className='playfair-display-h3'>Visit Our Convenient Locations – Now with Multiple Branches!</h3>
            <p className='about-p'>
            we’re proud to serve our customers through multiple convenient locations. With branches in key areas, we make it easier for you to enjoy our delicious meals no matter where you are. Whether you're near our original location or one of our newer branches, you can count on us for the same high-quality food, friendly service, and quick delivery. Our goal is to bring fresh, flavorful meals closer to you, and with our growing number of branches, we’re making it even easier to satisfy your cravings. Visit us today at one of our locations or call ahead for a fast pickup. We're always nearby to serve you!
            </p>

        </div>
        </div>
      
    </section>
  )
}

export default About
