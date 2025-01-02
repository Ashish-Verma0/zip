import React, { useState, useEffect, useRef } from "react";
import AddToCart from "../../images/AddToCart.png";
import { Box, Grid, Typography, Button, IconButton } from "@mui/material";

const ProductDetails = ({
  quantity,
  productDetail,
  incrementQuantity,
  decrementQuantity,
}) => {
  const [mainImage, setMainImage] = useState(
    productDetail.productimage[0]?.filename || ""
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    if (descRef.current) {
      const { scrollHeight, clientHeight } = descRef.current;
      setShowToggle(scrollHeight > clientHeight);
    }
  }, [productDetail.desc]);

  const changeImage = (image) => {
    setMainImage(image);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <Grid container spacing={2}>
        {/* Product Images Section */}
        <Grid item lg={3.5} sm={5} xs={12}>
          <Box>
            <img
              src={
                mainImage.startsWith("https")
                  ? mainImage
                  : `${process.env.REACT_APP_API_URL_LOCAL}/${mainImage}`
              }
              alt="Main Product"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "8px",
              }}
            />
            <Grid container spacing={1} sx={{ marginTop: 1 }}>
              {productDetail.productimage?.map((image, index) => (
                <Grid item key={index}>
                  <img
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
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "transform 0.3s",
                      border:
                        mainImage === image.filename
                          ? "2px solid orange"
                          : "none",
                      transform: "scale(1)",
                      margin: "0 4px",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Product Info Section */}
        <Grid item lg={8.5} sm={7} xs={12}>
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "orange",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              Sneaker Company
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginTop: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "95%",
              }}
            >
              {productDetail.title || "Fall Limited Edition Sneakers"}
            </Typography>

            <div>
              <Typography
                variant="body2"
                ref={descRef}
                sx={{
                  color: "gray",
                  marginTop: 1,
                  lineHeight: 1.6,
                  whiteSpace: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: isExpanded ? "none" : 3,
                  WebkitBoxOrient: "vertical",
                  maxWidth: "95%",
                  transition: "max-height 0.3s",
                }}
              >
                {productDetail?.desc ||
                  "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer."}
              </Typography>
              {showToggle && (
                <span
                  style={{
                    color: "gray",
                    cursor: "pointer",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    marginTop: "4px",
                  }}
                  onClick={handleToggle}
                >
                  {isExpanded ? "Show less" : "... more"}
                </span>
              )}
            </div>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                marginTop: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "green" }}
              >
                ${productDetail.price || ""}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "orange",
                  backgroundColor: "#fff4e6",
                  padding: "2px 8px",
                  borderRadius: 1,
                  fontWeight: "bold",
                }}
              >
                {productDetail.discount || ""}%
              </Typography>
              <Typography
                variant="body2"
                sx={{ textDecoration: "line-through", color: "gray" }}
              >
                ${productDetail.originalPrice || ""}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                marginTop: 2,
              }}
            >
              <IconButton
                disabled={quantity === 0 || productDetail.stock === 0}
                onClick={decrementQuantity}
                sx={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: 1,
                  fontSize: 18,
                }}
              >
                -
              </IconButton>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {productDetail.stock === 0 ? "Out of Stock" : quantity}
              </Typography>
              <IconButton
                disabled={productDetail.stock === 0 || quantity === 0}
                onClick={incrementQuantity}
                sx={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: 1,
                  fontSize: 18,
                }}
              >
                +
              </IconButton>

              <Button
                variant="contained"
                color="warning"
                disabled={productDetail.stock === 0 || quantity === 0}
                startIcon={
                  <img
                    src={AddToCart}
                    alt="Cart Icon"
                    style={{ width: 30, height: 30 }}
                  />
                }
                sx={{
                  padding: "6px 16px",
                  textTransform: "none",
                  fontWeight: "bold",
                  boxShadow: "0 5px 10px rgba(255, 165, 0, 0.3)",
                  "&:hover": { backgroundColor: "darkorange" },
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
