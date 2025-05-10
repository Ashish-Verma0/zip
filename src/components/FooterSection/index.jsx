// FooterSection.js
import React from "react";
import { Box, Container, Typography } from "@mui/material";
const FooterSection = () => {
  return (
    <Box
      component="footer"
      sx={{
        background:
          "linear-gradient(to right,rgb(8, 89, 95),rgb(95, 173, 173))", // Blue gradient
        color: "#fff",
        textAlign: "center",
        padding: "20px 0",
        mt: "auto",
        width: "100%",
      }}
    >
      <Container>
        <Box>
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
