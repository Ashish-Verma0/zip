import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import adiShakti from "../../images/adiShakti.png";
import { Button, Drawer } from "@mui/material";
const NavBar = () => {
  const navigate = useNavigate();
  const handleClickProfile = () => {
    navigate("/profile");
  };
  const handleClickAddToCart = () => {
    navigate("/add");
  };
  const handleClickMyOrder = () => {
    navigate("/myOrder");
  };
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event) => {
    if (event.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setMobileSearchOpen(false); // Close mobile search on submission
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebarAndNavigate = (path) => {
    setIsSidebarOpen(false); // Close the sidebar
    navigate(path); // Navigate to the specified path
  };
  return (
    <header
    // style={{
    //   position: "sticky",
    //   top: 0,
    //   width: "100%",
    //   zIndex: 999999998,
    //   backgroundColor: "white",
    //   boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    // }}
    >
      <div className="header-main">
        <div className="container">
          <div
            className="header-logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <img src={adiShakti} alt="Anon's logo" width="190" height="36" />
          </div>
          <div className="header-search-container">
            <input
              type="search"
              name="search"
              className="search-field"
              placeholder="Enter your product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <button className="search-btn">
              <ion-icon name="search-outline"></ion-icon>
            </button>
          </div>
          <div className="header-user-actions">
            <button className="action-btn" onClick={handleClickProfile}>
              <ion-icon name="person-outline"></ion-icon>
            </button>
            <button className="action-btn" onClick={handleClickAddToCart}>
              <ion-icon name="cart-outline"></ion-icon>
              {/* <span className="count">0</span> */}
            </button>
            <button className="action-btn" onClick={handleClickMyOrder}>
              <ion-icon name="bag-handle-outline"></ion-icon>
              {/* <span className="count">0</span> */}
            </button>
          </div>
        </div>
      </div>

      <div>
        {/* Mobile Bottom Navigation */}
        <div className="mobile-bottom-navigation">
          <button
            className="action-btn"
            data-mobile-menu-open-btn
            onClick={toggleSidebar}
          >
            <ion-icon name="menu-outline"></ion-icon>
          </button>
          <button className="action-btn" onClick={() => navigate("/orders")}>
            <ion-icon name="bag-handle-outline"></ion-icon>
            {/* <span className="count">0</span> */}
          </button>
          <button className="action-btn" onClick={() => navigate("/")}>
            <ion-icon name="home-outline"></ion-icon>
          </button>
          <button className="action-btn" onClick={() => navigate("/add")}>
            <ion-icon name="cart-outline"></ion-icon>
            {/* <span className="count">0</span> */}
          </button>
          <button
            className="action-btn"
            data-mobile-menu-open-btn
            onClick={() => navigate("/profile")}
          >
            <ion-icon name="grid-outline"></ion-icon>
          </button>
        </div>

        {/* Sidebar using Material UI Drawer */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        >
          <div
            role="presentation"
            onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking inside
            onKeyDown={() => setIsSidebarOpen(false)}
            style={{ width: 250, padding: 20 }}
          >
            <Button
              fullWidth
              onClick={() => closeSidebarAndNavigate("/aboutus")}
              variant="outlined"
              style={{ marginBottom: "10px" }}
            >
              About Us
            </Button>
            <Button
              fullWidth
              onClick={() => closeSidebarAndNavigate("/contactus")}
              variant="outlined"
            >
              Contact Us
            </Button>
          </div>
        </Drawer>
      </div>

      <nav className="mobile-navigation-menu  has-scrollbar" data-mobile-menu>
        <div className="menu-top">
          <h2 className="menu-title">Menu</h2>

          <button className="menu-close-btn" data-mobile-menu-close-btn>
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <ul className="mobile-menu-category-list">
          <li className="menu-category">
            <a href="#" className="menu-title">
              Home
            </a>
          </li>

          <li className="menu-category">
            <button className="accordion-menu" data-accordion-btn>
              <p className="menu-title">Men's</p>

              <div>
                <ion-icon name="add-outline" className="add-icon"></ion-icon>
                <ion-icon
                  name="remove-outline"
                  className="remove-icon"
                ></ion-icon>
              </div>
            </button>

            <ul className="submenu-category-list" data-accordion>
              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Shirt
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Shorts & Jeans
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Safety Shoes
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Wallet
                </a>
              </li>
            </ul>
          </li>

          <li className="menu-category">
            <button className="accordion-menu" data-accordion-btn>
              <p className="menu-title">Women's</p>

              <div>
                <ion-icon name="add-outline" className="add-icon"></ion-icon>
                <ion-icon
                  name="remove-outline"
                  className="remove-icon"
                ></ion-icon>
              </div>
            </button>

            <ul className="submenu-category-list" data-accordion>
              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Dress & Frock
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Earrings
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Necklace
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Makeup Kit
                </a>
              </li>
            </ul>
          </li>

          <li className="menu-category">
            <button className="accordion-menu" data-accordion-btn>
              <p className="menu-title">Jewelry</p>

              <div>
                <ion-icon name="add-outline" className="add-icon"></ion-icon>
                <ion-icon
                  name="remove-outline"
                  className="remove-icon"
                ></ion-icon>
              </div>
            </button>

            <ul className="submenu-category-list" data-accordion>
              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Earrings
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Couple Rings
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Necklace
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Bracelets
                </a>
              </li>
            </ul>
          </li>

          <li className="menu-category">
            <button className="accordion-menu" data-accordion-btn>
              <p className="menu-title">Perfume</p>

              <div>
                <ion-icon name="add-outline" className="add-icon"></ion-icon>
                <ion-icon
                  name="remove-outline"
                  className="remove-icon"
                ></ion-icon>
              </div>
            </button>

            <ul className="submenu-category-list" data-accordion>
              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Clothes Perfume
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Deodorant
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Flower Fragrance
                </a>
              </li>

              <li className="submenu-category">
                <a href="#" className="submenu-title">
                  Air Freshener
                </a>
              </li>
            </ul>
          </li>

          <li className="menu-category">
            <a href="#" className="menu-title">
              Blog
            </a>
          </li>

          <li className="menu-category">
            <a href="#" className="menu-title">
              Hot Offers
            </a>
          </li>
        </ul>

        <div className="menu-bottom">
          <ul className="menu-category-list">
            <li className="menu-category">
              <button className="accordion-menu" data-accordion-btn>
                <p className="menu-title">Language</p>

                <ion-icon
                  name="caret-back-outline"
                  className="caret-back"
                ></ion-icon>
              </button>

              <ul className="submenu-category-list" data-accordion>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">
                    English
                  </a>
                </li>

                <li className="submenu-category">
                  <a href="#" className="submenu-title">
                    Espa&ntilde;ol
                  </a>
                </li>

                <li className="submenu-category">
                  <a href="#" className="submenu-title">
                    Fren&ccedil;h
                  </a>
                </li>
              </ul>
            </li>

            <li className="menu-category">
              <button className="accordion-menu" data-accordion-btn>
                <p className="menu-title">Currency</p>
                <ion-icon
                  name="caret-back-outline"
                  className="caret-back"
                ></ion-icon>
              </button>

              <ul className="submenu-category-list" data-accordion>
                <li className="submenu-category">
                  <a href="#" className="submenu-title">
                    USD &dollar;
                  </a>
                </li>

                <li className="submenu-category">
                  <a href="#" className="submenu-title">
                    EUR &euro;
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="menu-social-container">
            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" className="social-link">
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
