// FooterSection.js
import React from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";

const FooterSection = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#282c34",
        color: "#fff",
        textAlign: "center",
        padding: "20px 0",
        mt: "auto",
        width: "100%",
      }}
    >
      <Container>
        <Box sx={{ padding: "10px 0" }}>
          <Typography variant="body2">
            Copyright &copy; {new Date().getFullYear()} Globel Info Tech All
            rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterSection;
