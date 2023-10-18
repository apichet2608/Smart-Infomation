import * as React from "react";
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

  return (
    <ThemeProvider theme={theme}>
      {/* <Main open={open}> */}
      {/* <Main open={open}> */}
      {/* <CssBaseline /> */}
      {/* <Container className="custom-container"> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button>One</Button>
            <Button>Two</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5} xl={1.5}>
          <Autocomplete
            disablePortal
            size="small"
            id="combo-box-demo"
            options={top100Films}
            renderInput={(params) => (
              <TextField {...params} label="Process Group" />
            )}
          />
        </Grid>
        <Grid item xs={10.5} sm={10.5} md={10.5} lg={10.5} xl={10.5}></Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Item>
            {" "}
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Item>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Item>
            {" "}
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Item>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Item>
            {" "}
            <Autocomplete
              disablePortal
              size="small"
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Stack direction="row" spacing={1}>
            <Chip label="All" onClick={""} />
            <Chip label="Qualify" onClick={""} />
            <Chip label="Wait Manager" onClick={""} />
            <Chip label="Wait Review" onClick={""} />
            <Chip label="Manager Reject" onClick={""} />
            <Chip label="Review Reject" onClick={""} />
            <Chip label="Plan" onClick={""} />
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
