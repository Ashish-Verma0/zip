import React from "react";
import banner from "../../images/banner.jpg";
import banner1 from "../../images/banner1.jpg";
import banner2 from "../../images/banner2.jpg";
const PosterCard = () => {
  return (
    <div className="banner" style={{ marginTop: "10px" }}>
      <div className="container">
        <div className="slider-container has-scrollbar">
          <div className="slider-item">
            <img
              src={banner1}
              alt="women's latest fashion sale"
              className="banner-img"
            />

            {/* <div className="banner-content">
              <p className="banner-subtitle">Trending item</p>

              <h2 className="banner-title">Women's latest fashion sale</h2>

              <p className="banner-text">
                starting at &dollar; <b>20</b>.00
              </p>

              <a href="#" className="banner-btn">
                Shop now
              </a>
            </div> */}
          </div>

          <div className="slider-item">
            <img src={banner} alt="modern sunglasses" className="banner-img" />

            {/* <div className="banner-content">
              <p className="banner-subtitle">Trending accessories</p>

              <h2 className="banner-title">Modern sunglasses</h2>

              <p className="banner-text">
                starting at &dollar; <b>15</b>.00
              </p>

              <a href="#" className="banner-btn">
                Shop now
              </a>
            </div> */}
          </div>

          <div className="slider-item">
            <img
              src={banner2}
              alt="new fashion summer sale"
              className="banner-img"
            />

            {/* <div className="banner-content">
              <p className="banner-subtitle">Sale Offer</p>

              <h2 className="banner-title">New fashion summer sale</h2>

              <p className="banner-text">
                starting at &dollar; <b>29</b>.99
              </p>

              <a href="#" className="banner-btn">
                Shop now
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterCard;
