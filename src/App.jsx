import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Appbarcomponents from "./Components/Common/Appbar/AppbarComponents";
import Container from "@mui/material/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageDemo from "./Pages/Page-Demo/PageDemo1";
import "./Css/ContainerMain.css";
import Infomation from "./Pages/Page-smart_information/smart-infomation";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export default function PersistentDrawerLeft() {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
        <Appbarcomponents />
        {/* <ThemeProvider theme={theme}> */}
        {/* <Main open={open}> */}
        <Main open={open}>
          {/* <CssBaseline /> */}
          <Container className="custom-container">
            <>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Infomation />
                    </>
                  }
                />
                <Route
                  path="/smart-information"
                  element={
                    <>
                      <Infomation />
                    </>
                  }
                />
              </Routes>
            </>
          </Container>
        </Main>
        {/* </ThemeProvider> */}
      </Box>
    </Router>
  );
}
