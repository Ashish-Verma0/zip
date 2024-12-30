import React from "react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const dummyOrders = Array.from({ length: 30 }, (_, index) => ({
    orderId: `ORD-${1000 + index}`,
    transactionId: `TXN-${2000 + index}`,
    orderStatus: ["Pending", "Shipped", "Delivered", "Cancelled"][
      Math.floor(Math.random() * 4)
    ],
    orderPrice: `$${(Math.random() * 500).toFixed(2)}`,
    orderDate: new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    ).toLocaleDateString(),
    image: "../assets/images/products/jacket-3.jpg",
  }));

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/order-detail");
  };

  return (
    <div
      className="order-container"
      style={{
        marginTop: "20px",
      }}
    >
      <div className="overlay" data-overlay></div>
      <div className="container">
        {/* Main Order Section */}
        <div className="order-box">
          <div className="order-main">
            <h2 className="title">Order Details</h2>

            <div className="order-grid">
              {dummyOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="order-card"
                  onClick={() => navigate("/order-detail")}
                >
                  <div className="order-image">
                    <img
                      src={order.image}
                      alt={`Order ${order.orderId}`}
                      width="120"
                      height="120"
                    />
                  </div>
                  <div className="order-details">
                    <h3 className="order-title">Order ID: {order.orderId}</h3>
                    <p className="order-category">
                      Transaction ID: {order.transactionId}
                    </p>
                    <p className="order-status">Status: {order.orderStatus}</p>
                    <p className="order-price">Price: {order.orderPrice}</p>
                    <p className="order-date">Date: {order.orderDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Styling */}
      <style jsx>{`
        .order-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
        }

        .order-card {
          display: flex;
          align-items: center;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #fff;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .order-card:hover {
          transform: scale(1.03);
        }

        .order-image img {
          border-radius: 8px;
        }

        .order-details {
          margin-left: 15px;
          flex: 1;
        }

        .order-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .order-category,
        .order-status,
        .order-price,
        .order-date {
          font-size: 14px;
          margin-bottom: 5px;
          color: #555;
        }

        @media (min-width: 768px) {
          .order-grid {
            grid-template-columns: repeat(2, 1fr); /* Adjust for desktop */
          }
        }

        @media (min-width: 600px) and (max-width: 1024px) {
          .order-grid {
            grid-template-columns: repeat(1, 1fr); /* Adjust for iPad */
          }
        }
      `}</style>
    </div>
  );
};

export default MyOrders;
