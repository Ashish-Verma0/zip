import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useMutation } from "@tanstack/react-query"; // Import useMutation from @tanstack/react-query
import { postFetchData } from "../api/Api";

const EmailVerifyPage = () => {
  const [email, setEmail] = useState("");
  const [hide, setHide] = useState(false);
  // React Query's useMutation hook for verifying email
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async () => {
      const res = await postFetchData(
        `${process.env.REACT_APP_API_URL_LOCAL}/user/verify-email`,
        { email }
      );
      if (!res.success) {
        throw new Error("Something went wrong");
      }
      return res;
    },
    onSuccess: () => {
      alert("Email sent successfully to your mail id");
      setHide(false);
    },
    onError: (err) => {
      alert(err.message || "Something went wrong");
      setHide(false);
    },
  });

  const handleVerify = (e) => {
    setHide(true);
    e.preventDefault();
    mutate();
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
          Verify Your Email
        </Typography>

        <form onSubmit={handleVerify}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            sx={{ marginBottom: 2 }}
          />

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
            disabled={hide ? true : false} // Disable button when loading
          >
            Verify Email
          </Button>
        </form>

        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#2575fc",
                fontWeight: "500",
              }}
            >
              Back to Login
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default React.memo(EmailVerifyPage);
