import React, { useState } from "react";
import AddToCart from "../../images/AddToCart.png"
import "./productDetail.css";
const ProductDetails = ({
  quantity,
  productDetail,
  incrementQuantity,
  decrementQuantity,
}) => {
  const [mainImage, setMainImage] = useState("");
  const changeImage = (image) => {
    setMainImage(image);
  };

  return (
    <main className="product-page" >
      <div className="productDetail-container">
        <div className="product-images">
          <img
            id="main-image"
            src={
              productDetail.productimage[0].filename.startsWith("https")
                ? productDetail.productimage[0].filename
                : `${process.env.REACT_APP_API_URL_LOCAL}/${productDetail.productimage[0].filename}`
            }
            alt="Main Product"
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            {productDetail.productimage?.map((image, index) => (
              <div key={index} className="thumbnail-container">
                <img
                  className="thumbnail"
                  src={
                    image.filename.startsWith("https")
                      ? image.filename
                      : `${process.env.REACT_APP_API_URL_LOCAL}/${image.filename}`
                  }
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() =>
                    changeImage(
                      image.filename.startsWith("https")
                        ? image.filename
                        : `${process.env.REACT_APP_API_URL_LOCAL}/${image.filename}`
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <span className="company-name">
            {process.env.REACT_APP_SHOP_NAME}
          </span>
          <h1 className="product-title">{productDetail.title}</h1>
          <p className="product-description">{productDetail.desc}</p>
          <div className="product-price">
            <span className="current-price">₹{productDetail.price}</span>
            <span className="discount">{process.env.REACT_APP_DISCOUNT}%</span>
            <span className="original-price">
              ₹{productDetail.price * process.env.REACT_APP_DISCOUN_MULTIPLE}
            </span>
          </div>
          <div className="cart-controls">
            <button
              disabled={quantity === 0 || productDetail.stock === 0}
              onClick={decrementQuantity}
              className="quantity-btn"
            >
              -
            </button>
            <span id="quantity">
              {productDetail.stock === 0 ? "Out of Stock" : quantity}
            </span>
            <button
              disabled={productDetail.stock === 0 || quantity === 0}
              className="quantity-btn"
              onClick={incrementQuantity}
            >
              +
            </button>
            <button
              disabled={productDetail.stock === 0 || quantity === 0}
              className="add-to-cart-btn"
            >
              <img src={AddToCart} alt="Cart Icon" style={{width:"30px",height:"30px"}} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;


