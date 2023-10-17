import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { formatdatewithtime } from "../../../utils/formatdate";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Edit as EditIcon } from "@mui/icons-material";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import ErrorIcon from "@mui/icons-material/Error";
import LinkIcon from "@mui/icons-material/Link";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CircleIcon from "@mui/icons-material/Circle";
import Chip from "@mui/material/Chip";
import axios from "axios";

import Swal from "sweetalert2";

import Avatar from "@mui/material/Avatar";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ScheduleIcon from "@mui/icons-material/Schedule";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import BlockIcon from "@mui/icons-material/Block";

function TableData({ dataAPI, update }) {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [message, setMessage] = useState("");

  const [openCalibrationDialog, setOpenCalibrationDialog] = useState(false);
  const [calibrationMachine, setCalibrationMachine] = useState("");
  const [calibrationData, setCalibrationData] = useState([]);

  const [openSCRDialog, setOpenSCRDialog] = useState(false);
  const [SCRMachine, setSCRMachine] = useState("");
  const [SCRData, setSCRData] = useState([]);

  const [openUPDDialog, setOpenUPDDialog] = useState(false);
  const [UPDMachine, setUPDMachine] = useState("");
  const [UPDData, setUPDData] = useState([]);

  const [openOEEDialog, setOpenOEEDialog] = useState(false);
  const [OEEMachine, setOEEMachine] = useState("");
  const [OEEData, setOEEData] = useState([]);

  const [openNoDataChip, setOpenNoDataChip] = useState(false);

  const handleOpenCalibrationDialog = (machine) => {
    setCalibrationMachine(machine);
    setMessage(machine);

    axios
      .get(
        `http://10.17.66.242:3000/smart_information/smart_machine_connect_list/cal?mc_ref=${machine}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setCalibrationData(response.data);
          setOpenCalibrationDialog(true);
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

  const handleOpenSCR = (row) => {
    setSCRMachine(row.machine);
    setMessage(row.machine);
    if (row.scr === "ACTIVE") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Active : Machine Ready",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    axios
      .get(
        `http://10.17.66.242:3000/smart_information/smart_machine_connect_list/scr?mc_code=${row.machine}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setSCRData(response.data);
          setOpenSCRDialog(true);
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

  const handleOpenUPD = (machine) => {
    setUPDMachine(machine);
    setMessage(machine);

    axios
      .get(
        `http://10.17.66.242:3000/smart_information/smart_machine_connect_list/upd?dld_machine=${machine}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          console.log("UPD");
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

  const handleOpenOEE = (machine) => {
    setOEEMachine(machine);
    setMessage(machine);

    axios
      .get(
        `http://127.0.0.1:3000/smart_information/smart_machine_connect_list/oee?oee_machine=${machine}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          console.log("UPD");
          setOEEData(response.data);
          setOpenOEEDialog(true);
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

  const calibrationColumns = [
    { field: "equipment_code", headerName: "Equipment Code", width: 150 },
    { field: "equipment_desc", headerName: "Equipment Desc", width: 250 },
    {
      field: "due_date",
      headerName: "Due Date",
      width: 150,
      renderCell: (params) => {
        return formatdatewithtime(params.row.due_date);
      },
    },
    {
      field: "plan_date",
      headerName: "Plan Date",
      width: 150,
      renderCell: (params) => {
        return formatdatewithtime(params.row.plan_date);
      },
    },
    {
      field: "last_date",
      headerName: "Last Date",
      width: 150,
      renderCell: (params) => {
        return formatdatewithtime(params.row.last_date);
      },
    },
    { field: "status_filter", headerName: "Status Filter", width: 130 },
    { field: "wsm_status_name", headerName: "WSM Status", width: 150 },
    { field: "mc_ref", headerName: "MC_ref", width: 150 },
  ];

  const scrColumns = [
    { field: "mc_code", headerName: "Machine Code", width: 150 },
    { field: "mc_desc", headerName: "Machine Desc", width: 400 },
    { field: "cc_code", headerName: "CC Code", width: 120 },
    {
      field: "req_date",
      headerName: "Req date",
      width: 200,
      renderCell: (params) => {
        return formatdatewithtime(params.row.req_date);
      },
    },
    { field: "status_desc", headerName: "Status Desc", width: 250 },
    { field: "status_filter", headerName: "Status Filter", width: 150 },
  ];

  const updColumns = [
    { field: "dld_group", headerName: "Group", width: 80 },
    { field: "dld_machine", headerName: "Machine", width: 120 },
    { field: "dld_product", headerName: "Product", width: 180 },
    { field: "dld_proc_name", headerName: "Proc", width: 80 },
    {
      field: "dld_customer_name",
      headerName: "Customer",
      width: 230,
    },
    { field: "dld_model_name", headerName: "Model", width: 230 },
    { field: "dld_build", headerName: "Build", width: 300 },
    {
      field: "dld_proc_cust_name",
      headerName: "Proc_cust",
      width: 220,
    },
    { field: "dld_year", headerName: "Year", width: 80 },

    {
      field: "dld_customer_box",
      headerName: "Customer Box",
      width: 120,
      renderCell: (params) => {
        if (params.value === null) {
          return null; // หากค่าเป็น null, ไม่แสดงข้อมูลเลย
        }

        return (
          <Button
            component="a"
            variant="outlined"
            justifyContent="center"
            href={params.value}
            target=""
            rel="noopener noreferrer"
            style={{ color: "#2980B9" }}
          >
            <DownloadIcon />
          </Button>
        );
      },
    },
    {
      field: "dld_ok2s",
      headerName: "OK2S",
      width: 100,
      renderCell: (params) => {
        if (params.value === null) {
          return null; // หากค่าเป็น null, ไม่แสดงข้อมูลเลย
        }

        return (
          <Button
            component="a"
            variant="outlined"
            justifyContent="center"
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#2980B9" }}
          >
            <LinkIcon />
          </Button>
        );
      },
    },
  ];

  const oeeColumns = [
    {
      field: "date_time",
      headerName: "Date",
      width: 180,
      renderCell: (params) => {
        return formatdatewithtime(params.row.date_time);
      },
    },
    { field: "mc_code", headerName: "Machine", width: 180 },
    { field: "build", headerName: "Build", width: 180 },
    { field: "auto_run", headerName: "Proc", width: 180 },
  ];

  //---------------------Apichet---------------------------//
  const handleFileUpload = async (event, row) => {
    const uploadedFile = event.target.files[0];
    console.log(uploadedFile.name);
    console.log(row.id);

    if (uploadedFile) {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_IP_API_UPLOAD}${
            import.meta.env.VITE_PATHUPLOAD
          }/upload`,
          formData
        );

        if (response.status === 200) {
          console.log("File uploaded successfully");
        } else {
          console.error("File upload failed");
        }
      } catch (error) {
        console.error("Error while uploading file:", error);
      }
    }

    if (uploadedFile) {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      try {
        const response = await axios.put(
          `${import.meta.env.VITE_IP_API}${
            import.meta.env.VITE_Table_smart_machine_connect_list
          }/updatemachine_buyoff/${row.id}`,
          {
            machine_buyoff: uploadedFile.name,
          }
        );

        if (response.status === 200) {
          alert("Data updated successfully");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while updating data");
      }
      update();
    }
  };

  const handleDownload = (text) => {
    const downloadUrl = `${import.meta.env.VITE_IP_API_UPLOAD}${
      import.meta.env.VITE_PATHDOWLOAD
    }/download/${text}`;
    console.log(downloadUrl);
    window.open(downloadUrl, "_blank");
  };
  //---------------------Apichet---------------------------//

  const columns = [
    // { field: "building", headerName: "Building", width: 200 },
    { field: "process", headerName: "Process", width: 110 },
    { field: "item_owner_cc", headerName: "CC", width: 80 },
    {
      field: "machine",
      headerName: "Machine",
      width: 110,
      renderCell: (params) => {
        const machine = params.value;

        const handleClick = () => {
          setSelectedMachine(machine);
          setMessage(machine);
        };

        return (
          <>
            <div
              style={{ color: "#2980B9", cursor: "pointer" }}
              onClick={handleClick}
            >
              {machine}
            </div>
            {/* {selectedMachine === machine && <div>{message}</div>} */}
          </>
        );
      },
    },

    {
      field: "scada",
      headerName: "SCADA",
      width: 130,
      renderCell: (params) => (
        <>
          {params.value === "Finished" && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon style={{ fontSize: 20, color: "#2ECC71" }} />
              &nbsp;Finished
            </div>
          )}
          {params.value === "Planed" && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <AccessTimeFilledIcon
                style={{ fontSize: 20, color: "#F7DC6F" }}
              />
              &nbsp;Planed
            </div>
          )}
          {params.value === "Wait for plan" && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <ErrorIcon style={{ fontSize: 20, color: "#F8C471" }} />
              &nbsp;Wait for plan
            </div>
          )}
          {params.value === "Null" && <div style={{ color: "#ABB2B9" }}></div>}
        </>
      ),
    },

    {
      field: "pm",
      headerName: "PM",
      width: 100,
      renderCell: (params) => (
        <>
          {params.value === "Active" && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon style={{ fontSize: 20, color: "#2ECC71" }} />
              &nbsp;Active
            </div>
          )}
          {params.value === "On plan" && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon style={{ fontSize: 20, color: "#2ECC71" }} />
              &nbsp;Active
            </div>
          )}
          {params.value === "Warning" && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <ErrorIcon style={{ fontSize: 20, color: "#F8C471" }} />
              &nbsp;Warning
            </div>
          )}
          {params.value === "Lock / Inactive" && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <RemoveCircleIcon style={{ fontSize: 20, color: "#EC7063" }} />
              &nbsp;Lock
            </div>
          )}
          {params.value === "Null" && <div style={{ color: "#ABB2B9" }}></div>}
        </>
      ),
    },

    {
      field: "calibration",
      headerName: "Calibration",
      width: 100,
      renderCell: (params) => (
        <>
          {params.value === null ? (
            <></>
          ) : (
            <>
              <IconButton
                onClick={() => handleOpenCalibrationDialog(params.row.machine)}
                sx={{ padding: 1 }}
              >
                {params.value === "On plan" && (
                  <CheckCircleIcon style={{ fontSize: 20, color: "#2ECC71" }} />
                )}
                {params.value === "Warning" && (
                  <ErrorIcon style={{ fontSize: 20, color: "#F8C471" }} /> // Red : #EC7063
                )}
                {params.value !== "On plan" && params.value !== "Warning" && (
                  <></>
                )}
                &nbsp;
                <span style={{ color: "black", fontSize: 14, ml: 1 }}>
                  {params.value === "On plan" ? "Active" : params.value || ""}
                </span>
              </IconButton>
            </>
          )}
        </>
      ),
    },

    {
      field: "scr",
      headerName: "SCR",
      width: 130,
      renderCell: (params) => {
        let icon, text, color;

        switch (params.value) {
          case "ACTIVE":
            icon = (
              <CheckCircleIcon style={{ fontSize: 20, color: "#2ECC71" }} />
            );
            text = "Active";
            color = "black";
            break;
          case "BREAKDOWN":
            icon = (
              <BuildCircleIcon style={{ fontSize: 21, color: "#EC7063" }} />
            );
            text = "Breakdown";
            color = "black";
            break;
          case "OTHER":
            icon = <ErrorIcon style={{ fontSize: 20, color: "#F8C471" }} />;
            text = "Other Repair";
            color = "black";
            break;
          default:
            icon = null;
            text = params.value || "";
            color = "black";
            break;
        }
        return (
          <IconButton
            onClick={() => handleOpenSCR(params.row)}
            sx={{ padding: 1 }}
          >
            {icon}
            &nbsp;
            <span style={{ color, fontSize: 14, ml: 1 }}>{text}</span>
          </IconButton>
        );
      },
    },

    { field: "grr", headerName: "GR&R", width: 120 },
    // { field: "mtbf", headerName: "MTBF", width: 120 },
    // { field: "mttr", headerName: "MTTR", width: 120 },
    {
      field: "oee",
      headerName: "OEE",
      width: 520,
      renderCell: (params) => {
        if (params.row.oee === null || params.row.upd === "") {
          return (
            <div>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <DoNotDisturbOnIcon style={{ fontSize: 20, color: "#CCD1D1 " }} />
            </div>
          );
        }

        return (
          <Button
            style={{
              color: "#2980B9",
              cursor: "pointer",
              width: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="outlined"
            onClick={() => handleOpenOEE(params.row.machine)}
          >
            {params.value}
          </Button>
        );
      },
    },
    //---------------------Apichet---------------------------//
    {
      field: "machine_buyoff",
      headerName: "Machine Buyoff",
      width: 130,
      renderCell: (params) => {
        if (params.row.machine_buyoff === null) {
          return (
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              style={{
                backgroundColor: "#FFFF", // Blue color
                textTransform: "none",
                borderRadius: "0.25rem",
              }}
            >
              Upload
              <input
                type="file"
                onChange={(event) => handleFileUpload(event, params.row)}
                style={{ display: "none" }}
                aria-describedby="file_input_help"
                id="file_input"
              />
            </Button>
          );
        } else {
          return (
            <Button
              variant="contained"
              size="small"
              startIcon={<FileDownloadIcon />}
              style={{
                color: "#FFFF",
                backgroundColor: "#3498DB",
                textTransform: "none",
                borderRadius: "0.25rem",
              }}
              onClick={() => handleDownload(params.value)}
            >
              Download
            </Button>
          );
        }
      },
    },

    //---------------------Apichet---------------------------//
    {
      field: "upd",
      headerName: "UPD Link",
      width: 120,
      renderCell: (params) => {
        if (params.row.upd === null || params.row.upd === "") {
          // return <p>No UPD</p>;

          // return (
          //   <Chip
          //     label="NO UPD"
          //     color="default" // กำหนดสีเป็นสีเทา
          //     style={{ backgroundColor: "#EAEDED ", color: "black" }} // กำหนดสีพื้นหลังและสีตัวอักษร
          //   />
          // );

          return (
            <div>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <DoNotDisturbOnIcon style={{ fontSize: 20, color: "#CCD1D1 " }} />
            </div>
          );
        }

        return (
          <Button
            style={{
              color: "#2980B9",
              cursor: "pointer",
              width: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="outlined"
            onClick={() => handleOpenUPD(params.row.machine)}
          >
            {params.value}
          </Button>
        );
      },
    },

    { field: "history_track", headerName: "History track", width: 120 },
    { field: "predictive", headerName: "Predictive", width: 120 },
  ];

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [csvData, setCsvData] = useState([]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredItems = dataAPI.filter((item) => {
    return (
      (item.building &&
        item.building.toLowerCase().includes(search.toLowerCase())) ||
      (item.process &&
        item.process.toLowerCase().includes(search.toLowerCase())) ||
      (item.item_owner_cc &&
        item.item_owner_cc.toLowerCase().includes(search.toLowerCase())) ||
      (item.machine &&
        item.machine.toLowerCase().includes(search.toLowerCase())) ||
      (item.scada &&
        item.scada.toString().toLowerCase().includes(search.toLowerCase())) ||
      (item.grr &&
        item.grr.toString().toLowerCase().includes(search.toLowerCase())) ||
      (item.oee &&
        item.oee.toString().toLowerCase().includes(search.toLowerCase())) ||
      (item.upd &&
        item.upd.toString().toLowerCase().includes(search.toLowerCase())) ||
      (item.scr &&
        item.scr.toString().toLowerCase().includes(search.toLowerCase())) ||
      (item.mtbf &&
        item.mtbf.toString().toLowerCase().includes(search.toLowerCase())) ||
      (item.mttr &&
        item.mttr.toString().toLowerCase().includes(search.toLowerCase())) ||
      (item.machine_buyoff &&
        item.machine_buyoff
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (item.calibration &&
        item.calibration
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (item.history_track &&
        item.history_track
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (item.predictive &&
        item.predictive.toString().toLowerCase().includes(search.toLowerCase()))
    );
  });

  useEffect(() => {
    // When dataAPI changes, update the rows
    setRows(dataAPI);
  }, [dataAPI]);

  const getRowClassName = (params) => ({
    "custom-row": true,
    style: { backgroundColor: "#f5f5f5" }, // Light gray background color
  });

  return (
    <div style={{ height: 680, width: "100%" }}>
      <Box display="flex" justifyContent="flex-end" marginBottom="10px">
        <TextField
          label="Search"
          value={search}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
        />
      </Box>
      <DataGrid
        rows={filteredItems}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        getRowClassName={getRowClassName}
      />

      <Dialog
        open={openCalibrationDialog}
        onClose={() => setOpenCalibrationDialog(false)}
        // fullWidth={false}
        maxWidth="xl"
      >
        <DialogTitle>Calibration Data for {calibrationMachine}</DialogTitle>
        <DialogContent>
          <DataGrid rows={calibrationData} columns={calibrationColumns} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenCalibrationDialog(false)}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

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

      <Dialog
        open={openUPDDialog}
        onClose={() => setOpenUPDDialog(false)}
        // fullWidth={false}
        maxWidth="xl"
      >
        <DialogTitle>UPD Data for {UPDMachine}</DialogTitle>
        <DialogContent>
          <DataGrid rows={UPDData} columns={updColumns} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUPDDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openOEEDialog}
        onClose={() => setOpenOEEDialog(false)}
        // fullWidth={false}
        maxWidth="xl"
      >
        <DialogTitle>OEE Data for {OEEMachine}</DialogTitle>
        <DialogContent>
          <DataGrid rows={OEEData} columns={oeeColumns} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOEEDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <div>
        <h1>
          Machine:&nbsp;
          {message}{" "}
          {openNoDataChip && (
            <Chip label="NO DATA" onClose={() => setOpenNoDataChip(false)} />
          )}
        </h1>
        {/* <p>{message}</p> */}

        {/* Table */}
        {/* ... */}
      </div>
    </div>
  );
}

export default TableData;
