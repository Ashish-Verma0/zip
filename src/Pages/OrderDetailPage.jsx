// import React from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Divider,
//   Stack,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getOneFetchByUrl } from "../api/Api";

// const OrderDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const {
//     data: orderDetail = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["orderDetail", id],
//     queryFn: async () => {
//       const response = await getOneFetchByUrl(
//         `${process.env.REACT_APP_API_URL_LOCAL}/order/id?orderId=${id}`
//       );
//       console.log("response", response);
//       return response?.data || [];
//     },
//   });

//   if (isLoading) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (isError) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <Alert severity="error">
//           Failed to fetch order details: {error.message}
//         </Alert>
//       </Box>
//     );
//   }

//   if (!orderDetail) {
//     return (
//       <Box display="flex" justifyContent="center" mt={4}>
//         <Typography variant="h6" color="textSecondary">
//           No data available for this order.
//         </Typography>
//       </Box>
//     );
//   }

//   const {
//     createdAt,
//     transactionId,
//     address,
//     subTotal,
//     deliveryPrice = 40,
//     orderedItems,
//   } = orderDetail;

//   return (
//     <Box
//       sx={{
//         maxWidth: 1000,
//         margin: "auto",
//         p: 3,
//         backgroundColor: "#f9f9f9",
//         borderRadius: 2,
//       }}
//     >
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
//         Order Details
//       </Typography>
//       <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//         Ordered on {new Date(createdAt).toLocaleDateString()} | Order#{" "}
//         {transactionId}
//       </Typography>

//       <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 3 }}>
//         <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={4}>
//               <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                 Shipping Address
//               </Typography>
//               <Typography variant="body2">
//                 {address?.name}
//                 <br />
//                 {address?.fullAddress}
//                 <br />
//                 {address?.city}, {address?.state} {address?.pinCode}
//                 <br />
//                 India
//               </Typography>
//             </Grid>

//             <Grid item xs={12} sm={4}>
//               <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                 Payment Methods
//               </Typography>
//               <Typography variant="body2">{transactionId}</Typography>
//             </Grid>

//             <Grid item xs={12} sm={4}>
//               <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                 Order Summary
//               </Typography>
//               <Typography variant="body2">Item total: ₹{subTotal}</Typography>
//               <Typography variant="body2">
//                 Delivery: ₹{deliveryPrice}
//               </Typography>
//               <Typography
//                 variant="body1"
//                 sx={{ fontWeight: "bold", mt: 1, color: "primary.main" }}
//               >
//                 Grand Total: ₹{parseFloat(subTotal) + deliveryPrice}
//               </Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {orderedItems?.length > 0 ? (
//         orderedItems.map((item, index) => (
//           <Card
//             key={index}
//             sx={{
//               borderRadius: 2,
//               boxShadow: 2,
//               mb: 3,
//             }}
//           >
//             <CardContent>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={3}>
//                   {item?.productimage[0]?.filename.startsWith("https") ? (
//                     <img
//                       src={`${item?.productimage[0]?.filename}`}
//                       alt={item.title}
//                       style={{
//                         width: "100%",
//                         borderRadius: "8px",
//                         objectFit: "contain",
//                       }}
//                     />
//                   ) : (
//                     <img
//                       src={`${process.env.REACT_APP_API_URL_LOCAL}/${item?.productimage[0]?.filename}`}
//                       alt={item.title}
//                       style={{
//                         width: "100%",
//                         borderRadius: "8px",
//                         objectFit: "contain",
//                       }}
//                     />
//                   )}
//                 </Grid>

//                 <Grid item xs={12} sm={9}>
//                   <Stack spacing={1}>
//                     <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                       {item?.title}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       {item?.desc}
//                     </Typography>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Typography
//                         variant="body1"
//                         sx={{
//                           fontWeight: "bold",
//                           textDecoration: "line-through",
//                           color: "text.secondary",
//                           mr: 2,
//                         }}
//                       >
//                         ₹{(item?.price * 1.3).toFixed(2)}
//                       </Typography>
//                       <Typography
//                         variant="body1"
//                         sx={{ fontWeight: "bold", color: "primary.main" }}
//                       >
//                         ₹{item?.price}
//                       </Typography>
//                     </Box>
//                     <Typography
//                       variant="body2"
//                       sx={{ color: "error.main", fontWeight: "bold" }}
//                     >
//                       {process.env.REACT_APP_DISCOUNT}% OFF
//                     </Typography>
//                     <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//                       <strong style={{ color: "blue" }}>Quantity</strong>:{" "}
//                       {item?.orderQuantity}
//                     </Typography>
//                   </Stack>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         ))
//       ) : (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <Typography variant="h6" color="textSecondary">
//             No products found for this order.
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default OrderDetailPage;

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOneFetchByUrl } from "../api/Api";

const OrderDetailPage = () => {
  const { id } = useParams();

  const {
    data: orderDetail,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orderDetail", id],
    queryFn: async () => {
      const response = await getOneFetchByUrl(
        `${process.env.REACT_APP_API_URL_LOCAL}/order/id?orderId=${id}`
      );
      return response?.data || null; // Fallback to null if no data
    },
    refetchOnWindowFocus: false,
  });

  // Conditional rendering based on state
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !orderDetail) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Alert severity="error">
          {isError
            ? `Failed to fetch order details: ${
                error?.message || "Unknown error"
              }`
            : "No data available for this order."}
        </Alert>
      </Box>
    );
  }

  const {
    createdAt = "N/A",
    transactionId = "N/A",
    address = {},
    subTotal = 0,
    deliveryPrice = 40,
    orderedItems = [],
  } = orderDetail;

  return (
    <Box
      sx={{
        maxWidth: 1000,
        margin: "auto",
        p: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        Order Details
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Ordered on {new Date(createdAt).toLocaleDateString()} | Order#{" "}
        {transactionId}
      </Typography>

      <Card sx={{ borderRadius: 2, boxShadow: 2, mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Shipping Address
              </Typography>
              <Typography variant="body2">
                {address?.name || "Name not available"}
                <br />
                {address?.fullAddress || "Address not available"}
                <br />
                {address?.city || "City not available"},{" "}
                {address?.state || "State not available"}{" "}
                {address?.pinCode || "PIN not available"}
                <br />
                India
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Payment Methods
              </Typography>
              <Typography variant="body2">{transactionId}</Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Order Summary
              </Typography>
              <Typography variant="body2">Item total: ₹{subTotal}</Typography>
              <Typography variant="body2">
                Delivery: ₹{deliveryPrice}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", mt: 1, color: "primary.main" }}
              >
                Grand Total: ₹{parseFloat(subTotal) + deliveryPrice}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {orderedItems.length > 0 ? (
        orderedItems.map((item, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 2,
              boxShadow: 2,
              mb: 3,
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <img
                    src={
                      item?.productimage?.[0]?.filename?.startsWith("https")
                        ? item.productimage[0].filename
                        : `${process.env.REACT_APP_API_URL_LOCAL}/${item?.productimage?.[0]?.filename}`
                    }
                    alt={item.title || "Product Image"}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      objectFit: "contain",
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={9}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {item?.title || "Product Title"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item?.desc || "No description available"}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          textDecoration: "line-through",
                          color: "text.secondary",
                          mr: 2,
                        }}
                      >
                        ₹{((item?.price || 0) * 1.3).toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", color: "primary.main" }}
                      >
                        ₹{item?.price || 0}
                      </Typography>
                    </Box>
                    {/* Assuming there's a discount percentage defined */}
                    {process.env.REACT_APP_DISCOUNT && (
                      <Typography
                        variant="body2"
                        sx={{ color: "error.main", fontWeight: "bold" }}
                      >
                        {process.env.REACT_APP_DISCOUNT}% OFF
                      </Typography>
                    )}
                    {/* Display quantity */}
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      <strong style={{ color: "blue" }}>Quantity</strong>:{" "}
                      {item?.orderQuantity || 0}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      ) : (
        // Message for no products found in the order
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="h6" color="textSecondary">
            No products found for this order.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default OrderDetailPage;
