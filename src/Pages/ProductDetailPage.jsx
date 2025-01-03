import React, { useState, useEffect } from "react";
import ProductDetails from "../components/ProductDetails";
import RelevantSection from "../components/RelevantSection";
import {
  Box,
  Grid,
  Typography,
  Skeleton,
} from "@mui/material";
import { useLocalStorage } from "react-use";
import { getOneFetchByUrl } from "../api/Api";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useLocalStorage("cart", []);
  const location = useLocation();

  const {
    data: productDetail = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "productDetail",
      process.env.REACT_APP_SHOP_NAME,
      location.state?.id,
    ],
    queryFn: async () => {
      if (!location.state?.id) {
        throw new Error("Product ID is missing");
      }
      const response = await getOneFetchByUrl(
        `${process.env.REACT_APP_API_URL_LOCAL}/product/productDetail?productId=${location.state.id}`
      );
      return response?.data[0] || {};
    },
    enabled: !!location.state?.id,
  });

  const incrementQuantity = () => {
    if (quantity < productDetail.stock) {
      setQuantity(quantity + 1);
    } else {
      alert("Insufficient quantity available.");
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= productDetail.stock) {
      const updatedCart = cart.map((item) =>
        item.id === productDetail.id ? { ...item, quantity } : item
      );
      if (!cart.some((item) => item.id === productDetail.id)) {
        updatedCart.push({ ...productDetail, quantity });
      }
      setCart(updatedCart);
      alert(`Added ${quantity} item(s) to the cart.`);
    } else {
      alert("Please select a valid quantity.");
    }
  };

  useEffect(() => {
    const cartProduct = cart.find((item) => item.id === productDetail.id);
    if (cartProduct) {
      setQuantity(cartProduct.quantity);
    } else {
      setQuantity(0);
    }
  }, [cart, productDetail.id]);

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item lg={3.5} sm={5} xs={12}>
            <Skeleton
              variant="rectangular"
              height={300}
              sx={{ borderRadius: 2 }}
            />
            <Grid container spacing={1} sx={{ marginTop: 1 }}>
              {[...Array(4)].map((_, index) => (
                <Grid item key={index}>
                  <Skeleton variant="rounded" width={50} height={50} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item lg={8.5} sm={7} xs={12}>
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton
              variant="text"
              width="80%"
              height={40}
              sx={{ marginTop: 1 }}
            />
            <Skeleton
              variant="text"
              width="100%"
              height={20}
              sx={{ marginTop: 2 }}
            />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="85%" height={20} />

            <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
              <Skeleton variant="rounded" width={60} height={30} />
              <Skeleton variant="rounded" width={80} height={30} />
              <Skeleton variant="rounded" width={100} height={30} />
            </Box>

            <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rounded" width={140} height={40} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (isError || !productDetail?.id) {
    return (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <Typography variant="h4" color="text.secondary">
          No Data Found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", }}>
      <Grid container style={{ padding: 20 }} spacing={2}>
        <Grid item lg={12} sm={12} xs={12}>
          <ProductDetails
            quantity={quantity}
            productDetail={productDetail}
            handleAddToCart={handleAddToCart}
            decrementQuantity={decrementQuantity}
            incrementQuantity={incrementQuantity}
          />
          <RelevantSection location={location} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default React.memo(ProductDetailPage);
