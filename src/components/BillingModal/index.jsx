import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFetch, postFetchData } from "../../api/Api";

const BillingModal = ({ modalOpen, handleModalClose }) => {
  const userDeatils = localStorage.getItem("token");
  const userDeatilData = JSON.parse(userDeatils);
  const [hide, setHide] = useState(false);
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    fullAddress: "",
    state: "",
    city: "",
    area: "",
    pinCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const queryClient = useQueryClient();

  const {
    data: sellerLocation = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sellerLocation", process.env.REACT_APP_SHOP_NAME],
    queryFn: async () => {
      const url = `${process.env.REACT_APP_API_URL_LOCAL}/sellerLocation/all/seller?shopName=${process.env.REACT_APP_SHOP_NAME}`;
      const response = await getFetch(url);
      return response?.data?.data?.location || [];
    },
    staleTime: 35 * 60 * 1000,
  });
  const addLocationMutation = useMutation({
    mutationFn: async (data) => {
      const res = await postFetchData(
        `${process.env.REACT_APP_API_URL_LOCAL}/userLocation/create?userId=${userDeatilData?.user?.id}`,
        data
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userLocation", userDeatilData?.user?.id]);
      handleModalClose();
      setHide(false);
    },
    onError: (error) => {
      alert("something went wrong");
      console.error("Error adding location:", error);
      setHide(false);
    },
  });

  const handleAreaChange = (e) => {
    const selectedArea = e.target.value;
    const selectedData = sellerLocation.find(
      (item) => item.area === selectedArea
    );
    if (selectedData) {
      setData({
        ...data,
        area: selectedArea,
        pinCode: selectedData.pinCode,
        city: selectedData.city,
        state: selectedData.state,
        delivery: selectedData.id,
      });
    }
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    setHide(true);
    addLocationMutation.mutate(data);
  };

  return (
    <Modal open={modalOpen} onClose={handleModalClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          width: { xs: "90%", sm: 400 },
          maxWidth: 600,
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Add Address
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="fullAddress"
              value={data.fullAddress}
              onChange={handleInputChange}
              size="small"
              required
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="State"
              name="state"
              value={data.state}
              onChange={handleInputChange}
              size="small"
              required
            >
              {[...new Set(sellerLocation.map((item) => item.state))].map(
                (state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                )
              )}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="City"
              name="city"
              value={data.city}
              onChange={handleInputChange}
              size="small"
              required
            >
              {sellerLocation
                .filter((item) => item.state === data.state)
                .map((item) => (
                  <MenuItem key={item.city} value={item.city}>
                    {item.city}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Area"
              name="area"
              value={data.area}
              onChange={handleAreaChange}
              size="small"
              required
            >
              {sellerLocation
                .filter((item) => item.city === data.city)
                .map((item) => (
                  <MenuItem key={item.area} value={item.area}>
                    {item.area}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Pincode"
              name="pinCode"
              value={data.pinCode}
              size="small"
              required
              disabled
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={handleInputChange}
              size="small"
              required
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, backgroundColor: "#13a0a8" }}
          onClick={handleSaveAddress}
          disabled={hide ? true : false}
        >
          Save Address
        </Button>
      </Box>
    </Modal>
  );
};

export default BillingModal;
