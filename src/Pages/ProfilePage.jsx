import React, { useState } from "react";
import {
  Box,
  Avatar,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";

const ProfilePage = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "Ashish",
    lastName: "Allan",
    email: "demomail@mail.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, Los Angeles, California, 90001",
    state: "California",
    city: "Los Angeles",
    area: "Downtown",
    pincode: "90001",
  });

  const handleEditClick = () => {
    if (isEditable) {
      console.log("Updated Data:", userData);
    }
    setIsEditable(!isEditable);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        // height: "100vh",
        backgroundColor: "#f9f9f9",
        justifyContent: "center",
        alignItems: "center",
        // padding: { xs: 2, md: 4 },
      }}
    >
      {/* Left Profile Section */}
      <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            width: { xs: "90%", md: "60%" },
            height: { xs: "50%", md: "60%" },
            margin: "0 auto",
            backgroundColor: "#ffffff",
            position: "relative",
            overflow: "hidden",
            borderRadius: "1rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: { xs: 150, md: 200 },
              backgroundImage:
                "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYETbzr6e0CP1Ugdf_ndM4hTsTjJWlHP3QlA&s)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
            }}
          />
          <Avatar
            sx={{
              width: { xs: 80, md: 100 },
              height: { xs: 80, md: 100 },
              margin: "-50px auto 0",
              position: "relative",
              zIndex: 2,
              border: "3px solid white",
              backgroundColor: "#1976d2",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              fontSize: { xs: "40px", md: "50px" },
            }}
          >
            {userData.firstName.charAt(0)}
          </Avatar>
          <Typography
            variant="h5"
            sx={{
              mt: { xs: 1, md: 2 },
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {userData.firstName} {userData.lastName}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mt: { xs: 1, md: 1 }, color: "#888" }}
          >
            Member Since:<strong>29 September 2019</strong>
          </Typography>
          {/* Additional Info */}
          <Box
            sx={{
              mt: { xs: 3, md: 4 },
              textAlign: "left",
              paddingX: { xs: "1rem", md: "2rem" },
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Name:
              <Typography
                component="span"
                variant="body2"
                sx={{ ml: "5px", color: "#555" }}
              >
                {userData.firstName} {userData.lastName}
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", mt: "10px", color: "#333" }}
            >
              Email:
              <Typography
                component="span"
                variant="body2"
                sx={{ ml: "5px", color: "#555" }}
              >
                {userData.email}
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", mt: "10px", color: "#333" }}
            >
              Phone No.:
              <Typography
                component="span"
                variant="body2"
                sx={{ ml: "5px", color: "#555" }}
              >
                {userData.phone}
              </Typography>
            </Typography>
            <Divider sx={{ my: "20px" }} />
            {/* Address Section */}
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Address:
            </Typography>
            <Typography variant="body2" sx={{ mt: "5px", color: "#555" }}>
              {userData.address}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Right Edit Profile Section */}
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: "12px",
            backgroundColor: "#ffffff",
          }}
        >
          <Tabs value={0} indicatorColor="primary" textColor="primary">
            <Tab label="Edit Profile" />
          </Tabs>
          {/* Form */}
          <Box sx={{ mt: { xs: 2, md: 3 } }}>
            <Grid container spacing={2}>
              {/* Personal Information */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </Grid>

              {/* Address Section */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">Address</Typography>
                <Divider sx={{ mb: { xs: 2, md: 3 } }} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={userData.address}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  value={userData.state}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={userData.city}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Area"
                  value={userData.area}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pincode"
                  value={userData.pincode}
                  disabled
                />
              </Grid>
            </Grid>

            {/* Update Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: { xs: 3, md: 4 },
                width: "100%",
                backgroundColor: "#1976d2",
                "&.MuiButton-contained:hover": {
                  backgroundColor: "#155a8a",
                },
              }}
              onClick={handleEditClick}
            >
              {isEditable ? "Save Changes" : "Edit Profile"}
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
