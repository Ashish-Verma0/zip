import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOneFetchByUrl, putFetchData } from "../api/Api";
import searchLoader2 from "../animation/searchLoader2.gif";
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

  if (isLoading)
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={4}
        height="75.9vh"
      >
        <img
          src={searchLoader2}
          alt="Loading..."
          style={{ maxWidth: "200px" }}
        />
        <Typography variant="body2" color="textSecondary">
          Loading your profile...
        </Typography>
      </Box>
    );
  if (isError) return <Typography>Error: {error.message}</Typography>;

  return (
    <div className="container-xl px-4 mt-4">
      <hr className="mt-0 mb-4" />
      <div className="row">
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
              <img
                className="img-account-profile rounded-circle mb-2"
                src="http://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <div className="small font-italic text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              <button className="btn btn-primary" style={{background:"#13a0a8"}} type="button">
                Upload new image
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <form>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputFirstName">
                      First name
                    </label>
                    <input
                      className="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                      defaultValue="Valerie"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLastName">
                      Last name
                    </label>
                    <input
                      className="form-control"
                      id="inputLastName"
                      type="text"
                      placeholder="Enter your last name"
                      defaultValue="Luna"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    id="inputEmailAddress"
                    type="email"
                    placeholder="Enter your email address"
                    defaultValue="name@example.com"
                  />
                </div>
                {/* Form Row*/}
                <div className="row gx-3 mb-3">
                {/* Form Group (organization name)*/}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputOrgName">
                    Organization name
                  </label>
                  <input
                    className="form-control"
                    id="inputOrgName"
                    type="text"
                    placeholder="Enter your organization name"
                    defaultValue="Start Bootstrap"
                  />
                </div>
                {/* Form Group (location)*/}
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputLocation">
                    Location
                  </label>
                  <input
                    className="form-control"
                    id="inputLocation"
                    type="text"
                    placeholder="Enter your location"
                    defaultValue="San Francisco, CA"
                  />
                </div>
              </div>
                <div className="row gx-3 mb-3">
                  {/* Form Group (phone number)*/}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputPhone">
                      Phone number
                    </label>
                    <input
                      className="form-control"
                      id="inputPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                      defaultValue="555-123-4567"
                    />
                  </div>
                  {/* Form Group (birthday)*/}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputBirthday">
                      Birthday
                    </label>
                    <input
                      className="form-control"
                      id="inputBirthday"
                      type="text"
                      name="birthday"
                      placeholder="Enter your birthday"
                      defaultValue="06/10/1988"
                    />
                  </div>
                </div>
                {/* Save changes button*/}
                <button className="btn btn-primary" style={{background:"#13a0a8"}} type="button">
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfilePage);
