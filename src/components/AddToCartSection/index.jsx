import React from "react";
import "./addToCart.css";
import nodata from "../../animation/nodata.gif";

const AddToCartSection = ({
  total,
  cartItems,
  removeItem,
  updateQuantity,
  handleClickToBilling,
}) => {
  return (
    <section className="cart-container gradient-custom">
      <div className="container py-2">
        <div className="row d-flex justify-content-center my-4">
          {cartItems.length === 0 ? (
            <div
              className="text-center"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={nodata}
                alt="No items in cart"
                style={{
                  width: "600px",
                  height: "600px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  borderRadius: "8px",
                }}
              />
            </div>
          ) : (
            <>
              <div className="col-md-8">
                <div className="scrollable-div">
                  {cartItems.map((item) => (
                    <div
                      className="card mb-1"
                      key={item.id}
                      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            <div className="bg-image hover-overlay hover-zoom ripple rounded">
                              <img
                                src={
                                  item?.productimage[0]?.filename?.startsWith(
                                    "https"
                                  )
                                    ? item?.productimage[0]?.filename
                                    : `${process.env.REACT_APP_API_URL_LOCAL}/${item?.productimage[0]?.filename}`
                                }
                                alt="Product"
                                className="w-100"
                              />
                            </div>
                          </div>

                          <div
                            className="col-lg-5 col-md-6 mb-4 mb-lg-0"
                            style={{ marginTop: "0px" }}
                          >
                            <div
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <strong>{item.title}</strong>
                            </div>

                            <p
                              style={{
                                fontSize: "15px",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                WebkitLineClamp: 3,
                                textOverflow: "ellipsis",
                                marginTop: "8px",
                              }}
                            >
                              {item.desc}
                            </p>
                            <p className="d-none">Color: {item.color}</p>
                            <p className="d-none">Size: {item.size}</p>
                            <p className="text-start">
                              <strong>₹{item.price}</strong>
                            </p>
                            <button
                              type="button"
                              className="btn  btn-sm me-1"
                              style={{
                                backgroundColor: "#f46677",
                                borderColor: "#f46677",
                                color: "white",
                              }}
                              onClick={() => removeItem(item.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>

                          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div
                              className="d-flex mb-4 justify-content-lg-end justify-content-md-start"
                              style={{ maxWidth: "200px" }}
                            >
                              <button
                                className="btn  px-3 me-2"
                                style={{
                                  backgroundColor: "#13a0a8",
                                  borderColor: "#13a0a8",
                                  color: "white",
                                }}
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <i className="fas fa-minus"></i>
                              </button>

                              <input
                                type="number"
                                className="form-control text-center"
                                value={item.quantity}
                                readOnly
                              />

                              <button
                                className="btn  px-3 ms-2"
                                style={{
                                  backgroundColor: "#13a0a8",
                                  borderColor: "#13a0a8",
                                  color: "white",
                                }}
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">
                      Price Details ({cartItems.length} items)
                    </h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        <span>Actual Product Price:</span>
                        <span>
                          ₹
                          {cartItems
                            .reduce(
                              (total, item) =>
                                total + item.price * item.quantity,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Discounts:
                        <span style={{ color: "green" }}>
                          - ₹
                          {Math.floor(
                            cartItems.reduce(
                              (total, item) =>
                                total + item.price * item.quantity,
                              0
                            ) * 0.27
                          )}
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>
                            ₹
                            {(
                              cartItems.reduce(
                                (total, item) =>
                                  total + item.price * item.quantity,
                                0
                              ) -
                              cartItems.reduce(
                                (total, item) =>
                                  total + item.price * item.quantity,
                                0
                              ) *
                                0.27
                            ).toFixed(2)}
                          </strong>
                        </span>
                      </li>
                    </ul>

                    <button
                      type="button"
                      className="btn  btn-lg btn-block"
                      onClick={handleClickToBilling}
                      style={{
                        backgroundColor: "#13a0a8",
                        borderColor: "#13a0a8",
                        color: "white",
                      }}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddToCartSection;
