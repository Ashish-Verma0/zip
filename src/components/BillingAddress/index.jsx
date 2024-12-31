// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   Drawer,
//   IconButton,
//   Typography,
//   Grid,
//   useMediaQuery,
// } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";

// import DeleteIcon from "@mui/icons-material/Delete";
// import AddLocationIcon from "@mui/icons-material/AddLocation";
// import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
// import { deleteFetchByUrl, getFetch } from "../../api/Api";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import EditIcon from "@mui/icons-material/Edit";
// const BillingAddAddress = ({
//   open,
//   close,
//   handleModalOpen,
//   handleEditAddress,
// }) => {
//   const isLargeScreen = useMediaQuery("(min-width: 1024px)");
//   const userDeatils = localStorage.getItem("token");
//   const userDeatilData = JSON.parse(userDeatils);
//   const [selectedIndex, setSelectedIndex] = useState(null);

//   const {
//     data: userAddress = [],
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["userLocation", userDeatilData?.user?.id],
//     queryFn: async () => {
//       const url = `${process.env.REACT_APP_API_URL_LOCAL}/userLocation/all?userId=${userDeatilData?.user?.id}`;
//       const response = await getFetch(url);
//       return response?.data?.data || [];
//     },
//     staleTime: 35 * 60 * 1000,
//   });

//   const queryClient = useQueryClient();

//   const handleStoreData = (address, index) => {
//     setSelectedIndex(index);
//     localStorage.setItem("addresses", JSON.stringify(address));
//     close();
//   };

//   const deleteLocationMutation = useMutation({
//     mutationFn: async (id) => {
//       const res = await deleteFetchByUrl(
//         `${process.env.REACT_APP_API_URL_LOCAL}/userLocation/delete?locationId=${id}`
//       );
//       return res.data.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["userLocation", userDeatilData?.user?.id]);
//       alert("location deleted successfully");
//       // localStorage.removeItem("addresses");
//       // close();
//     },
//     onError: (error) => {
//       alert("Something went wrong");
//       console.error("Error adding location:", error);
//     },
//   });

//   const handleDeleteAddress = (id) => {
//     deleteLocationMutation.mutate(id);
//   };

//   return (
//     <Drawer
//       anchor={isLargeScreen ? "right" : "bottom"}
//       open={open}
//       onClose={close}
//       sx={{
//         "& .MuiDrawer-paper": {
//           width: isLargeScreen ? "30%" : "100%",
//           height: isLargeScreen ? "100%" : "auto",
//           maxHeight: "100%",
//           boxShadow: 4,
//           borderRadius: isLargeScreen ? 0 : "16px 16px 0 0",
//           backgroundColor: "#f4f6fc",
//         },
//       }}
//     >
//       <Box
//         sx={{
//           p: 1,
//           display: "flex",
//           flexDirection: "column",
//           height: "100%",
//         }}
//       >
//         {/* Header Section */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             mb: 2,
//             fontSize: "16px",
//             lineHeight: "20px",
//             fontWeight: 700,
//             cursor: "pointer",
//             position: "sticky",
//             borderRadius: "20px",
//             width: "100%",
//             boxSizing: "border-box",
//           }}
//           onClick={close}
//         >
//           <KeyboardBackspaceIcon sx={{ mr: 2 }} />
//           <Typography variant="h6" fontWeight="bold">
//             Select Delivery Address
//           </Typography>
//         </Box>

//         {/* Add New Address Section */}
//         <Card
//           sx={{
//             mb: 2,
//             display: "flex",
//             alignItems: "center",
//             p: 1.5,
//             cursor: "pointer",
//             border: "1px dashed #1976d2",
//             borderRadius: "8px",
//             "&:hover": {
//               backgroundColor: "#f0f0f0",
//             },
//           }}
//           onClick={handleModalOpen}
//         >
//           <AddLocationIcon sx={{ color: "#1976d2", mr: 2 }} />
//           <Typography
//             sx={{
//               textTransform: "none",
//               color: "#1976d2",
//               fontWeight: "bold",
//             }}
//           >
//             Add a New Address
//           </Typography>
//         </Card>

//         {/* Address List Section */}
//         <Box
//           sx={{
//             height: "100%",
//             overflowY: "auto",
//             borderRadius: 3,
//             padding: 1,
//             backgroundColor: "#f9f9f9",
//             "&::-webkit-scrollbar": {
//               width: "8px",
//             },
//             "&::-webkit-scrollbar-thumb": {
//               backgroundColor: "#888",
//               borderRadius: "4px",
//             },
//             "&::-webkit-scrollbar-thumb:hover": {
//               backgroundColor: "#555",
//             },
//             "&::-webkit-scrollbar-track": {
//               backgroundColor: "#eee",
//               borderRadius: "4px",
//             },
//           }}
//         >
//           {userAddress.length > 0 ? (
//             <Grid container spacing={2}>
//               {userAddress.map((address, index) => (
//                 <Grid item lg={12} sm={12} xs={12} md={12} key={index}>
//                   <Card
//                     onClick={() => handleStoreData(address, index)}
//                     variant="outlined"
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       p: 2,
//                       justifyContent: "space-between",
//                       borderRadius: 2,
//                       cursor: "pointer",
//                       borderColor:
//                         selectedIndex === index ? "primary.main" : "grey.300",
//                       borderWidth: selectedIndex === index ? 2 : 1,
//                       boxShadow: selectedIndex === index ? 4 : 1,
//                       "&:hover": {
//                         backgroundColor: "grey.100",
//                       },
//                     }}
//                   >
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <HomeIcon
//                         sx={{ fontSize: 40, mr: 2, color: "primary.main" }}
//                       />
//                       <Box>
//                         <Typography variant="subtitle1" fontWeight="bold">
//                           {address.name || "No Name"}
//                         </Typography>
//                         <Typography variant="body2">
//                           {address.fullAddress || "No Address"},{" "}
//                           {address.city || "No City"},{" "}
//                           {address.state || "No State"} -{" "}
//                           {address.pinCode || "No Zip"}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Box sx={{ display: "flex", gap: 1 }}>
//                       <IconButton
//                         sx={{
//                           backgroundColor: "#f0f0f0",
//                           p: 0.5,
//                           "&:hover": { backgroundColor: "#e0e0e0" },
//                         }}
//                       >
//                         <EditIcon sx={{ fontSize: 20 }} />
//                       </IconButton>
//                       <IconButton
//                         sx={{
//                           backgroundColor: "#f8d7da",
//                           p: 0.5,
//                           "&:hover": { backgroundColor: "#f5c6cb" },
//                         }}
//                         onClick={() => handleDeleteAddress(address.id)}
//                       >
//                         <DeleteIcon sx={{ fontSize: 18, color: "#c00" }} />
//                       </IconButton>
//                     </Box>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           ) : (
//             <Typography color="textSecondary">
//               No saved addresses. Add one!
//             </Typography>
//           )}
//         </Box>
//       </Box>
//     </Drawer>
//   );
// };

// export default BillingAddAddress;

import React, { useState } from "react";
import {
  Box,
  Card,
  Drawer,
  IconButton,
  Typography,
  Grid,
  useMediaQuery,
  CircularProgress,
  Alert,
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
            border: "1px dashed #1976d2",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
          onClick={handleModalOpen}
        >
          <AddLocationIcon sx={{ color: "#1976d2", mr: 2 }} />
          <Typography
            sx={{
              textTransform: "none",
              color: "#1976d2",
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
