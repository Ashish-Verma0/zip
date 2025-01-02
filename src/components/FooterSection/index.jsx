// FooterSection.js
import React from "react";
import {
  Box,
  Typography,
  Link,
  IconButton,
  Grid,
  Container,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const FooterSection = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#282c34",
        color: "#fff",
        textAlign: "center",
        padding: "20px 0",
        mt: "auto", // Ensures footer is pushed to the bottom if content is short
        width: "100%",
      }}
    >
      <Container>
        {/* <Box
          sx={{
            borderBottom: "1px solid #444",
            padding: "20px 0",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Globel Info Tech
          </Typography>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item>
              <IconButton
                component={Link}
                href="#"
                aria-label="Facebook"
                sx={{ color: "#fff" }}
              >
                <Facebook />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                component={Link}
                href="#"
                aria-label="Twitter"
                sx={{ color: "#fff" }}
              >
                <Twitter />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                component={Link}
                href="#"
                aria-label="Instagram"
                sx={{ color: "#fff" }}
              >
                <Instagram />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                component={Link}
                href="#"
                aria-label="LinkedIn"
                sx={{ color: "#fff" }}
              >
                <LinkedIn />
              </IconButton>
            </Grid>
          </Grid>
        </Box> */}
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
