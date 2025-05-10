import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate to redirect after success
import { useMutation } from "@tanstack/react-query"; // Import useMutation from @tanstack/react-query
import { postFetchData } from "../api/Api";

const ForgetPassword = () => {
  const params = useParams();
  const navigate = useNavigate(); // Hook to navigate after success
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // Error state for form validation
  const [hide, setHide] = useState(false);
  // Mutation to handle password reset using React Query's useMutation
  const {
    mutate,
    isLoading,
    isError,
    error: mutationError,
  } = useMutation({
    mutationFn: async () => {
      const res = await postFetchData(
        `${process.env.REACT_APP_API_URL_LOCAL}/user/forgot-password`,
        { password: newPassword, token: params.token }
      );
      if (!res.success) {
        throw new Error(res.message || "Something went wrong");
      }
      return res;
    },
    onSuccess: () => {
      alert("Password reset successful.");
      navigate("/login");
      setHide(false);
    },
    onError: (error) => {
      setError(error.message || "Something went wrong");
      setHide(false);
    },
  });

  const handleResetPassword = (e) => {
    e.preventDefault();
    setHide(true);
    if (!newPassword || !confirmPassword) {
      setHide(false);
      setError("Please fill in both fields.");
    } else if (newPassword !== confirmPassword) {
      setHide(false);
      setError("Passwords do not match.");
    } else {
      setHide(false);
      setError(""); // Clear any previous error
      mutate(); // Trigger the mutation for password reset
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          background: "#fff",
          padding: { xs: 3, md: 4 },
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginBottom: 3, fontWeight: "bold" }}
        >
          Set New Password
        </Typography>

        {/* Display error message if there's any */}
        {error && (
          <Typography
            color="error"
            variant="body2"
            align="center"
            sx={{ marginBottom: 2 }}
          >
            {error}
          </Typography>
        )}

        <form onSubmit={handleResetPassword}>
          {/* New Password input field */}
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} // Update newPassword state
            type="password"
            sx={{ marginBottom: 2 }}
          />

          {/* Confirm Password input field */}
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
            type="password"
            sx={{ marginBottom: 2 }}
          />

          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              marginTop: 2,
              backgroundColor: "#2575fc",
              "&:hover": {
                backgroundColor: "#1e5ecc",
              },
            }}
            disabled={hide ? true : false}
          >
            Reset Password
          </Button>
        </form>

        {/* Footer with link to login page */}
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item>
            <a
              href="/login"
              style={{
                textDecoration: "none",
                color: "#2575fc",
                fontWeight: "500",
              }}
            >
              Back to Login
            </a>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default React.memo(ForgetPassword);
