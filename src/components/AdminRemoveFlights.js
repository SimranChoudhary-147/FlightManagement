import * as React from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useNavigate } from "react-router-dom";

const AdminRemoveFlight = () => {
  const tenderName = window.sessionStorage.getItem("tenderName");

  const navigate = useNavigate();

  var no;

  const logout = () => {
    axios({
      url: "http://localhost:8000/logout",
      method: "GET",
      withCredentials: true,
      crossDomain: true,
    }).then((res) => {
      // console.log(res)
    });
    navigate("/");
  };

  // const deleteIt = async (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);

  //   const credential = {
  //     flightno: data.flightno,
  //     admin: true,
  //   };

  //   console.log("==========================")
  //   console.log(credential);
  //   console.log("==========================")

  //   axios({
  //     url: "http://localhost:8000/delete_flight",
  //     method: "GET",
  //     withCredentials: true,
  //     crossDomain: true,
  //     data:credential,
  //   }).then((res) => {
  //     // console.log(res)
  //   });
  //   navigate("/");
  // };

  const [rows, setRows] = React.useState([]); // {id: 1, flightno: "6E-420", flightname:"Indigo", source: "Bengaluru", destination: "Mumbai", price: "10500", seats: 50}

  const removeFlight = async (e) => {
    console.log("Remove ", e.flightno);

    const credential = {
      flightno: e.flightno,
      admin: true,
    };

    axios({
      url: "http://localhost:8000/delete_flight",
      method: "DELETE",
      withCredentials: true,
      crossDomain: true,
      data: credential,
    }).then((res) => {
      if (res.data.status === "success") {
        console.log("remove successful");
        window.location.reload();
      } else {
        console.log("remove not successful");
      }
    });
  };

  const columns = [
    {
      field: "flightno",
      headerName: "Flight No",
      flex: 1,
      maxWidth: 200,
    },
    {
      field: "flightname",
      headerName: "Flight Name",
      flex: 1,
      maxWidth: 200,
    },
    {
      field: "source",
      headerName: "Source",
      flex: 1,
      maxWidth: 200,
    },
    {
      field: "destination",
      headerName: "Destination",
      flex: 1,
      maxWidth: 200,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      maxWidth: 200,
    },
    {
      field: "seats",
      headerName: "Seats",
      flex: 1,
      maxWidth: 200,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      maxWidth: 200,
    },
    {
      field: "Button",
      flex: 1,
      maxWidth: 100,
      renderCell: (params) => {
        return (
          <Box textAlign="center">
            <Button
              type="button"
              // variant="text"
              color="primary"
              onClick={() => {
                removeFlight(params.row);
              }}
              // console.log("Delete flight")
            >
              <CancelRoundedIcon color="error" />
            </Button>
          </Box>
        );
      },
    },
  ];

  React.useEffect(() => {
    axios({
      url: "http://localhost:8000/get_all_flight",
      method: "GET",
      withCredentials: true,
      crossDomain: true,
    }).then((res) => {
      // console.log(res);
      const data = [];
      console.log("New res data: ", res);
      let cnt = 1;
      for (var i = 0; i < res.data.length; i++) {
        // if (
        //   res.data[i].tenderName === tenderName &&
        //   res.data[i].stud.length !== 0
        // ) {
        var obj = {
          id: cnt++,
          flightno: res.data[i].flightno,
          flightname: res.data[i].flightname,
          source: res.data[i].from,
          destination: res.data[i].to,
          price: res.data[i].price,
          seats: res.data[i].seats,
          date: res.data[i].date,
        };
        // if (obj.withdraw === 0) obj.withdraw = "";
        // if (obj.withdraw === 1) obj.withdraw = "YES.";
        data.push(obj);
        setRows(data);
      }
      // }
      // console.log(rows);
    });
  }, []);

  return (
    <>
      <Box>
        {/* Navbar */}
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
                Remove Flights
              </Typography>
              <IconButton
                edge="start"
                color="warning"
                aria-label="Logout"
                onClick={logout}
              >
                <Typography variant="caption" color="">
                  Logout&nbsp;
                </Typography>{" "}
                <LoginIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>

        {/* Body */}

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "68vh",
                  backgroundColor: "#D4F1F4",
                }}
              >
                <Typography
                  variant="h5"
                  color="text.primary"
                  sx={{ ml: 2, fontWeinght: "bold" }}
                >
                  {tenderName}
                </Typography>
                <br />
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "55vh",
                  }}
                >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                  />
                </Paper>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AdminRemoveFlight;
