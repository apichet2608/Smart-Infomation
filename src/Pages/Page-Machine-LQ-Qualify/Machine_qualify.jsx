import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TableMachineLQ from "./components/TableData";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Machine_lq() {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0, // breakpoint xs
        sm: 600, // breakpoint sm
        md: 960, // breakpoint md
        lg: 1280, // breakpoint lg
        xl: 1900, // breakpoint xl
      },
    },
  });

  const [distinct_proc_group, setdistinct_proc_group] = useState([]);
  const [select_proc_group, setproc_group] = useState({ dld_group: "EFPC" });

  const [distinct_model_name, setdistinct_model_name] = useState([]);
  const [select_model_name, setmodel_name] = useState({
    dld_model_name: "ALL",
  });

  const [distinct_product, setdistinct_product] = useState([]);
  const [select_product, setselect_product] = useState({
    dld_product: "ALL",
  });

  const [distinct_build, setdistinct_build] = useState([]);
  const [select_build, setbuild] = useState({
    dld_build: "ALL",
  });

  const [distinct_process, setdistinct_process] = useState([]);
  const [select_process, setselect_process] = useState({
    dld_proc_group_name: "ALL",
  });

  const [DataAPItable, setDataAPItable] = useState([]);

  const fetch_proc_group = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_machine_lq_qualify
        }/distinct_process_group`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      console.log("Process group");
      setdistinct_proc_group(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetch_model_name = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_machine_lq_qualify
        }/distinct_model_name`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      console.log("Process group");
      setdistinct_model_name(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetch_product_name = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_machine_lq_qualify
        }/distinct_product_name`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      console.log("Product name");
      setdistinct_product(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetch_build = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_machine_lq_qualify
        }/distinct_build`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      console.log("Product name");
      setdistinct_build(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetch_process = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_machine_lq_qualify
        }/distinct_process`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      console.log("Product name");
      setdistinct_process(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetch_TableData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_machine_lq_qualify
        }/TableData`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      console.log("Product name");
      setDataAPItable(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //   const handleProcGroupChange = (event, newvalue) => {
  //     console.log(newvalue);
  //     if (newvalue === null) {
  //       setproc_group({ dld_group: "EFPC" });
  //     } else {
  //       setproc_group(newvalue);
  //     }
  //   };

  const handleModelChange = (event, newvalue) => {
    console.log(newvalue);
    if (newvalue === null) {
      setmodel_name({ dld_model_name: "ALL" });
    } else {
      setmodel_name(newvalue);
    }
  };

  const handleProductChange = (event, newvalue) => {
    console.log(newvalue);
    if (newvalue === null) {
      setselect_product({ dld_product: "ALL" });
    } else {
      setselect_product(newvalue);
    }
  };

  const handleBuildChange = (event, newvalue) => {
    console.log(newvalue);
    if (newvalue === null) {
      setbuild({ dld_build: "ALL" });
    } else {
      setbuild(newvalue);
    }
  };

  const handleProcessChange = (event, newvalue) => {
    console.log(newvalue);
    if (newvalue === null) {
      setselect_process({ dld_proc_group_name: "ALL" });
    } else {
      setselect_process(newvalue);
    }
  };

  useEffect(() => {
    fetch_proc_group();
    fetch_model_name();
    fetch_product_name();
    fetch_build();
    fetch_process();

    fetch_TableData();
  }, []);

  //   useEffect(() => {
  //     if (select_proc_group.dld_group !== "ALL") {
  //       fetch_model();
  //       //   fetchDataTable();
  //     }
  //   }, [select_proc_group]);

  const [selectedButton, setSelectedButton] = React.useState("EFPC");

  const handleButtonClick = (value) => {
    setSelectedButton(value);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Main open={open}> */}
      {/* <Main open={open}> */}
      {/* <CssBaseline /> */}
      {/* <Container className="custom-container"> */}
      <Grid container spacing={2}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button
                onClick={() => handleButtonClick("EFPC")}
                style={{
                  backgroundColor:
                    selectedButton === "EFPC" ? "#3498DB" : "transparent",
                  width: "150px",
                  height: "40px",
                  fontSize: "16px",
                  color: selectedButton === "EFPC" ? "#EBF5FB" : "#2980B9", // สีตัวอักษร
                }}
              >
                EFPC
              </Button>
              <Button
                onClick={() => handleButtonClick("SMT")}
                style={{
                  backgroundColor:
                    selectedButton === "SMT" ? "#3498DB" : "transparent",
                  width: "150px",
                  height: "40px",
                  fontSize: "16px",
                  color: selectedButton === "SMT" ? "#EBF5FB" : "#2980B9", // สีตัวอักษร
                }}
              >
                SMT
              </Button>
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}></Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
          {/* <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={distinct_proc_group}
            getOptionLabel={(option) =>
              option && option.dld_group ? option.dld_group : ""
            }
            value={select_proc_group}
            onChange={handleProcGroupChange}
            sx={{ width: "100%", display: "inline-block" }}
            renderInput={(params) => (
              <TextField {...params} label="Process Group" />
            )}
          /> */}
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11} xl={11}></Grid>

        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Autocomplete
            disablePortal
            size="small"
            id="combo-box-demo"
            options={distinct_model_name}
            getOptionLabel={(option) =>
              option && option.dld_model_name ? option.dld_model_name : ""
            }
            value={select_model_name}
            onChange={handleModelChange}
            renderInput={(params) => (
              <TextField {...params} label="Model Name" />
            )}
          />
        </Grid>

        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Autocomplete
            size="small"
            options={distinct_product}
            getOptionLabel={(option) => option && option.dld_product}
            value={select_product}
            onChange={handleProductChange}
            renderInput={(params) => (
              <TextField {...params} label="Product Name" variant="outlined" />
            )}
          />
        </Grid>

        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Autocomplete
            size="small"
            options={distinct_build}
            getOptionLabel={(option) => option && option.dld_build}
            value={select_build}
            onChange={handleBuildChange}
            renderInput={(params) => (
              <TextField {...params} label="Build" variant="outlined" />
            )}
          />
        </Grid>

        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Autocomplete
            size="small"
            options={distinct_process}
            getOptionLabel={(option) => option && option.dld_proc_group_name}
            value={select_process}
            onChange={handleProcessChange}
            renderInput={(params) => (
              <TextField {...params} label="Process" variant="outlined" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Item>
            {DataAPItable && DataAPItable.length > 0 && (
              <TableMachineLQ datafromAPIlq={DataAPItable} />
            )}
          </Item>
        </Grid>
      </Grid>
      {/* </Container> */}
      {/* </Main> */}
    </ThemeProvider>
  );
}
