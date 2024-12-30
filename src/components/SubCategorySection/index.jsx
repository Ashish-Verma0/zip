import React from "react";

const SubCategorySection = () => {
  const dummyProducts = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    category: `Category ${(index % 5) + 1}`,
    image: "../assets/images/products/jacket-3.jpg",
    hoverImage: "../assets/images/products/jacket-4.jpg",
    price: `$${(Math.random() * 100).toFixed(2)}`,
    oldPrice: `$${(Math.random() * 150).toFixed(2)}`,
    discount: `${Math.floor(Math.random() * 30) + 5}%`,
    rating: Math.floor(Math.random() * 5) + 1,
  }));

  return (
    <div className="product-container" style={{ marginTop: "20px" }}>
      <div className="overlay" data-overlay></div>
      <div className="container">
        {/* Sidebar for Categories (Desktop & Tablet) */}
        <div className="sidebar has-scrollbar category-sidebar">
          <div className="sidebar-category">
            <div className="sidebar-top">
              <h2 className="sidebar-title">Category</h2>
            </div>

            <ul className="sidebar-menu-category-list">
              {[
                { name: "Clothes", icon: "dress" },
                { name: "Footwear", icon: "shoes" },
                { name: "Jewelry", icon: "jewelry" },
                { name: "Perfume", icon: "perfume" },
                { name: "Cosmetics", icon: "cosmetics" },
                { name: "Glasses", icon: "glasses" },
                { name: "Bags", icon: "bag" },
              ].map((category, index) => (
                <li className="sidebar-menu-category" key={index}>
                  <button className="sidebar-accordion-menu">
                    <div className="menu-title-flex">
                      <img
                        src={`../assets/images/icons/${category.icon}.svg`}
                        alt={category.name}
                        width="20"
                        height="20"
                        className="menu-title-img"
                      />
                      <p className="menu-title">{category.name}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Category Section (Mobile) */}
        <div className="category-section">
          <ul className="category-list">
            {[
              { name: "Clothes", icon: "dress" },
              { name: "Footwear", icon: "shoes" },
              { name: "Jewelry", icon: "jewelry" },
              { name: "Perfume", icon: "perfume" },
              { name: "Cosmetics", icon: "cosmetics" },
              { name: "Glasses", icon: "glasses" },
              { name: "Bags", icon: "bag" },
            ].map((category, index) => (
              <li key={index} className="category-item">
                <img
                  src={`../assets/images/icons/${category.icon}.svg`}
                  alt={category.name}
                  className="category-icon"
                />
                <p className="category-name">{category.name}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Product Section */}
        <div className="product-box">
          <div className="product-main">
            <h2 className="title">Sub Category Product</h2>

            <div className="product-grid">
              {dummyProducts.map((product) => (
                <div key={product.id} className="showcase">
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

        .category-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 80px;
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
          .category-sidebar {
            display: block; /* Sidebar visible on tablet and desktop */
          }

          .category-section {
            display: none; /* Hide mobile category section on larger screens */
          }

          .product-grid {
            grid-template-columns: repeat(4, 1fr); /* Adjust for desktop */
          }
        }
      `}</style>
    </div>
  );
};

export default SubCategorySection;
