import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { postFetchData } from "../api/Api";
import { useMutation } from "@tanstack/react-query";
import emailverify2 from "../animation/emailverify2.gif";
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
    <div className="main-loginContainer">
      <div className="login-container">
        <div className="login-card">
          <h1 className="d-flex justify-content-center align-items-center">
            Verify Your Email
          </h1>
          <div className="d-flex justify-content-center align-items-center mb-4">
            <img
              src={emailverify2}
              alt=""
              style={{ width: "110px", height: "80px" }}
            />
          </div>

          <form onSubmit={handleVerify}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            {error && (
              <Typography className="error-message">{error}</Typography>
            )}

            <button type="submit" className="login-button" disabled={hide}>
              {hide ? "Verify Email..." : "Verify Email"}
            </button>
          </form>
          <p className="signup-text d-flex justify-content-center align-items-center">
            Already have an account? &nbsp;<Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EmailVerifyPage);
