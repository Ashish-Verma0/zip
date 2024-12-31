// import React, { useState, useRef, useEffect } from "react";
// import { Box, Typography, Grid, Button, IconButton } from "@mui/material";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination } from "swiper/modules";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useLocalStorage } from "react-use";
// import RelevantSection from "../components/RelevantSection";
// import { getOneFetchByUrl } from "../api/Api";

// const ProductDetailPage = () => {
//   const [quantity, setQuantity] = useState(0);
//   const [cart, setCart] = useLocalStorage("cart", []);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { data: productDetail = {}, isLoading: loadingProductDetail } =
//     useQuery({
//       queryKey: [
//         "productDetail",
//         process.env.REACT_APP_SHOP_NAME,
//         location.state.id,
//       ],
//       queryFn: async () => {
//         const response = await getOneFetchByUrl(
//           `${process.env.REACT_APP_API_URL_LOCAL}/product/productDetail?productId=${location.state.id}`
//         );
//         return response?.data[0] || {};
//       },
//       enabled: !!location.state.id,
//     });

//   const incrementQuantity = () => {
//     if (quantity < productDetail.stock) {
//       setQuantity(quantity + 1);
//     } else {
//       alert("Insufficient quantity available.");
//     }
//   };

//   const decrementQuantity = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const handleAddToCart = () => {
//     if (quantity > 0 && quantity <= productDetail.stock) {
//       const updatedCart = cart.map((item) =>
//         item.id === productDetail.id ? { ...item, quantity } : item
//       );
//       if (!cart.some((item) => item.id === productDetail.id)) {
//         updatedCart.push({ ...productDetail, quantity });
//       }
//       setCart(updatedCart);
//       alert(`Added ${quantity} item(s) to the cart.`);
//     } else {
//       alert("Please select a valid quantity.");
//     }
//   };

//   useEffect(() => {
//     const cartProduct = cart.find((item) => item.id === productDetail.id);
//     if (cartProduct) {
//       setQuantity(cartProduct.quantity);
//     } else {
//       setQuantity(0);
//     }
//   }, [cart, productDetail.id]);

//   return (
//     <Box sx={{ maxWidth: "1200px", margin: "0 auto" }}>
//       <Grid container style={{ padding: 20 }} spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Swiper
//             modules={[Navigation, Pagination]}
//             navigation
//             pagination={{ clickable: true }}
//             loop
//             style={{ width: "100%" }}
//           >
//             {productDetail.productimage?.map((image, index) => (
//               <SwiperSlide key={index}>
//                 <Box
//                   component="img"
//                   src={`${
//                     image.filename.startsWith("https")
//                       ? image.filename
//                       : `${process.env.REACT_APP_API_URL_LOCAL}/${image.filename}`
//                   }`}
//                   alt={`Product Image ${index + 1}`}
//                   sx={{ width: "100%", height: "400px", borderRadius: 2 }}
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Typography variant="subtitle2" sx={{ color: "gray", mb: 1, mt: 3 }}>
//             {process.env.REACT_APP_SHOP_NAME}
//           </Typography>
//           <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
//             {productDetail.title}
//           </Typography>
//           <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
//             {productDetail.desc}
//           </Typography>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <IconButton
//               color="primary"
//               disabled={quantity === 0 || productDetail.stock === 0}
//               onClick={decrementQuantity}
//             >
//               <RemoveIcon />
//             </IconButton>
//             <Typography variant="h6">
//               {productDetail.stock === 0 ? "Out of Stock" : quantity}
//             </Typography>
//             <IconButton
//               color="primary"
//               disabled={productDetail.stock === 0}
//               onClick={incrementQuantity}
//             >
//               <AddIcon />
//             </IconButton>
//             <Button
//               variant="contained"
//               color="primary"
//               disabled={productDetail.stock === 0 || quantity === 0}
//               onClick={handleAddToCart}
//             >
//               <AddShoppingCartIcon /> Add to Cart
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>

//       <Box>
//         <RelevantSection location={location} />
//       </Box>
//     </Box>
//   );
// };

// export default React.memo(ProductDetailPage);

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "react-use";
import RelevantSection from "../components/RelevantSection";
import { getOneFetchByUrl } from "../api/Api";

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useLocalStorage("cart", []);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch product details with error handling
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

  // Fallback UI for no data or error
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
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
            {productDetail.productimage?.map((image, index) => (
              <SwiperSlide key={index}>
                <Box
                  component="img"
                  src={`${
                    image.filename.startsWith("https")
                      ? image.filename
                      : `${process.env.REACT_APP_API_URL_LOCAL}/${image.filename}`
                  }`}
                  alt={`Product Image ${index + 1}`}
                  sx={{ width: "100%", height: "400px", borderRadius: 2 }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" sx={{ color: "gray", mb: 1, mt: 3 }}>
            {process.env.REACT_APP_SHOP_NAME}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
              maxWidth: "100%", // Ensure title doesn't overflow
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap", // Ensure title wraps when needed
            }}
          >
            {productDetail.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
            {productDetail.desc}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="primary"
              disabled={quantity === 0 || productDetail.stock === 0}
              onClick={decrementQuantity}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6">
              {productDetail.stock === 0 ? "Out of Stock" : quantity}
            </Typography>
            <IconButton
              color="primary"
              disabled={productDetail.stock === 0}
              onClick={incrementQuantity}
            >
              <AddIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              disabled={productDetail.stock === 0 || quantity === 0}
              onClick={handleAddToCart}
            >
              <AddShoppingCartIcon /> Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box>
        <RelevantSection location={location} />
      </Box>
    </Box>
  );
};

export default React.memo(ProductDetailPage);
