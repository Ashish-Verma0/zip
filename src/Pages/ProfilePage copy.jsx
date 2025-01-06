import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOneFetchByUrl, putFetchData } from "../api/Api";

const ProfilePage = () => {
  const {
    data: userProfile = null,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await getOneFetchByUrl(
        `${process.env.REACT_APP_API_URL_LOCAL}/user/profile`
      );
      return response?.user || {};
    },
    staleTime: 35 * 60 * 1000,
  });

  const generateImageUrl = (index) =>
    `https://picsum.photos/100/100?random=${index + 1}`;

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: generateImageUrl(1),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  // Update `user` state when `userProfile` changes
  useEffect(() => {
    if (userProfile) {
      setUser({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        email: userProfile.email || "",
        avatar: generateImageUrl(1),
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (isEditing) {
      setEditedUser(user);
    }
  }, [isEditing, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenData");
    navigate("/login");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const queryClient = useQueryClient();

  const profileUpdate = useMutation({
    mutationFn: async (formData) => {
      console.log("formData", formData);
      const res = await putFetchData(
        `${process.env.REACT_APP_API_URL_LOCAL}/user/update-user`,
        formData
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
      alert("Profile Updated successfully");

      setIsEditing(false);
    },
    onError: (error) => {
      alert("Something went wrong");
      console.error("Error Profile Updating:", error);
    },
  });

  const handleSave = () => {
    setUser(editedUser);

    const formData = new FormData();
    formData.append("firstName", editedUser.firstName);
    formData.append("lastName", editedUser.lastName);
    formData.append("email", editedUser.email);
    profileUpdate.mutate(editedUser);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error: {error.message}</Typography>;

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "50vh", backgroundColor: "#f5f5f5", padding: "20px" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper
          elevation={4}
          sx={{
            padding: "30px",
            borderRadius: "15px",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* <Box textAlign="center">
            <img
              src={user.avatar}
              alt="avatar"
              style={{
                width: "35%",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </Box> */}
          <Box mb={4} sx={{ marginTop: "20px" }}>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Profile Details
            </Typography>

            <TextField
              fullWidth
              name="firstName"
              value={isEditing ? editedUser.firstName : user.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              id="firstName"
              sx={{
                marginBottom: "25px",
                marginTop: "20px",
                borderBottom: "2px solid #ddd",
              }}
              placeholder="First Name"
            />

            <TextField
              fullWidth
              name="lastName"
              value={isEditing ? editedUser.lastName : user.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              id="lastName"
              sx={{
                marginBottom: "25px",
                borderBottom: "2px solid #ddd",
              }}
              placeholder="Last Name"
            />

            <TextField
              fullWidth
              name="email"
              value={isEditing ? editedUser.email : user.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              id="email"
              placeholder="Email"
              sx={{
                borderBottom: "2px solid #ddd",
              }}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            gap={2}
            alignItems="center"
          >
            {!isEditing ? (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                sx={{
                  marginBottom: "10px",
                  backgroundImage:
                    "linear-gradient(to right, #ff7e5f, #feb47b)",
                  color: "#ffffff",
                  fontWeight: "bold",
                  boxShadow: "0 3px 8px rgba(255, 126, 95, 0.4)",
                  width: "100%",
                }}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{
                  marginBottom: "10px",
                  backgroundImage:
                    "linear-gradient(to right, #11998e, #38ef7d)",
                  color: "#ffffff",
                  fontWeight: "bold",
                  boxShadow: "0 3px 8px rgba(56, 239, 125, 0.4)",
                  width: "100%",
                }}
              >
                Save Changes
              </Button>
            )}

            <Button
              variant="contained"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                backgroundImage: "linear-gradient(to right, #e52d27, #b31217)",
                color: "#ffffff",
                fontWeight: "bold",
                boxShadow: "0 3px 8px rgba(179, 18, 23, 0.4)",
                width: "100%",
              }}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default React.memo(ProfilePage);
