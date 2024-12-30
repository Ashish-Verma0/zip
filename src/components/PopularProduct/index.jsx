import React from "react";

const PopularProduct = () => {
  // Dummy products array
  const dummyProducts = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    category: `Category ${(index % 5) + 1}`,
    image: "./assets/images/products/jacket-3.jpg", 
    hoverImage: "./assets/images/products/jacket-4.jpg", 
    price: `$${(Math.random() * 100).toFixed(2)}`,
    oldPrice: `$${(Math.random() * 150 + 100).toFixed(2)}`, 
    discount: `${Math.floor(Math.random() * 30) + 5}%`,
    rating: Math.floor(Math.random() * 5) + 1,
  }));

  return (
    <div className="product-container">
      <div className="container">
        <div className="product-box">
          <div className="product-main">
            <h2 className="title">New Products</h2>

            <div className="product-grid">
              {dummyProducts.map((product) => (
                <div className="showcase" key={product.id}>
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
                    <a href="#" className="showcase-category">
                      {product.category}
                    </a>

                    <a href="#">
                      <h3 className="showcase-title">{product.title}</h3>
                    </a>

                    <div className="showcase-rating">
                      {Array.from({ length: 5 }, (_, index) => (
                        <ion-icon
                          key={index}
                          name={index < product.rating ? "star" : "star-outline"}
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
    </div>
  );
};

export default PopularProduct;
