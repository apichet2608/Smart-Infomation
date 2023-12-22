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
import "./Css/ContainerMain.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Infomation from "./Pages/Page-smart_information/smart-infomation";
import MachineLQ from "./Pages/Page-Machine-LQ-Qualify/machine_lq_qualify";
import Machine_lq from "./Pages/Page-Machine-LQ-Qualify/Machine_qualify";
import NPIProductStatus from "./Pages/Page-NPI-Product-Status/main/Page-NPI-Product-Status";
import Navbar from "./Components/Common/Navbar/navbar";
import { useDarkMode } from "../src/Components/Common/DarkModeContext/DarkModeContext";
import { useLocation } from "react-router-dom";

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
  const { isDarkMode } = useDarkMode();

  const theme = useTheme();
  const location = useLocation();

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#676767" : "#FFFFFF",
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        minWidth: "100vw",
      }}
    >
      <>
        <Box sx={{ display: "flex" }}>
          {/* <CssBaseline /> */}
          <Navbar isDarkMode={isDarkMode} />
          {/* <ThemeProvider theme={theme}> */}
          {/* <Main open={open}> */}
          <Main open={open}>
            {/* <CssBaseline /> */}

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <NPIProductStatus isDarkMode={isDarkMode} />
                  </>
                }
              />
              <Route
                path="/npi-product-status"
                element={
                  <>
                    <NPIProductStatus isDarkMode={isDarkMode} />
                  </>
                }
              />
              <Route
                path="/smart-information"
                element={
                  <>
                    <Infomation isDarkMode={isDarkMode} />
                  </>
                }
              />
              <Route
                path="/machine-lq-qualify"
                element={
                  <>
                    <Machine_lq isDarkMode={isDarkMode} />
                  </>
                }
              />
            </Routes>
          </Main>
          {/* </ThemeProvider> */}
        </Box>
      </>
    </div>
  );
}
