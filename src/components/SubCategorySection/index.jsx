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
        <div className="sidebar  has-scrollbar" data-mobile-menu>
          <div className="sidebar-category">
            <div className="sidebar-top">
              <h2 className="sidebar-title">Category</h2>

              <button className="sidebar-close-btn" data-mobile-menu-close-btn>
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>

            <ul className="sidebar-menu-category-list">
              <li className="sidebar-menu-category">
                <button className="sidebar-accordion-menu" data-accordion-btn>
                  <div className="menu-title-flex">
                    <img
                      src="../assets/images/icons/dress.svg"
                      alt="clothes"
                      width="20"
                      height="20"
                      className="menu-title-img"
                    />

                    <p className="menu-title">Clothes</p>
                  </div>

                  <div>
                    <ion-icon
                      name="add-outline"
                      className="add-icon"
                    ></ion-icon>
                    <ion-icon
                      name="remove-outline"
                      className="remove-icon"
                    ></ion-icon>
                  </div>
                </button>
              </li>

              <li className="sidebar-menu-category">
                <button className="sidebar-accordion-menu" data-accordion-btn>
                  <div className="menu-title-flex">
                    <img
                      src="../assets/images/icons/shoes.svg"
                      alt="footwear"
                      className="menu-title-img"
                      width="20"
                      height="20"
                    />

                    <p className="menu-title">Footwear</p>
                  </div>

                  <div>
                    <ion-icon
                      name="add-outline"
                      className="add-icon"
                    ></ion-icon>
                    <ion-icon
                      name="remove-outline"
                      className="remove-icon"
                    ></ion-icon>
                  </div>
                </button>
              </li>

              <li className="sidebar-menu-category">
                <button className="sidebar-accordion-menu" data-accordion-btn>
                  <div className="menu-title-flex">
                    <img
                      src="../assets/images/icons/jewelry.svg"
                      alt="clothes"
                      className="menu-title-img"
                      width="20"
                      height="20"
                    />

                    <p className="menu-title">Jewelry</p>
                  </div>

                  <div>
                    <ion-icon
                      name="add-outline"
                      className="add-icon"
                    ></ion-icon>
                    <ion-icon
                      name="remove-outline"
                      className="remove-icon"
                    ></ion-icon>
                  </div>
                </button>
              </li>

              <li className="sidebar-menu-category">
                <button className="sidebar-accordion-menu" data-accordion-btn>
                  <div className="menu-title-flex">
                    <img
                      src="../assets/images/icons/perfume.svg"
                      alt="perfume"
                      className="menu-title-img"
                      width="20"
                      height="20"
                    />

                    <p className="menu-title">Perfume</p>
                  </div>

                  <div>
                    <ion-icon
                      name="add-outline"
                      className="add-icon"
                    ></ion-icon>
                    <ion-icon
                      name="remove-outline"
                      className="remove-icon"
                    ></ion-icon>
                  </div>
                </button>
              </li>

              <li className="sidebar-menu-category">
                <button className="sidebar-accordion-menu" data-accordion-btn>
                  <div className="menu-title-flex">
                    <img
                      src="../assets/images/icons/cosmetics.svg"
                      alt="cosmetics"
                      className="menu-title-img"
                      width="20"
                      height="20"
                    />

                    <p className="menu-title">Cosmetics</p>
                  </div>

                  <div>
                    <ion-icon
                      name="add-outline"
                      className="add-icon"
                    ></ion-icon>
                    <ion-icon
                      name="remove-outline"
                      className="remove-icon"
                    ></ion-icon>
                  </div>
                </button>
              </li>

              <li className="sidebar-menu-category">
                <button className="sidebar-accordion-menu" data-accordion-btn>
                  <div className="menu-title-flex">
                    <img
                      src="../assets/images/icons/glasses.svg"
                      alt="glasses"
                      className="menu-title-img"
                      width="20"
                      height="20"
                    />

                    <p className="menu-title">Glasses</p>
                  </div>

                  <div>
                    <ion-icon
                      name="add-outline"
                      className="add-icon"
                    ></ion-icon>
                    <ion-icon
                      name="remove-outline"
                      className="remove-icon"
                    ></ion-icon>
                  </div>
                </button>
              </li>

              <li className="sidebar-menu-category">
                <button className="sidebar-accordion-menu" data-accordion-btn>
                  <div className="menu-title-flex">
                    <img
                      src="../assets/images/icons/bag.svg"
                      alt="bags"
                      className="menu-title-img"
                      width="20"
                      height="20"
                    />

                    <p className="menu-title">Bags</p>
                  </div>

                  <div>
                    <ion-icon
                      name="add-outline"
                      className="add-icon"
                    ></ion-icon>
                    <ion-icon
                      name="remove-outline"
                      className="remove-icon"
                    ></ion-icon>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>

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
    </div>
  );
};

export default SubCategorySection;
