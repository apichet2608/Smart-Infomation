import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { NavLink, useLocation } from "react-router-dom";

export default function Title() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const getPageTitle = () => {
      switch (location.pathname) {
        case "/":
          return "NPI Product Status";
        case "/npi-product-status":
          return "NPI Product Status";
        case "/smart-information":
          return "Machine Information";
        case "/machine-lq-qualify":
          return "Machine LQ Qualify";
        case "/machine-lq-sub-lock":
          return "Machine LQ Sub Lock";
        // case "/Smart-Factory-Dept":
        //   return "Smart-Factory-Dept";
        case "/ul-product":
          return "UL Product";
        default:
          return "";
      }
    };
    const title = getPageTitle();
    setPageTitle(title);
  }, [location.pathname]);

  return (
    <>
      <Typography variant="h6" noWrap component="div">
        {pageTitle}
      </Typography>
    </>
  );
}
