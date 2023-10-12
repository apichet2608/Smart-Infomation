import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";

import TableData from "./components/TableData";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Infomation() {
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

  const [distinct_building, setdistinct_building] = useState([]);
  const [select_building, setbuilding] = useState({ item_building: "ALL" });

  const [distinct_process, setdistinct_process] = useState([]);
  const [select_process, setprocess] = useState({ item_sub_process: "ALL" });

  const [distinct_machine, setdistinct_machine] = useState([]);
  const [select_machine, setmachine] = useState({ item_code: "ALL" });

  const [DataAPItable, setDataAPItable] = useState([]);
  // const [TableCal, setTableCal] = useState([]);

  const fetch_building = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smart_machine_connect_list
        }/distinct_building`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      console.log("Building");
      setdistinct_building(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetch_process = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smart_machine_connect_list
        }/distinct_process`,
        {
          params: {
            select_building: select_building.item_building,
          },
        }
      );
      const jsonData = response.data;
      console.log("Process");
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

  const fetch_machine = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smart_machine_connect_list
        }/distinct_machine`,
        {
          params: {
            select_building: select_building.item_building,
            select_process: select_process.item_sub_process,
          },
        }
      );
      const jsonData = response.data;
      console.log("Process");
      console.log(jsonData);
      if (Array.isArray(jsonData) && jsonData.length > 0) {
        setdistinct_machine(jsonData);
      } else {
        console.log("No data available.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTableData = async () => {
    try {
      // Create a new URLSearchParams object to construct the query string
      const params = new URLSearchParams();
      params.append("select_building", select_building.item_building);
      params.append("select_process", select_process.item_sub_process);
      params.append("select_machine", select_machine.item_code);

      const url = `${import.meta.env.VITE_IP_API}${
        import.meta.env.VITE_Table_smart_machine_connect_list
      }/TableData?${params.toString()}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log("TableData_API");
      console.log(jsonData);

      if (Array.isArray(jsonData) && jsonData.length > 0) {
        setDataAPItable(jsonData);
      } else {
        console.log("No data available.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBuildingChange = (event, newvalue) => {
    console.log(newvalue);
    if (newvalue === null) {
      setbuilding({ item_building: "ALL" });
      setprocess({ item_sub_process: "ALL" });
      setmachine({ item_code: "ALL" });
    } else {
      setbuilding(newvalue);

      setprocess({ item_sub_process: "ALL" });
      setmachine({ item_code: "ALL" });
    }
  };

  const handleProcessChange = (event, newvalue) => {
    console.log(newvalue);
    if (newvalue === null) {
      setprocess({ item_sub_process: "ALL" });
      setmachine({ item_code: "ALL" });
    } else {
      setprocess(newvalue);
      setmachine({ item_code: "ALL" });
    }
  };

  const handleMachineChange = (event, newvalue) => {
    console.log(newvalue);
    if (newvalue === null) {
      setprocess({ item_sub_process: "ALL" });
      setmachine({ item_code: "ALL" });
    } else {
      if (newvalue === "") {
        setmachine({ item_code: "ALL" });
      } else {
        setmachine(newvalue);
      }
    }
  };

  useEffect(() => {
    fetch_building();
    fetch_process();
    fetch_machine();
  }, []);

  useEffect(() => {
    if (select_building.item_building !== "ALL") {
      fetch_process();
    }
  }, [select_building]);

  useEffect(() => {
    if (
      select_building.item_building !== "ALL" &&
      select_process.item_sub_process !== "ALL"
    ) {
      fetch_machine();
    }
  }, [select_building, select_process]);

  useEffect(() => {
    if (
      select_building &&
      select_building.item_building !== "" &&
      select_process &&
      select_process.item_sub_process !== "" &&
      select_machine &&
      select_machine.item_code !== ""
    ) {
      fetchTableData();
    }
  }, [select_building, select_process, select_machine]);

  return (
    <ThemeProvider theme={theme}>
      {/* <Main open={open}> */}
      {/* <Main open={open}> */}
      {/* <CssBaseline /> */}
      {/* <Container className="custom-container"> */}
      <Grid container spacing={2}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Item>
            {distinct_building && distinct_building.length > 0 && (
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={distinct_building}
                getOptionLabel={(option) =>
                  option && option.item_building ? option.item_building : ""
                }
                value={select_building}
                onChange={handleBuildingChange}
                sx={{ width: "100%", display: "inline-block" }}
                renderInput={(params) => (
                  <TextField {...params} label="Building" />
                )}
              />
            )}
          </Item>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Item>
            {distinct_process && distinct_process.length > 0 && (
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={distinct_process}
                getOptionLabel={(option) =>
                  option && option.item_sub_process
                    ? option.item_sub_process
                    : ""
                }
                value={select_process}
                onChange={handleProcessChange}
                sx={{ width: "100%", display: "inline-block" }}
                renderInput={(params) => (
                  <TextField {...params} label="Process" />
                )}
              />
            )}
          </Item>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Item>
            {distinct_machine && distinct_machine.length > 0 && (
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={distinct_machine}
                getOptionLabel={(option) =>
                  option && option.item_code ? option.item_code : ""
                }
                value={select_machine}
                onChange={handleMachineChange}
                sx={{ width: "100%", display: "inline-block" }}
                renderInput={(params) => (
                  <TextField {...params} label="Machine" />
                )}
              />
            )}
          </Item>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          {/* {TableCal && TableCal.length > 0 && (
            <TableData datafromAPICal={TableCal} />
          )} */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {DataAPItable && DataAPItable.length > 0 && (
            <TableData dataAPI={DataAPItable} />
          )}
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {TableCal && TableCal.length > 0 && (
            <TableData datafromAPICal={TableCal} />
          )}
        </Grid> */}
      </Grid>
      {/* </Container> */}
      {/* </Main> */}
    </ThemeProvider>
  );
}
