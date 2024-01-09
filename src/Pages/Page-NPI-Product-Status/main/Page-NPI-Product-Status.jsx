import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import MainDatagrid from "../components/MainDatagrid";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";

function NPIProductStatus({ isDarkMode }) {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 640, // breakpoint xs
        sm: 768, // breakpoint sm
        md: 1024, // breakpoint md
        lg: 1488, // breakpoint lg
        xl: 1872, // breakpoint xl
      },
    },
  });

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      {/* <Grid container spacing={2}> */}
      <div className="mt-16 grid grid-cols-1">
        <MainDatagrid isDarkMode={isDarkMode} />
      </div>
      {/* </Grid> */}
      {/* </ThemeProvider> */}
    </>
  );
}

export default NPIProductStatus;
