import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getOneFetchByUrl } from "../api/Api";

const CartPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const handleClickToBilling = () => {
    if (cartItems.length) {
      navigate(`/billing`);
      return;
    }

    alert("No Item Added");
  };

  useEffect(() => {
    const validateCartStock = async () => {
      const validatedCart = await Promise.all(
        cartItems.map(async (item) => {
          const response = await getOneFetchByUrl(
            `${process.env.REACT_APP_API_URL_LOCAL}/product/productDetail?productId=${item?.id}`
          );
          console.log("response", response);
          const { stock } = response?.data[0];

          if (stock === 0) {
            alert(
              `The product "${item?.title}" is out of stock and has been removed.`
            );
            return null;
          }
          if (item?.quantity > stock) {
            alert(
              `The quantity for "${item?.title}" has been updated to the available stock (${stock}).`
            );
            return { ...item, quantity: stock };
          }
          return item;
        })
      );

      setCartItems(validatedCart?.filter(Boolean));
    };

    validateCartStock();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, increment) => {
    setCartItems((prevItems) =>
      prevItems
        ?.map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + increment;
            if (newQuantity > item.stock) {
              alert(`Only ${item.stock} items are available in stock.`);
              return item;
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="main-container">
      <Box className="content">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* <Typography
              variant="h5"
              gutterBottom
              style={{ margin: "0 0 0 65px" }}
            >
              Product Details
            </Typography> */}
            {cartItems?.length ? (
              cartItems?.map((elem) => {
                console.log("elem", elem);
                return (
                  <Card
                    key={elem.id}
                    sx={{
                      maxWidth: 850,
                      margin: "20px auto",
                      borderRadius: "12px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      p: 2,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "24px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={
                          elem?.productimage[0]?.filename?.startsWith("https")
                            ? elem?.productimage[0]?.filename
                            : `${process.env.REACT_APP_API_URL_LOCAL}/${elem?.productimage[0]?.filename}`
                        }
                        alt="Product"
                        style={{
                          flex: "0 0 150px",
                          width: "150px",
                          height: "170px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      <div style={{ flex: "1" }}>
                        <h3
                          style={{
                            margin: "5px 0 20px 0",
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#333",
                          }}
                        >
                          {elem?.title}
                        </h3>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            fontSize: "16px",
                            color: "grey",
                          }}
                        >
                          {elem?.desc}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <p
                              style={{
                                margin: "20px 0",
                                fontSize: "16px",
                                color: "#d32f2f",
                                fontWeight: "bold",
                              }}
                            >
                              ₹{elem?.price}
                            </p>
                            <p
                              style={{
                                margin: "15px 0",
                                fontSize: "14px",
                                color: "#555",
                              }}
                            >
                              Delivery in Few Minutes |{" "}
                              <span
                                style={{ color: "green", fontWeight: "bold" }}
                              >
                                Free
                              </span>
                            </p>
                          </div>
                          <div style={{ marginRight: "40px" }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: "24px",
                                flexWrap: "wrap",
                                gap: "16px",
                              }}
                            >
                              <button
                                onClick={() => updateQuantity(elem?.id, -1)}
                                style={{
                                  border: "1px solid #ddd",
                                  borderRadius: "5%",
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor: "#f4f4f4",
                                  fontSize: "18px",
                                  cursor: "pointer",
                                }}
                              >
                                -
                              </button>
                              <span>{elem?.quantity}</span>
                              <button
                                onClick={() => updateQuantity(elem?.id, 1)}
                                style={{
                                  border: "1px solid #ddd",
                                  borderRadius: "5%",
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor: "#f4f4f4",
                                  fontSize: "18px",
                                  cursor: "pointer",
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <Typography
                variant="h5"
                gutterBottom
                style={{ margin: "0 0 0 65px" }}
              >
                No Products
              </Typography>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              position: { md: "sticky" },
              bottom: { xs: "0", md: "unset" },
              top: { md: "80px" },
              width: { xs: "100%", md: "auto" },
              zIndex: { xs: 1000, md: "auto" },
              backgroundColor: { xs: "#fff", md: "inherit" },
              height: "fit-content",
              boxShadow: { xs: "0 -2px 5px rgba(0,0,0,0.2)", md: "none" },
              padding: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontFamily: "'Arial', sans-serif",
                fontSize: "22px",
                marginBottom: "16px",
              }}
            >
              Price Details ({cartItems?.length} Items)
            </Typography>
            <Paper
              className="price-details-paper"
              sx={{ p: 2, borderRadius: "12px" }}
            >
              <Typography
                className="price-details-typography"
                sx={{
                  mb: 2,
                  fontFamily: "'Arial', sans-serif",
                  fontSize: "16px",
                }}
              >
                <span>Actual Product Price:</span>
                <span>
                  ₹{Math.floor(total * process.env.REACT_APP_DISCOUN_MULTIPLE)}
                </span>
              </Typography>

              <Typography
                className="price-details-typography"
                color="success.main"
                sx={{
                  mb: 2,
                  fontFamily: "'Arial', sans-serif",
                  fontSize: "16px",
                }}
              >
                <span>Discounts:</span>
                <span>
                  - ₹
                  {Math.floor(
                    total * process.env.REACT_APP_DISCOUN_MULTIPLE - total
                  )}
                </span>
              </Typography>

              <Typography
                className="price-details-typography"
                sx={{
                  mb: 2,
                  fontFamily: "'Arial', sans-serif",
                  fontSize: "16px",
                }}
              >
                <span>Total Product Price:</span>
                <span>₹{total}</span>
              </Typography>
              <hr />
              <Typography
                className="price-details-bold"
                sx={{
                  mb: 2,
                  fontFamily: "'Arial', sans-serif",
                  fontSize: "18px",
                }}
              >
                <span>Order Total:</span>
                <span>₹{total}</span>
              </Typography>
            </Paper>
            <Button
              variant="contained"
              color="primary"
              className="continue-button"
              sx={{
                width: "100%",
                mt: 3,
                fontFamily: "'Arial', sans-serif",
                fontSize: "16px",
              }}
              onClick={handleClickToBilling}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CartPage;
