import React, { useState } from "react";
import { toast } from "react-toastify";
import { postFetchData } from "../api/Api";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import loginAnimation from "../animation/loginAnimation.gif";
import {
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  Skeleton,
} from "@mui/material";
import "./style.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [error, setError] = useState("");

  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

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
        if (rememberMe) {
          localStorage.setItem("rememberMe", JSON.stringify(data));
        }
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
    if (error) setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setHide(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email || !data.password) {
      setError("Please enter both email and password.");
      setHide(false);
      return;
    }

    if (!emailRegex.test(data.email)) {
      setError("Please enter a valid email.");
      setHide(false);
      return;
    }

    mutation.mutate(data);
  };
  const [loading, setLoading] = useState(true);

  return (
    <div className="main-loginContainer">
      <div className="login-container">
        <div className="login-card">
          <h1 className="d-flex justify-content-center align-items-center">
            Welcome Back
          </h1>
          <Box display="flex" justifyContent="center" alignItems="center">
            {loading && (
              <Skeleton variant="circular" width={120} height={120} />
            )}
            <img
              src={loginAnimation}
              alt="Sign Up"
              onLoad={() => setLoading(false)}
            />
          </Box>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-group password-group">
              <input
                type={passwordType}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <span className="eye-icon" onClick={togglePassword}>
                {passwordType === "password" ? "🙈" : "👁️"}
              </span>
            </div>
            {error && (
              <Typography className="error-message">{error}</Typography>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberMe}
                  color="primary"
                />
              }
              label="Remember Me"
            />
            <button type="submit" className="login-button" disabled={hide}>
              {hide ? "Logging In..." : "LOGIN"}
            </button>
          </form>
          <p className="signup-text">
            <spam className="d-flex justify-content-center align-items-center">
              Don't have an account?&nbsp;
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  color: "#4facfe",
                  fontWeight: "600",
                }}
              >
                Sign Up
              </Link>
            </spam>
            <Link
              to="/email-verify"
              style={{
                textDecoration: "none",
                color: "#4facfe",
                fontWeight: "600",
              }}
            >
              Forgot Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LoginPage);
