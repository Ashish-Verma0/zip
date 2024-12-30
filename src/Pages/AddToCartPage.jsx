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
// import "./AddToCart.css";

const CartPage = () => {
  const navigate = useNavigate();
  const handleClickToBilling = () => {
    navigate(`/billing`);
  };

  // Dummy data for cart items
  const dummyCartItems = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    price: (Math.random() * 100).toFixed(2),
    stock: Math.floor(Math.random() * 10) + 1,
    quantity: 1,
    desc: `Description for Product ${index + 1}`,
    productimage: [
      { filename: `../assets/images/products/jacket-${(index % 3) + 1}.jpg` },
    ],
  }));

  const [cartItems, setCartItems] = useState(dummyCartItems);

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
            {cartItems?.map((elem) => {
              return (
                <Card
                  key={elem.id}
                  sx={{
                    maxWidth: 850,
                    margin: "20px auto",
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    p: 2,
                    position: "relative",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "20px",
                  }}
                >
                  <img
                    src={elem.productimage[0].filename}
                    alt="Product"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "18px", sm: "20px" },
                        fontWeight: 600,
                        color: "#333",
                      }}
                    >
                      {elem.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "14px", sm: "16px" },
                        color: "gray",
                        marginTop: "10px",
                      }}
                    >
                      {elem.desc}
                    </Typography>
                    <div style={{ marginTop: "20px" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "16px", sm: "18px" },
                          color: "#d32f2f",
                          fontWeight: "bold",
                        }}
                      >
                        ₹{elem.price}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "14px", sm: "16px" },
                          color: "gray",
                        }}
                      >
                        Delivery in Few Minutes |{" "}
                        <span style={{ color: "green" }}>Free</span>
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginTop: "16px",
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(elem.id, -1)}
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "5px",
                            border: "1px solid #ddd",
                            fontSize: "20px",
                            cursor: "pointer",
                            backgroundColor: "#f4f4f4",
                          }}
                        >
                          -
                        </button>
                        <span>{elem.quantity}</span>
                        <button
                          onClick={() => updateQuantity(elem.id, 1)}
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "5px",
                            border: "1px solid #ddd",
                            fontSize: "20px",
                            cursor: "pointer",
                            backgroundColor: "#f4f4f4",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </Grid>

          {/* Price Summary */}
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
                fontSize: { xs: "18px", sm: "22px" },
                marginBottom: "16px",
              }}
            >
              Price Details ({cartItems.length} Items)
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
                  fontSize: { xs: "14px", sm: "16px" },
                }}
              >
                <span>Actual Product Price:</span>
                <span>₹{Math.floor(total)}</span>
              </Typography>

              <Typography
                className="price-details-typography"
                color="success.main"
                sx={{
                  mb: 2,
                  fontFamily: "'Arial', sans-serif",
                  fontSize: { xs: "14px", sm: "16px" },
                }}
              >
                <span>Discounts:</span>
                <span>- ₹{(total * 0.1).toFixed(2)}</span>
              </Typography>

              <Typography
                className="price-details-typography"
                sx={{
                  fontFamily: "'Arial', sans-serif",
                  fontSize: { xs: "14px", sm: "16px" },
                }}
              >
                <span>Total Payable:</span>
                <span>₹{(total - total * 0.1).toFixed(2)}</span>
              </Typography>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleClickToBilling}
              >
                Proceed to Billing
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CartPage;
