import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
  FormControlLabel,
  Checkbox,
  Skeleton,
} from "@mui/material";

import { toast } from "react-toastify";
import signUpAnimation from "../animation/signUpAnimation.gif";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { postFetchData } from "../api/Api";
import "./style.css";

const SignUpPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const notify = (data) => toast(data);
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [error, setError] = useState("");

  const [hide, setHide] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    try {
      setHide(true);
      e.preventDefault();
      const res = await postFetchData(
        `${process.env.REACT_APP_API_URL_LOCAL}/user/create`,
        formData
      );

      if (res?.success === true) {
        notify("Registration successfully");
        setHide(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      setHide(false);
      console.log(error);
    }
  };
  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };
  const [loading, setLoading] = useState(true);
  return (
    <div className="main-loginContainer">
      <div className="login-container">
        <div className="login-card">
          <h1 className="d-flex justify-content-center align-items-center">
            Welcome
          </h1>
          <Box display="flex" justifyContent="center" alignItems="center">
            {loading && (
              <Skeleton variant="circular" width={120} height={120} />
            )}
            <img
              src={signUpAnimation}
              alt="Sign Up"
              onLoad={() => setLoading(false)}
            />
          </Box>
          <form onSubmit={handleSignup}>
            <div className="input-group">
              <input
                type="text"
                id="name"
                name="firstName"
                placeholder="Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-group password-group">
              <input
                type={passwordType}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
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
            <button type="submit" className="login-button" disabled={hide}>
              {hide ? "Sign Up..." : "Sign Up"}
            </button>
          </form>
          <p className="signup-text">
            <spam className="d-flex justify-content-center align-items-center">
              Already have an account?&nbsp;
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#4facfe",
                  fontWeight: "600",
                }}
              >
                Login
              </Link>
            </spam>
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SignUpPage);
