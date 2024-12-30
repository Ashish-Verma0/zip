import React, { useState } from "react";
import { Box, Typography, Grid, Button, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RelevantSection from "../components/RelevantSection";
import { useNavigate } from "react-router-dom";

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(0);

  // Dummy product data
  const productDetail = {
    id: 1,
    title: "Stylish Jacket",
    desc: "This stylish jacket is perfect for any occasion. Made with high-quality materials.",
    stock: 10,
    productimage: [
      { filename: "/assets/images/products/1.jpg" },
      { filename: "/assets/images/products/image2.png" },
    ],
  };
  const navigate = useNavigate();
  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Grid container style={{ padding: 20 }} spacing={2}>
        <Grid item xs={12} md={6}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            style={{ width: "100%" }}
          >
            {productDetail.productimage.map((image, index) => (
              <SwiperSlide key={index}>
                <Box
                  component="img"
                  src={image.filename}
                  alt={`Product Image ${index + 1}`}
                  sx={{ width: "100%", height: "400px", borderRadius: 2 }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" sx={{ color: "gray", mb: 1, mt: 3 }}>
            Shop Name
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            {productDetail.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
            {productDetail.desc}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="primary"
              disabled={quantity === 0 || productDetail.stock === 0}
              onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6">{quantity}</Typography>
            <IconButton
              color="primary"
              disabled={productDetail.stock === 0}
              onClick={() => setQuantity(quantity + 1)}
            >
              <AddIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              disabled={productDetail.stock === 0 || quantity === 0}
              onClick={() => navigate("/add")}
            >
              <AddShoppingCartIcon /> Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box>
        <RelevantSection />
      </Box>
    </Box>
  );
};

export default React.memo(ProductDetailPage);
