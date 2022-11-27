import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { firebase, auth } from "../firebase";

const initialValues = {

  vendorName: "",
  phone: "",
  email: "",
  password: "",
  renterpwd: "",
};

// Used for snackbar Alert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

const VendorSignup = () => {
  const navigate = useNavigate();
  const axios = require("axios");


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      name: data.get("vendorName"),
      phoneno: data.get("phone"),
      email: data.get("email"),
      password: data.get("password"),
      admin: false,
    };
    console.log("Submitting Details: ", credentials) 
    axios({
      url: "http://localhost:8000/register",
      method: "POST",
      withCredentials: true,
      crossDomain: true,
      data: credentials,
    }).then((res) => {
      console.log(res);
      if (res.data.status === "success") {

        navigate("/user/bookFlight");
      } else {
        setOpen(true);
      }
    });
  };

  const [values, setValues] = React.useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      setValues({
        ...values,
        [name]: value,
      });
    } else {
      setValues({
        ...values,
        [name]: null,
      });
    }
  };

  // const [emailText, setEmailText] = React.useState();

  

 

 

  // -----Opening and Closing snackbars-----
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [open8, setOpen8] = React.useState(false);
  const [open9, setOpen9] = React.useState(false);
  const [open10, setOpen10] = React.useState(false);

  // ---------------------------------------

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
    setOpen6(false);
    setOpen7(false);
    setOpen8(false);
    setOpen9(false);
    setOpen10(false);
  };

  return (
    <ThemeProvider theme={theme}>
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
          </Toolbar>
        </AppBar>
      </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="User Name"
              name="vendorName"
              value={values.vendorName}
              onChange={handleInputChange}
            />

            <TextField
              margin="normal"
              required
              type="phone"
              fullWidth
              label="Phone Number (+91)"
              name="phone"
              value={values.phone}
              onChange={handleInputChange}
            />
            <div id="recaptcha-container"></div>


            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              value={values.email}
              onChange={handleInputChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="renterpwd"
              label="Re-enter Password"
              type="password"
              value={values.renterpwd}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Invalid Username or Password
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          OTP Verified
        </Alert>
      </Snackbar>
      <Snackbar open={open3} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          OTP Invalid
        </Alert>
      </Snackbar>
      <Snackbar open={open4} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          OTP sent successfully
        </Alert>
      </Snackbar>
      <Snackbar open={open5} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          OTP not sent
        </Alert>
      </Snackbar>
      <Snackbar open={open6} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Phone/Email Not Verified
        </Alert>
      </Snackbar>

      {/* EMAIL SNACKBARs */}
      <Snackbar open={open7} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Email Not Verified
        </Alert>
      </Snackbar>
      <Snackbar open={open8} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Invalid Email. OTP not sent.
        </Alert>
      </Snackbar>
      <Snackbar open={open9} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Email Verified
        </Alert>
      </Snackbar>
      <Snackbar open={open10} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          OTP sent to Email
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default VendorSignup;
