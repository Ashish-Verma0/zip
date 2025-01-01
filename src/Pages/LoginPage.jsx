import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postFetchData } from "../api/Api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Using React Query's useMutation for login
  const mutation = useMutation({
    mutationFn: async (loginData) => {
      const response = await postFetchData(
        `${process.env.REACT_APP_API_URL_LOCAL}/user/login`,
        loginData
      );
      return response;
    },

    onSuccess(data) {
      if (data.success) {
        toast("Login successfully");
        setHide(false);
        localStorage.setItem("token", JSON.stringify(data));
        localStorage.setItem("tokenData", JSON.stringify(data.token));
        navigate("/");
        window.location.reload();
      } else {
        setHide(false);
        setError(data.message || "Login failed");
      }
    },

    onError() {
      setHide(false);
      setError("Invalid Credentials");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });

    if (error) setError(""); // Clear error message on input change
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setHide(true);
    if (!data.email || !data.password) {
      setError("Please enter both email and password.");
      return;
    }
    mutation.mutate(data);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          background: "#fff",
          padding: { xs: 2, md: 4 },
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: "700",
            color: "#333",
            marginBottom: 2,
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          sx={{ textAlign: "center", color: "#666", marginBottom: 3 }}
        >
          Please sign in to your account and start your adventure.
        </Typography>

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

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={data.email}
            onChange={handleChange}
            required
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={data.password}
            onChange={handleChange}
            name="password"
            required
            sx={{ marginBottom: 2 }}
          />

          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: 2 }}
          >
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />
            <a
              href="/email-verify"
              style={{
                color: "#2575fc",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Forgot Password?
            </a>
          </Grid>

          <Button
            variant="contained"
            type="submit"
            disabled={hide ? true : false}
            sx={{
              backgroundColor: "#2575fc",
              color: "#fff",
              width: "100%",
              "&:hover": {
                backgroundColor: "#1e5ecc",
              },
              marginTop: 3,
              paddingY: 1.5,
              fontWeight: "600",
              fontSize: "1rem",
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            Login
          </Button>
        </form>

        <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
          <Typography variant="body2" sx={{ color: "#666" }}>
            New on our platform?{" "}
            <a
              href="/signup"
              style={{
                color: "#2575fc",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Create an account
            </a>
          </Typography>
        </Grid>
      </Box>
    </Container>
  );
};

export default React.memo(LoginPage);
