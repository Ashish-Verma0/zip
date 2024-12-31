// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Button,
//   Paper,
//   Card,
//   Divider,
//   CardMedia,
//   AppBar,
//   Toolbar,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import BillingModal from "../components/BillingModal";

// import location3 from "../animation/location3.gif";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { postFetchData } from "../api/Api";
// import { useNavigate } from "react-router-dom";
// import BillingAddAddress from "../components/BillingAddress";

// const BillingPage = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCart = localStorage.getItem("cart");
//     return storedCart ? JSON.parse(storedCart) : [];
//   });
//   const userDeatils = localStorage.getItem("token");
//   const userDeatilData = JSON.parse(userDeatils);
//   const [addressDrawerOpen, setAddressDrawerOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const addressesData = localStorage.getItem("addresses");
//   const addresses = JSON.parse(addressesData);

//   const handleOpenDrawer = () => {
//     setAddressDrawerOpen(true);
//   };
//   const handeCloseDrawer = () => {
//     setAddressDrawerOpen(false);
//   };

//   const handleModalOpen = () => {
//     setModalOpen(true);
//   };
//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

//   const data = {
//     orderedItem: cartItems.map((elem) => ({
//       productId: elem.id,
//       quantity: elem.quantity,
//     })),
//     address: addresses,
//     transactionId: "cashOnDelivery",
//     shopName: process.env.REACT_APP_SHOP_NAME || "Unknown Shop",
//     userId: userDeatilData?.user?.id || null,
//     subTotal: (
//       Number(subtotal || 0) +
//       Number(addresses?.sellerLocation?.deliveryPrice || 0)
//     ).toString(),
//     deliveryPrice: Number(addresses?.sellerLocation?.deliveryPrice || 0),
//   };

//   const queryClient = useQueryClient();

//   const createOrderMutation = useMutation({
//     mutationFn: async (data) => {
//       const res = await postFetchData(
//         `${process.env.REACT_APP_API_URL_LOCAL}/order/create`,
//         data
//       );
//       return res.data.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["OrderDetails", userDeatilData?.user?.id]);
//       alert("Order created successfully");
//       navigate("/orders");
//     },
//     onError: (error) => {
//       alert("Something went wrong");
//       console.error("Error creating order:", error);
//     },
//   });

//   const handlePlaceOrder = () => {
//     createOrderMutation.mutate(data);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "79.7vh",
//         bgcolor: "#f5f5f5",
//         py: 4,
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           width: "100%",
//           maxWidth: 1200,
//           mx: "auto",
//           p: 3,
//           borderRadius: 2,
//           flex: 1,
//         }}
//       >
//         <AppBar position="static" sx={{ mb: 2 }}>
//           <Toolbar>
//             <Typography variant="h6" sx={{ flexGrow: 1 }}>
//               Billing Here
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Grid container spacing={4}>
//           {/* My Cart Section */}
//           <Grid item xs={12} md={6}>
//             <Box
//               sx={{
//                 height: "370px",
//                 overflowY: "auto",
//                 borderRadius: 3,
//                 padding: 1,
//                 backgroundColor: "#f9f9f9",
//                 "&::-webkit-scrollbar": {
//                   width: "8px",
//                 },
//                 "&::-webkit-scrollbar-thumb": {
//                   backgroundColor: "#888",
//                   borderRadius: "4px",
//                 },
//                 "&::-webkit-scrollbar-thumb:hover": {
//                   backgroundColor: "#555",
//                 },
//                 "&::-webkit-scrollbar-track": {
//                   backgroundColor: "#eee",
//                   borderRadius: "4px",
//                 },
//               }}
//             >
//               {cartItems?.map((item) => (
//                 <Card
//                   key={item?.id}
//                   variant="outlined"
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     p: 1.5,
//                     mb: 2,
//                     maxWidth: "100%",
//                     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                     borderRadius: 2,
//                   }}
//                 >
//                   {/* Product Image */}

//                   {item.productimage[0].filename.startsWith("https") ? (
//                     <CardMedia
//                       component="img"
//                       sx={{
//                         width: 50,
//                         height: 50,
//                         borderRadius: 1,
//                         objectFit: "cover",
//                       }}
//                       image={`${item.productimage[0].filename}`}
//                       alt={item?.title}
//                     />
//                   ) : (
//                     <CardMedia
//                       component="img"
//                       sx={{
//                         width: 50,
//                         height: 50,
//                         borderRadius: 1,
//                         objectFit: "cover",
//                       }}
//                       image={`${process.env.REACT_APP_API_URL_LOCAL}/${item.productimage[0].filename}`}
//                       alt={item?.title}
//                     />
//                   )}

//                   {/* Product Details */}
//                   <Box sx={{ flex: 1, ml: 2 }}>
//                     <Typography variant="subtitle2" fontWeight="bold" noWrap>
//                       {item.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Qty: {item.quantity}
//                     </Typography>
//                   </Box>

//                   {/* Price and Star Rating */}
//                   <Box sx={{ textAlign: "right" }}>
//                     <Typography
//                       variant="subtitle1"
//                       fontWeight="bold"
//                       color="primary"
//                     >
//                       ₹{item.price}
//                     </Typography>
//                   </Box>
//                 </Card>
//               ))}
//             </Box>
//           </Grid>

//           {/* Billing Details Section */}
//           <Grid item xs={12} md={6}>
//             <Box
//               sx={{
//                 backgroundColor: "#f9fbff",
//                 p: 2,
//                 borderRadius: "8px",
//                 boxShadow: 1,
//                 height: "100%",
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: { xs: "flex-start", sm: "space-between" },
//                   flexDirection: { xs: "column", sm: "row" },
//                   gap: 1,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     width: { xs: "100%", sm: "auto" },
//                     justifyContent: { xs: "center", sm: "flex-start" },
//                   }}
//                 >
//                   <img
//                     src={location3}
//                     alt="Location"
//                     style={{
//                       width: "22px",
//                       height: "22px",
//                       objectFit: "cover",
//                       borderRadius: "50%",
//                       marginRight: "8px",
//                     }}
//                   />
//                   <Typography
//                     variant="h6"
//                     fontWeight="bold"
//                     sx={{
//                       textAlign: { xs: "center", sm: "left" },
//                     }}
//                   >
//                     Delivering to Home
//                   </Typography>
//                 </Box>

//                 {/* Add New Address Button */}
//                 <Button
//                   variant="outlined"
//                   startIcon={<AddIcon />}
//                   onClick={handleOpenDrawer}
//                   sx={{
//                     textTransform: "capitalize",
//                     fontSize: "14px",
//                     borderRadius: "8px",
//                     width: { xs: "100%", sm: "auto" },
//                     mt: { xs: 1, sm: 0 },
//                   }}
//                 >
//                   Add New Address
//                 </Button>
//               </Box>

//               {addresses?.id ? (
//                 <Box ml={1}>
//                   <Typography>{addresses.name}</Typography>
//                   <Typography>
//                     {addresses.fullAddress}, {addresses.city}, {addresses.state}{" "}
//                     - {addresses.pincode}
//                   </Typography>
//                   <Typography>Mobile: {addresses.phoneNumber}</Typography>
//                 </Box>
//               ) : (
//                 <Typography ml={1}>No addresses selected.</Typography>
//               )}

//               <Divider sx={{ my: 2 }} />
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 Bill details
//               </Typography>
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={1}
//               >
//                 <Typography>Items total</Typography>
//                 <Typography>₹{subtotal.toFixed(2)}</Typography>
//               </Box>
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={1}
//               >
//                 <Typography>Delivery charge</Typography>
//                 <Typography color="success.main" fontWeight="bold">
//                   ₹{addresses?.sellerLocation?.deliveryPrice || "FREE"}
//                 </Typography>
//               </Box>
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={1}
//               >
//                 <Typography>Total Pay</Typography>
//                 <Typography>
//                   ₹
//                   {Number(subtotal) +
//                     Number(addresses?.sellerLocation?.deliveryPrice)}
//                 </Typography>
//               </Box>
//               <Box
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 mb={1}
//               >
//                 <Typography>Tip for your delivery partner</Typography>
//                 <Typography color="success.main" fontWeight="bold">
//                   Optional (₹10)
//                 </Typography>
//               </Box>

//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 sx={{
//                   height: 50,
//                   mt: 3,
//                   borderRadius: "10px",
//                   fontSize: "17px",
//                   textTransform: "capitalize",
//                 }}
//                 onClick={handlePlaceOrder}
//               >
//                 Place Order
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* ADD Address Modal */}
//       <BillingModal modalOpen={modalOpen} handleModalClose={handleModalClose} />
//       {/* Address Modal */}
//       <BillingAddAddress
//         addresses={addresses}
//         close={handeCloseDrawer}
//         handleModalOpen={handleModalOpen}
//         setAddressDrawerOpen={setAddressDrawerOpen}
//         open={addressDrawerOpen}
//       />
//     </Box>
//   );
// };

// export default BillingPage;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Card,
  Divider,
  CardMedia,
  AppBar,
  Toolbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BillingModal from "../components/BillingModal";
import location3 from "../animation/location3.gif";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFetchData } from "../api/Api";
import { useNavigate } from "react-router-dom";
import BillingAddAddress from "../components/BillingAddress";

const BillingPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Local states
  const [cartItems, setCartItems] = useState([]);
  const [userDeatilData, setUserDeatilData] = useState(null);
  const [addressDrawerOpen, setAddressDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [hide, setHide] = useState(false);
  // const [adaddressesdresses, setAddresses] = useState(null);

  let addressesData, addresses;
  addressesData = localStorage.getItem("addresses");
  addresses = JSON.parse(addressesData);
  // Fetch localStorage data
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      setCartItems(storedCart ? JSON.parse(storedCart) : []);

      const userDetails = localStorage.getItem("token");
      setUserDeatilData(userDetails ? JSON.parse(userDetails) : null);

      // setAddresses(addressesData ? JSON.parse(addressesData) : null);
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }, []);

  // Calculate subtotal safely
  const subtotal = cartItems?.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  const handleOpenDrawer = () => setAddressDrawerOpen(true);
  const handeCloseDrawer = () => setAddressDrawerOpen(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // Prepare order data
  const data = {
    orderedItem:
      cartItems?.map((elem) => ({
        productId: elem?.id,
        quantity: elem?.quantity,
      })) || [],
    address: addresses || {},
    transactionId: "cashOnDelivery",
    shopName: process.env.REACT_APP_SHOP_NAME || "Unknown Shop",
    userId: userDeatilData?.user?.id || null,
    subTotal: (
      Number(subtotal || 0) +
      Number(addresses?.sellerLocation?.deliveryPrice || 0)
    ).toString(),
    deliveryPrice: Number(addresses?.sellerLocation?.deliveryPrice || 0),
  };

  const createOrderMutation = useMutation({
    mutationFn: async (data) => {
      const res = await postFetchData(
        `${process.env.REACT_APP_API_URL_LOCAL}/order/create`,
        data
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["OrderDetails", userDeatilData?.user?.id]);
      alert("Order created successfully");
      navigate("/orders");
      setHide(false);
    },
    onError: (error) => {
      alert("Something went wrong");
      console.error("Error creating order:", error);
      setHide(false);
    },
  });

  const handlePlaceOrder = () => {
    setHide(true);
    if (!cartItems?.length) {
      alert("No items in the cart to place an order.");
      return;
    }
    if (!addresses) {
      alert("Please select an address to place an order.");
      return;
    }
    createOrderMutation.mutate(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "79.7vh",
        bgcolor: "#f5f5f5",
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          p: 3,
          borderRadius: 2,
          flex: 1,
        }}
      >
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Billing Here
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={4}>
          {/* My Cart Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "370px",
                overflowY: "auto",
                borderRadius: 3,
                padding: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              {cartItems?.length ? (
                cartItems.map((item) => (
                  <Card
                    key={item?.id}
                    variant="outlined"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1.5,
                      mb: 2,
                      maxWidth: "100%",
                      borderRadius: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 1,
                        objectFit: "cover",
                      }}
                      image={
                        item.productimage[0]?.filename?.startsWith("https")
                          ? item.productimage[0]?.filename
                          : `${process.env.REACT_APP_API_URL_LOCAL}/${item.productimage[0]?.filename}`
                      }
                      alt={item?.title}
                    />
                    <Box sx={{ flex: 1, ml: 2 }}>
                      <Typography variant="subtitle2" fontWeight="bold" noWrap>
                        {item?.name || "Unknown Product"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qty: {item?.quantity || 0}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        color="primary"
                      >
                        ₹{item?.price || 0}
                      </Typography>
                    </Box>
                  </Card>
                ))
              ) : (
                <Typography>No items in the cart.</Typography>
              )}
            </Box>
          </Grid>

          {/* Billing Details Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#f9fbff",
                p: 2,
                borderRadius: "8px",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Delivering to Home
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleOpenDrawer}
                >
                  Add New Address
                </Button>
              </Box>
              {addresses ? (
                <Box ml={1}>
                  <Typography>{addresses?.name || "Unknown"}</Typography>
                  <Typography>
                    {addresses?.fullAddress}, {addresses?.city},{" "}
                    {addresses?.state} - {addresses?.pincode}
                  </Typography>
                  <Typography>Mobile: {addresses?.phoneNumber}</Typography>
                </Box>
              ) : (
                <Typography>No address selected.</Typography>
              )}
              <Divider sx={{ my: 2 }} />
              <Typography>Total: ₹{subtotal.toFixed(2)}</Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handlePlaceOrder}
                disabled={hide ? true : false}
              >
                Place Order
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Add Address Modal */}
      <BillingModal modalOpen={modalOpen} handleModalClose={handleModalClose} />
      <BillingAddAddress
        // addresses={addresses}
        close={handeCloseDrawer}
        handleModalOpen={handleModalOpen}
        setAddressDrawerOpen={setAddressDrawerOpen}
        open={addressDrawerOpen}
      />
    </Box>
  );
};

export default BillingPage;
