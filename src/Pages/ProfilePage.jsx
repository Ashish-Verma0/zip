import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
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

  const generateImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * 7) + 1;
    return `http://bootdey.com/img/Content/avatar/avatar${randomIndex}.png`;
  };

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: generateImageUrl(1),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const [avatarFile, setAvatarFile] = useState(null); // Track the avatar file

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

  const handleEdit = (e) => {
    e.preventDefault(); // Prevent page refresh
    setIsEditing(true);
  };

  const queryClient = useQueryClient();

  const profileUpdate = useMutation({
    mutationFn: async (formData) => {
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

  const handleSave = (e) => {
    e.preventDefault(); // Prevent form from refreshing
    setUser(editedUser);

    const formData = new FormData();
    formData.append("firstName", editedUser.firstName);
    formData.append("lastName", editedUser.lastName);
    formData.append("email", editedUser.email);

    // Append the avatar file only if it's selected
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    profileUpdate.mutate(formData);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB max size
      if (file.size > maxSize) {
        alert("File size should not exceed 5 MB");
        return;
      }
      setAvatarFile(file); // Store the file when selected
    }
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
                src={user.avatar}
                alt="Profile"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <div className="small font-italic text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              <div
                classname="avatar-options"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 5,
                }}
              >
                <div
                  classname="avatar-option profile-dummy-img"
                  style={{
                    width: "23%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="http://bootdey.com/img/Content/avatar/avatar1.png"
                    alt="Avatar 1"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div classname="avatar-option profile-dummy-img">
                  <img
                    src="http://bootdey.com/img/Content/avatar/avatar2.png"
                    alt="Avatar 2"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  classname="avatar-option profile-dummy-img"
                  style={{
                    width: "23%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="http://bootdey.com/img/Content/avatar/avatar3.png"
                    alt="Avatar 3"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  classname="avatar-option profile-dummy-img"
                  style={{
                    width: "23%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="http://bootdey.com/img/Content/avatar/avatar4.png"
                    alt="Avatar 4"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  classname="avatar-option profile-dummy-img"
                  style={{
                    width: "23%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="http://bootdey.com/img/Content/avatar/avatar5.png"
                    alt="Avatar 5"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  classname="avatar-option profile-dummy-img"
                  style={{
                    width: "23%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="http://bootdey.com/img/Content/avatar/avatar6.png"
                    alt="Avatar 6"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  classname="avatar-option profile-dummy-img"
                  style={{
                    width: "23%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="http://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Avatar 7"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div
                  classname="avatar-option profile-dummy-img"
                  style={{
                    width: "23%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="http://bootdey.com/img/Content/avatar/avatar8.png"
                    alt="Avatar 8"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>

              {isEditing && (
                <label
                  className="btn btn-primary"
                  style={{ background: "#13a0a8", cursor: "pointer" }}
                >
                  Upload new image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </label>
              )}
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
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      value={isEditing ? editedUser.firstName : user.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{
                        backgroundColor: "white",
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLastName">
                      Last name
                    </label>
                    <input
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      value={isEditing ? editedUser.lastName : user.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{
                        backgroundColor: "white",
                      }}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={isEditing ? editedUser.email : user.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    style={{
                      backgroundColor: "white",
                    }}
                  />
                </div>
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
                {!isEditing ? (
                  <button
                    className="btn btn-primary"
                    style={{ background: "#13a0a8" }}
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    style={{ background: "#13a0a8" }}
                    type="button"
                    onClick={handleSave}
                  >
                    Save changes
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "10px", background: "#ff6f61" }}
                  onClick={handleLogout}
                >
                  Logout
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
