import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";
import DialogContentText from "@mui/material/DialogContentText"; // Import DialogContentText separately
import Table_PM from "./Table_PM";

const PM_Dialog = (props) => {
  const { openPM, onClosePM, dld_machine } = props;
  const [DataPM, setDataPM] = useState([]);

  const fetch_Table_PM = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_machine_lq_qualify
        }/Get_data_pm`,
        {
          params: {
            dld_machine: dld_machine,
          },
        }
      );

      console.log("Table PM : ", response.data); // Changed jsonData to response.data
      setDataPM(response.data); // Changed jsonData to response.data
    } catch (error) {
      console.error("Error fetching PM data:", error); // Handle error
    }
  };

  useEffect(() => {
    fetch_Table_PM();
  }, [dld_machine]);

  return (
    <Dialog open={openPM} onClose={onClosePM} maxWidth="auto" fullWidth>
      <DialogTitle>PM Data for {dld_machine}</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <Table_PM DataPM={DataPM} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClosePM}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PM_Dialog;
