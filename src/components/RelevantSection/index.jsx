import React from "react";
import { useNavigate } from "react-router-dom";

const RelevantSection = () => {
  const dummyProducts = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    category: `Category ${(index % 5) + 1}`,
    image: "../assets/images/products/jacket-3.jpg",
    hoverImage: "../assets/images/products/jacket-4.jpg",
    // image: "../assets/images/products/image1.png",
    // hoverImage: "../assets/images/products/image2.png",
    price: `$${(Math.random() * 100).toFixed(2)}`,
    oldPrice: `$${(Math.random() * 150).toFixed(2)}`,
    discount: `${Math.floor(Math.random() * 30) + 5}%`,
    rating: Math.floor(Math.random() * 5) + 1,
  }));

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/detail");
  };
  return (
    <div
      className="product-container"
      style={{
        marginTop: "20px",
      }}
    >
      <div className="overlay" data-overlay></div>
      <div className="container">
        {/* Main Product Section */}
        <div className="product-box">
          <div className="product-main">
            <h2 className="title">Popular Product</h2>

            <div className="product-grid">
              {dummyProducts.map((product) => (
                <div
                  key={product.id}
                  className="showcase"
                  onClick={() => navigate("detail")}
                >
                  <div className="showcase-banner">
                    <img
                      src={product.image}
                      alt={product.title}
                      width="300"
                      className="product-img default"
                    />
                    <img
                      src={product.hoverImage}
                      alt={product.title}
                      width="300"
                      className="product-img hover"
                    />
                    <p className="showcase-badge">{product.discount}</p>
                  </div>

                  <div className="showcase-content">
                    {/* <a href="#" className="showcase-category">
                      {product.category}
                    </a> */}

                    <a href="#">
                      <h3 className="showcase-title">{product.title}</h3>
                    </a>

                    <div className="showcase-rating">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <ion-icon
                          key={starIndex}
                          name={
                            starIndex < product.rating ? "star" : "star-outline"
                          }
                        ></ion-icon>
                      ))}
                    </div>

                    <div className="price-box">
                      <p className="price">{product.price}</p>
                      <del>{product.oldPrice}</del>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Styling */}
      <style jsx>{`
        /* Sidebar for Desktop & Tablet */
        .category-sidebar {
          display: none;
        }

        /* Mobile Category Section */
        .category-section {
          display: flex;
          overflow-x: auto;
          white-space: nowrap;
          padding: 10px 0;
          margin-bottom: 20px;
          background-color: #f9f9f9;
        }

        .category-list {
          display: flex;
          gap: 15px;
          padding: 0 10px;
          list-style: none;
        }

        .category-icon {
          width: 40px;
          height: 40px;
          margin-bottom: 5px;
        }

        .category-name {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .category-section::-webkit-scrollbar {
          display: none; /* Hide scrollbar */
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        @media (min-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr); /* Adjust for desktop */
          }
        }

        @media (min-width: 600px) and (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr); /* Adjust for iPad */
          }
        }
      `}</style>
    </div>
  );
};

export default RelevantSection;
