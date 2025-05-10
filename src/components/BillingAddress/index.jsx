import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  Alert,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EditIcon from "@mui/icons-material/Edit";
import { deleteFetchByUrl, getFetch } from "../../api/Api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BillingAddAddress = ({
  open,
  close,
  handleModalOpen,
  handleEditAddress,
}) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const userDetails = localStorage.getItem("token");
  const userDetailData = JSON.parse(userDetails);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const queryClient = useQueryClient();

  const {
    data: userAddress = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userLocation", userDetailData?.user?.id],
    queryFn: async () => {
      if (!userDetailData?.user?.id) {
        throw new Error("User ID not found.");
      }
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/userLocation/all?userId=${userDetailData?.user?.id}`;
      const response = await getFetch(url);
      return response?.data?.data || [];
    },
    staleTime: 35 * 60 * 1000,
    onError: () => {
      console.error("Error fetching user address data.");
    },
  });

  const deleteLocationMutation = useMutation({
    mutationFn: async (id) => {
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/userLocation/delete?locationId=${id}`;
      const response = await deleteFetchByUrl(url);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userLocation", userDetailData?.user?.id]);
      alert("Address deleted successfully.");
    },
    onError: () => {
      alert("Failed to delete the address. Please try again.");
    },
  });

  const handleStoreData = (address, index) => {
    setSelectedIndex(index);
    localStorage.setItem("addresses", JSON.stringify(address));
    close();
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      deleteLocationMutation.mutate(id);
    }
  };

  return (
    <Drawer
      anchor={isLargeScreen ? "right" : "bottom"}
      open={open}
      onClose={close}
      sx={{
        "& .MuiDrawer-paper": {
          width: isLargeScreen ? "30%" : "100%",
          height: isLargeScreen ? "100%" : "auto",
          maxHeight: "100%",
          boxShadow: 4,
          borderRadius: isLargeScreen ? 0 : "16px 16px 0 0",
          backgroundColor: "#f4f6fc",
        },
      }}
    >
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            cursor: "pointer",
          }}
          onClick={close}
        >
          <KeyboardBackspaceIcon sx={{ mr: 2 }} />
          <Typography variant="h6" fontWeight="bold">
            Select Delivery Address
          </Typography>
        </Box>

        {/* Add New Address Section */}
        <Card
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            p: 1.5,
            cursor: "pointer",
            border: "1px dashed #13a0a8",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
          onClick={handleModalOpen}
        >
          <AddLocationIcon sx={{ color: "#13a0a8", mr: 2 }} />
          <Typography
            sx={{
              textTransform: "none",
              color: "#13a0a8",
              fontWeight: "bold",
            }}
          >
            Add a New Address
          </Typography>
        </Card>

        {/* Address List Section */}
        <Box
          sx={{
            height: "100%",
            overflowY: "auto",
            borderRadius: 3,
            p: 1,
            backgroundColor: "#f9f9f9",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "4px",
            },
          }}
        >
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">Failed to load addresses.</Alert>
          ) : userAddress.length > 0 ? (
            <Grid container spacing={2}>
              {userAddress.map((address, index) => (
                <Grid item xs={12} key={index}>
                  <Card
                    onClick={() => handleStoreData(address, index)}
                    variant="outlined"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      justifyContent: "space-between",
                      borderRadius: 2,
                      cursor: "pointer",
                      borderColor:
                        selectedIndex === index ? "primary.main" : "grey.300",
                      boxShadow: selectedIndex === index ? 4 : 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <HomeIcon
                        sx={{ fontSize: 40, mr: 2, color: "primary.main" }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {address.name || "No Name"}
                        </Typography>
                        <Typography variant="body2">
                          {address.fullAddress || "No Address"},{" "}
                          {address.city || "No City"},{" "}
                          {address.state || "No State"} -{" "}
                          {address.pinCode || "No Zip"}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        sx={{ backgroundColor: "#f0f0f0" }}
                        onClick={() => handleEditAddress(address)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ backgroundColor: "#f8d7da" }}
                        onClick={() => handleDeleteAddress(address.id)}
                      >
                        <DeleteIcon sx={{ color: "#c00" }} />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography color="textSecondary">
              No saved addresses found. Add one!
            </Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default BillingAddAddress;
