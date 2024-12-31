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
        localStorage.setItem("token", JSON.stringify(data));
        localStorage.setItem("tokenData", JSON.stringify(data.token));
        navigate("/");
        window.location.reload();
      } else {
        setError(data.message || "Login failed");
      }
    },

    onError() {
      setError("An error occurred during login.");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });

    if (error) setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      setError("Please enter both email and password.");
      return;
    }

    // Trigger the login mutation
    mutation.mutate(data);
  };

  return (
    <div
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        padding: 2,
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            background: "#fff",
            padding: 4,
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: "1.8rem",
              color: "#333",
              margin: "1rem 0",
            }}
          >
            Welcome Back!
          </Typography>
          <Typography
            sx={{ fontSize: "0.95rem", color: "#666", marginBottom: 3 }}
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
              sx={{ marginTop: 3 }}
              required
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={data.password}
              onChange={handleChange}
              name="password"
              sx={{ marginTop: 3 }}
              required
            />

            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 3,
              }}
              alignItems="center"
            >
              <Grid item>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <a
                  href="/email-verify"
                  sx={{
                    textDecoration: "none",
                    color: "#2575fc",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  Forgot Password?
                </a>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              sx={{
                marginTop: 3,
                padding: 1.5,
                fontWeight: "600",
                fontSize: "1rem",
                borderRadius: "8px",
                width: "100%",
                background: "#2575fc",
                color: "#fff",
              }}
              type="submit"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Grid container justifyContent="center" sx={{ marginTop: 1.5 }}>
            <Grid item>
              <Typography variant="body2" sx={{ color: "#666" }}>
                New on our platform?{" "}
                <a
                  href="/signup"
                  sx={{
                    textDecoration: "none",
                    color: "#2575fc",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  Create an account
                </a>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default React.memo(LoginPage);
