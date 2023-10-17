import React, { useState } from "react";

function UPD_Dialog(props) {
  const [openUPDDialog, setOpenUPDDialog] = useState(false);
  const [UPDMachine, setUPDMachine] = useState("");
  const [UPDData, setUPDData] = useState([]);

  const [openNoDataChip, setOpenNoDataChip] = useState(false);

  const handleOpenUPD = (machine) => {
    setUPDMachine(machine);
    setMessage(machine);

    axios
      .get(
        `http://10.17.66.242:3000/smart_information/smart_machine_connect_list/upd?dld_machine=${machine}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          console.log("test");
          setUPDData(response.data);
          setOpenUPDDialog(true);
          setOpenNoDataChip(false); // ปิดการแสดง Chip เมื่อมีข้อมูล
        } else {
          // ไม่มีข้อมูล ให้แสดง "No DATA"
          setOpenNoDataChip(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching calibration data:", error);
      });
  };

  return (
    <div>
      <Dialog
        open={openSCRDialog}
        onClose={() => setOpenSCRDialog(false)}
        // fullWidth={false}
        maxWidth="xl"
      >
        <DialogTitle>SCR Data for {SCRMachine}</DialogTitle>
        <DialogContent>
          <DataGrid rows={SCRData} columns={scrColumns} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSCRDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      > )}
    </div>
  );
}

export default Dialog;
