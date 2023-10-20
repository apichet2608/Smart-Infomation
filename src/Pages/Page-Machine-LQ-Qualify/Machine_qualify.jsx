import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TableMachineLQ from "./components/TableData";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

import axios from "axios";
import StatusButtons from "./components/Button_status";

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

  const [ButtonAPI, setButtonAPI] = useState([]);

  ButtonAPI.sort((a, b) => {
    const order = [
      "ALL",
      "Qualify",
      "Plan",
      "Wait NPI Approve",
      "Wait Manager Approve",
    ];
    return order.indexOf(a.title) - order.indexOf(b.title);
  });

  // ############################################################### FETCH API ##############################################################################################

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
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_machine_lq_qualify
        }/distinct_model_name`,
        {
          params: {
            select_proc_group: select_proc_group.dld_group,
          },
        }
      );
      const jsonData = response.data;
      console.log("Model API");
      console.log(jsonData);
      if (Array.isArray(jsonData) && jsonData.length > 0) {
        setdistinct_model_name(jsonData);
      } else {
        console.log("No data available.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetch_product_name = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_machine_lq_qualify
        }/distinct_product_name`,
        {
          params: {
            select_proc_group: select_proc_group.dld_group,
            select_model_name: select_model_name.dld_model_name,
          },
        }
      );
      const jsonData = response.data;
      console.log("Product API");
      console.log(jsonData);
      if (Array.isArray(jsonData) && jsonData.length > 0) {
        setdistinct_product(jsonData);
      } else {
        console.log("No data available.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetch_build = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_machine_lq_qualify
        }/distinct_build`,
        {
          params: {
            select_proc_group: select_proc_group.dld_group,
            select_model_name: select_model_name.dld_model_name,
            select_product_name: select_product.dld_product,
          },
        }
      );
      const jsonData = response.data;
      // console.log("Build API");
      console.log(jsonData);
      if (Array.isArray(jsonData) && jsonData.length > 0) {
        setdistinct_build(jsonData);
      } else {
        console.log("No data available.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetch_process = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_machine_lq_qualify
        }/distinct_process`,
        {
          params: {
            select_proc_group: select_proc_group.dld_group,
            select_model_name: select_model_name.dld_model_name,
            select_product_name: select_product.dld_product,
            select_build: select_build.dld_build,
          },
        }
      );
      const jsonData = response.data;
      console.log("Process API");
      console.log(jsonData);
      if (Array.isArray(jsonData) && jsonData.length > 0) {
        setdistinct_process(jsonData);
      } else {
        console.log("No data available.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetch_TableData = async () => {
    try {
      const params = new URLSearchParams();
      params.append("select_proc_group", select_proc_group.dld_group);
      params.append("select_model_name", select_model_name.dld_model_name);
      params.append("select_product_name", select_product.dld_product);
      params.append("select_build", select_build.dld_build);
      params.append("select_process", select_process.dld_proc_group_name);

      const url = `${import.meta.env.VITE_IP_API}${
        import.meta.env.VITE_Table_machine_lq_qualify
      }/TableData?${params.toString()}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log("TableData_API");
      console.log(jsonData);

      if (Array.isArray(jsonData) && jsonData.length > 0) {
        setDataAPItable(jsonData);
      } else {
        console.log("No data available.");
        setDataAPItable([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataAPItable([]);
    }
  };

  const [statusfrombtn, setstatusfrombtn] = useState("ALL");
  const fetch_TableData_frombtn = async () => {
    console.log(statusfrombtn);
    try {
      const params = new URLSearchParams();
      params.append("select_proc_group", select_proc_group.dld_group);
      params.append("select_model_name", select_model_name.dld_model_name);
      params.append("select_product_name", select_product.dld_product);
      params.append("select_build", select_build.dld_build);
      params.append("select_process", select_process.dld_proc_group_name);
      params.append("status", statusfrombtn);

      const url = `${import.meta.env.VITE_IP_API}${
        import.meta.env.VITE_Table_machine_lq_qualify
      }/TableData?${params.toString()}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log("TableData_API");
      console.log(jsonData);

      if (Array.isArray(jsonData) && jsonData.length > 0) {
        setDataAPItable(jsonData);
      } else {
        console.log("No data available.");
        setDataAPItable([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataAPItable([]);
    }
  };

  const fetch_buttonAPI = async () => {
    try {
      const params = new URLSearchParams();
      params.append("select_proc_group", select_proc_group.dld_group);
      params.append("select_model_name", select_model_name.dld_model_name);
      params.append("select_product_name", select_product.dld_product);
      params.append("select_build", select_build.dld_build);
      params.append("select_process", select_process.dld_proc_group_name);

      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_machine_lq_qualify
        }/StatusResult?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const jsonData = await response.json();
        console.log(jsonData);
        console.log("Button");
        if (Array.isArray(jsonData) && jsonData.length > 0) {
          setButtonAPI(jsonData);
        } else {
          console.log("No data available.");
          setButtonAPI([]);
        }
      } else {
        console.error("Request failed with status:", response.status);
        setButtonAPI([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setButtonAPI([]);
    }
  };

  // ############################################################### HANDLE ##############################################################################################

  const handleProcGroupChange = (event, newvalue) => {
    if (newvalue === null) {
      setproc_group({ dld_group: "EFPC" });
      setmodel_name({ dld_model_name: "ALL" });
      setselect_product({ dld_product: "ALL" });
      setbuild({ dld_build: "ALL" });
      setselect_process({ dld_proc_group_name: "ALL" });
      setstatusfrombtn("ALL");
    } else {
      setproc_group(newvalue);
      setstatusfrombtn("ALL");
      setmodel_name({ dld_model_name: "ALL" });
      setselect_product({ dld_product: "ALL" });
      setbuild({ dld_build: "ALL" });
      setselect_process({ dld_proc_group_name: "ALL" });
    }
  };

  const handleModelChange = (event, newvalue) => {
    console.log(newvalue);
    if (newvalue === null) {
      setstatusfrombtn("ALL");
      setmodel_name({ dld_model_name: "ALL" });
      setselect_product({ dld_product: "ALL" });
      setbuild({ dld_build: "ALL" });
      setselect_process({ dld_proc_group_name: "ALL" });
    } else {
      setmodel_name(newvalue);
      setstatusfrombtn("ALL");
      setselect_product({ dld_product: "ALL" });
      setbuild({ dld_build: "ALL" });
      setselect_process({ dld_proc_group_name: "ALL" });
    }
  };

  const handleProductChange = (event, newvalue) => {
    console.log(newvalue);
    if (newvalue === null) {
      setstatusfrombtn("ALL");
      setselect_product({ dld_product: "ALL" });
      setbuild({ dld_build: "ALL" });
      setselect_process({ dld_proc_group_name: "ALL" });
    } else {
      setselect_product(newvalue);
      setstatusfrombtn("ALL");
      setbuild({ dld_build: "ALL" });
      setselect_process({ dld_proc_group_name: "ALL" });
    }
  };

  const handleBuildChange = (event, newvalue) => {
    console.log(newvalue);
    if (newvalue === null) {
      setstatusfrombtn("ALL");
      setbuild({ dld_build: "ALL" });
      setselect_process({ dld_proc_group_name: "ALL" });
    } else {
      setbuild(newvalue);
      setstatusfrombtn("ALL");
      setselect_process({ dld_proc_group_name: "ALL" });
    }
  };

  const handleProcessChange = (event, newvalue) => {
    console.log(newvalue);
    if (newvalue === null) {
      setstatusfrombtn("ALL");
      setselect_process({ dld_proc_group_name: "ALL" });
    } else {
      setselect_process(newvalue);
      setstatusfrombtn("ALL");
    }
  };
  const test = (title) => {
    // ทำสิ่งที่คุณต้องการกับ title ที่ได้รับจากปุ่มที่คลิก

    setstatusfrombtn(title);
  };
  // ############################################################### USEEFECT ##############################################################################################

  // useEffect(() => {
  //   fetch_proc_group();
  //   fetch_model_name();
  //   fetch_product_name();
  //   fetch_build();
  //   fetch_process();
  //   fetch_buttonAPI();
  // }, []);

  useEffect(() => {
    fetch_proc_group();
    fetch_model_name();
    fetch_product_name();
    fetch_build();
    fetch_process();
    fetch_buttonAPI();
    // fetch_TableData();
    if (statusfrombtn === "ALL") {
      fetch_TableData();
    } else {
      fetch_TableData_frombtn();
    }
  }, [
    select_proc_group,
    select_model_name,
    select_product,
    select_build,
    select_process,
    statusfrombtn,
  ]);

  // useEffect(() => {
  //   if (statusfrombtn === "ALL") {
  //     fetch_TableData();
  //   } else {
  //     fetch_TableData_frombtn();
  //   }
  // }, [statusfrombtn]);

  // #####################################################################################################################################################################

  return (
    <ThemeProvider theme={theme}>
      {/* <Main open={open}> */}
      {/* <Main open={open}> */}
      {/* <CssBaseline /> */}
      {/* <Container className="custom-container"> */}
      <Grid container spacing={2}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}></Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}></Grid>

        <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5} xl={1.5}>
          {distinct_proc_group && distinct_proc_group.length > 0 && (
            <Item>
              <Autocomplete
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
              />
            </Item>
          )}
        </Grid>
        {/* <Grid item xs={11} sm={11} md={11} lg={11} xl={11}></Grid> */}

        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          {distinct_model_name && distinct_model_name.length > 0 && (
            <Item>
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
            </Item>
          )}
        </Grid>

        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          {distinct_product && distinct_product.length > 0 && (
            <Item>
              <Autocomplete
                size="small"
                options={distinct_product}
                getOptionLabel={(option) => option && option.dld_product}
                value={select_product}
                onChange={handleProductChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product Name"
                    variant="outlined"
                  />
                )}
              />
            </Item>
          )}
        </Grid>

        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          {distinct_build && distinct_build.length > 0 && (
            <Item>
              <Autocomplete
                size="small"
                options={distinct_build}
                getOptionLabel={(option) =>
                  option && option.dld_build ? option.dld_build : "Null"
                }
                value={select_build}
                onChange={handleBuildChange}
                renderInput={(params) => (
                  <TextField {...params} label="Build" variant="outlined" />
                )}
              />
            </Item>
          )}
        </Grid>

        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          {distinct_process && distinct_process.length > 0 && (
            <Item>
              <Autocomplete
                size="small"
                options={distinct_process}
                getOptionLabel={(option) =>
                  option && option.dld_proc_group_name
                }
                value={select_process}
                onChange={handleProcessChange}
                renderInput={(params) => (
                  <TextField {...params} label="Process" variant="outlined" />
                )}
              />
            </Item>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 1 }}>
          <StatusButtons data={ButtonAPI} click={test} css={statusfrombtn} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Item>
            {DataAPItable && DataAPItable.length > 0 && (
              <TableMachineLQ
                datafromAPIlq={DataAPItable}
                update={fetch_TableData}
              />
            )}
          </Item>
        </Grid>
      </Grid>
      {/* </Container> */}
      {/* </Main> */}
    </ThemeProvider>
  );
}
