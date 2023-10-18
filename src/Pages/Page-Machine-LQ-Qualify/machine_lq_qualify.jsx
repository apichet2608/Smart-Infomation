import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import MachineTable from "./components/TableData";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];

export default function MachineLQ() {
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
  const [select_proc_group, setproc_group] = useState({ dld_group: "ALL" });

  const [distinct_model_name, setdistinct_model_name] = useState([]);
  const [select_model_name, setmodel_name] = useState({
    dld_model_name: "ALL",
  });

  // const [distinct_machine, setdistinct_machine] = useState([]);
  // const [select_machine, setmachine] = useState({ item_code: "ALL" });

  // const [distinct_machine, setdistinct_machine] = useState([]);
  // const [select_machine, setmachine] = useState({ item_code: "ALL" });

  // Import setdistinct_proc_group if it's not already imported

  const fetch_proc_group = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_machine_lq_qualify
        }/distinct_process_group`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      console.log("Proess group");
      setdistinct_proc_group(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetch_model_name = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_VITE_Table_machine_lq_qualify
        }/distinct_model_name`,
        {
          params: {
            select_proc_group: select_proc_group.dld_group,
          },
        }
      );
      const jsonData = response.data;
      console.log("Model");
      console.log(jsonData);
      if (Array.isArray(jsonData) && jsonData.length > 0) {
        setdistinct_model_name(jsonData);
      } else {
        console.log("No data available.");
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  const handleProcGroupChange = (event, newvalue) => {
    console.log(newvalue);

    if (newvalue === null) {
      setproc_group({ dld_group: "ALL" });
    } else {
      setproc_group(newvalue);
    }
  };

  const handleModelChange = (event, newvalue) => {
    console.log(newvalue);
    if (newvalue === null) {
      setproc_group({ dld_group: "ALL" });
      // setmodel_name({ dld_model_name: "ALL" });
      // setmachine({ item_code: "ALL" });
    } else {
      setmodel_name(newvalue);

      // setmodel_name({ dld_model_name: "ALL" });
      // setmachine({ item_code: "ALL" });
    }
  };

  useEffect(() => {
    fetch_proc_group();
    fetch_model_name();
  }, []);

  useEffect(() => {
    if (select_proc_group.dld_group !== "ALL") {
      fetch_model_name();
    }
  }, [select_proc_group]);

  useEffect(() => {
    if (
      select_proc_group.dld_group !== "ALL" &&
      select_model_name.dld_model_name !== "ALL"
    ) {
      fetch_machine();
    }
  }, [select_building, select_process]);

  return (
    <ThemeProvider theme={theme}>
      {/* <Main open={open}> */}
      {/* <Main open={open}> */}
      {/* <CssBaseline /> */}
      {/* <Container className="custom-container"> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {/* <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button>One</Button>
            <Button>Two</Button>
          </ButtonGroup> */}
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
          {distinct_proc_group && distinct_proc_group.length > 0 && (
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
          )}
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11} xl={11}></Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          {distinct_model_name && distinct_model_name.length > 0 && (
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={distinct_model_name}
              getOptionLabel={(option) =>
                option && option.dld_model_name ? option.dld_model_name : ""
              }
              value={select_model_name}
              onChange={handleModelChange}
              sx={{ width: "100%", display: "inline-block" }}
              renderInput={(params) => (
                <TextField {...params} label="Model Name" />
              )}
            />
          )}
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Autocomplete
            disablePortal
            size="small"
            id="combo-box-demo"
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Autocomplete
            disablePortal
            size="small"
            id="combo-box-demo"
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Stack direction="row" spacing={1}>
            <Chip label="All" />
            <Chip label="Qualify" />
            <Chip label="Wait Manager" />
            <Chip label="Wait Review" />
            <Chip label="Manager Reject" />
            <Chip label="Review Reject" />
            <Chip label="Plan" />
            {/* <Chip label="Plan" onClick={""} /> */}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Item>
            <MachineTable />
          </Item>
        </Grid>
      </Grid>
      {/* </Container> */}
      {/* </Main> */}
    </ThemeProvider>
  );
}
