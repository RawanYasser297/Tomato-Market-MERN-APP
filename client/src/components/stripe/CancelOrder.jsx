import { useState } from 'react';
import './css/CancelOrder.css';
import axios from '../../api/axios';

const CancelOrder = () => {
  // Example of order details that might come from props or context
  const [order, setOrder] = useState({
    orderId: '123456789',
    orderDate: '2024-12-19',
    shippingAddress: '123 Main St, City, Country',
    totalCost: 60.00,
    items: [
      { title: 'Product 1', price: 15.00, quantity: 2 },
      { title: 'Product 2', price: 25.00, quantity: 1 }
    ]
  });

  // State to track cancellation confirmation
  const [isCancelled, setIsCancelled] = useState(false);

  
  const handleCancelOrder = () => {
    // Handle the cancellation of the order
    setIsCancelled(true);
    // You can also make an API call to actually cancel the order on the server here
  };

  const handleGoBack = () => {
    // Handle going back to previous page or navigate back
    window.history.back();
  };

  return (
    <div className="cancel-order-container">
      <h1>Cancel Order</h1>

      {/* Order Information */}
      <div className="order-details">
        <h2>Order Details</h2>
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Order Date:</strong> {order.orderDate}</p>
        <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
        <p><strong>Total Cost:</strong> ${order.totalCost.toFixed(2)}</p>

        <h3>Items in Your Order</h3>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cancellation Confirmation */}
      {!isCancelled ? (
        <div className="cancel-confirmation">
          <h2>Are you sure you want to cancel your order?</h2>
          <p>If you proceed with the cancellation, you will not be able to recover your order.</p>
          
          <div className="cancel-actions">
            <button className="cancel-btn" onClick={handleCancelOrder}>
              Yes, Cancel Order
            </button>
            <button className="back-btn" onClick={handleGoBack}>
              No, Go Back
            </button>
          </div>
        </div>
      ) : (
        <div className="cancelled-confirmation">
          <h2>Your order has been cancelled successfully.</h2>
          <button className="back-btn" onClick={handleGoBack}>Go Back to Homepage</button>
        </div>
      )}
    </div>
  );
}

export default CancelOrder;
