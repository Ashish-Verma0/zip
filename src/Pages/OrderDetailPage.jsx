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
  Collapse,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOneFetchByUrl } from "../api/Api";
import searchLoader2 from "../animation/searchLoader2.gif";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
      return response?.data || null;
    },
    refetchOnWindowFocus: false,
  });

  const [open, setOpen] = React.useState(false);

  const handleExpandClick = () => {
    setOpen(!open);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="75.9vh"
      >
        <img
          src={searchLoader2}
          alt="Loading..."
          style={{ maxWidth: "200px"}}
        />
        <Typography variant="body2" color="textSecondary">
          Loading order details...
        </Typography>
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
        boxShadow: 3,
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
              <Typography variant="body2">
                Item total: ₹{subTotal - deliveryPrice}
              </Typography>
              <Typography variant="body2">
                Delivery: ₹{deliveryPrice}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  mt: 1,
                  color: "primary.main",
                  transition: "color 0.3s",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              >
                Grand Total: ₹{parseFloat(subTotal)}
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
              "&:hover": {
                transform: "scale(1.03)",
                transition: "transform 0.3s",
              },
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
                      transition: "transform 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "scale(1)")
                    }
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
                    {process.env.REACT_APP_DISCOUNT && (
                      <Typography
                        variant="body2"
                        sx={{ color: "error.main", fontWeight: "bold" }}
                      >
                        {process.env.REACT_APP_DISCOUNT}% OFF
                      </Typography>
                    )}
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      <strong style={{ color: "blue" }}>Quantity</strong>:{" "}
                      {item?.orderQuantity || 0}
                    </Typography>
                    <Tooltip title="View Details">
                      <IconButton onClick={handleExpandClick}>
                        <ExpandMoreIcon />
                      </IconButton>
                    </Tooltip>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Additional product details can go here.
                        </Typography>
                      </Box>
                    </Collapse>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      ) : (
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
