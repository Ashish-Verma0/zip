import React from "react";

const FooterSection = () => {
  return (
    <footer>
      <div className="footer-nav">
        <div className="container">
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Popular Categories</h2>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Fruits & Vegetables
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Dairy Products
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Snacks & Beverages
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Bakery Items
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Frozen Foods
              </a>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Products</h2>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Organic Products
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Spices & Condiments
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Health & Wellness
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Household Essentials
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Best Sellers
              </a>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Our Store</h2>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Delivery Information
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Refund Policy
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Terms and Conditions
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                About Us
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Secure Payment Options
              </a>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Services</h2>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Exclusive Discounts
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                New Arrivals
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Best Sellers
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Customer Support
              </a>
            </li>

            <li className="footer-nav-item">
              <a href="#" className="footer-nav-link">
                Store Locator
              </a>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Contact</h2>
            </li>

            <li className="footer-nav-item flex">
              <div className="icon-box">
                <ion-icon name="location-outline"></ion-icon>
              </div>

              <address className="content">
                123 Main Street, Springfield, Illinois (IL), 62701, USA
              </address>
            </li>

            <li className="footer-nav-item flex">
              <div className="icon-box">
                <ion-icon name="call-outline"></ion-icon>
              </div>

              <a href="tel:+5551234567" className="footer-nav-link">
                (555) 123-4567
              </a>
            </li>

            <li className="footer-nav-item flex">
              <div className="icon-box">
                <ion-icon name="mail-outline"></ion-icon>
              </div>

              <a href="mailto:support@grocerystore.com" className="footer-nav-link">
                support@grocerystore.com
              </a>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Follow Us</h2>
            </li>

            <li>
              <ul className="social-link">
                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                </li>

                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                </li>

                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    <ion-icon name="logo-linkedin"></ion-icon>
                  </a>
                </li>

                <li className="footer-nav-item">
                  <a href="#" className="footer-nav-link">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <img
            src="./assets/images/payment.png"
            alt="payment method"
            className="payment-img"
          />

          <p className="copyright">
            Copyright &copy; <a href="#">Globel Info Tech</a> all rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
