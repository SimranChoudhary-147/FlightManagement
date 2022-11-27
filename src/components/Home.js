import * as React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import pic from "../Image/Airline_Picture.jpg";

const styles = {
  paperContainer: {
    backgroundImage: `url(${pic})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "repeat",
  },
};


const Home = () => {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        {/* Navbar*/}
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <AppBar position="static" elevation={0}>
            <Toolbar sx={{ background: "#021B38", height: "10vh" }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  margin: "1rem",
                  flexGrow: 1,
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Airline Management Portal
              </Typography>


              <NavLink to="/admin/signin" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{ marginX: "0.5rem", paddingX: "3rem", paddingY: "2rem" }}
                >
                  Admin
                </Button>
              </NavLink>
            </Toolbar>
          </AppBar>
        </Box>

        {/* Body of Home Page */}
        <Box
          style={styles.paperContainer}
          sx={{
            minHeight: "100vh",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: "5rem",
            }}
          >
            <NavLink to="/vendor/signin" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{ marginLeft: "30rem", marginTop: "15rem", paddingX: "5rem", paddingY: "2rem" }}
              >
                User
              </Button>
            </NavLink>
          </Box>
        </Box>

        {/* Footer of Home Page */}
      </Box>
    </>
  );
};

export default Home;
