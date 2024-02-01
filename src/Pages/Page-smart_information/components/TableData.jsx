import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { formatdatewithtime } from "../../../utils/formatdate";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Edit as EditIcon } from "@mui/icons-material";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
import { styled } from "@mui/material/styles";

import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

//*Styled Components
const StyledDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
    color: "#3371ff",
    fontSize: "14px",
  },
  "& ::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "& ::-webkit-scrollbar-track": {
    backgroundColor: "#ffffff",
  },
  "& ::-webkit-scrollbar-thumb": {
    borderRadius: "4px",
    backgroundColor: "#3b82f6",
  },
  borderRadius: "16px",
});

function TableData({ dataAPI, update, refreshtable, isDarkMode }) {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [message, setMessage] = useState("");

  const [openCalibrationDialog, setOpenCalibrationDialog] = useState(false);
  const [calibrationMachine, setCalibrationMachine] = useState("");
  const [calibrationData, setCalibrationData] = useState([]);

  const [openPMDialog, setOpenPMDialog] = useState(false);
  const [PM_Machine, setPM_Machine] = useState("");
  const [PMData, setPMData] = useState([]);

  const [openSCRDialog, setOpenSCRDialog] = useState(false);
  const [SCRMachine, setSCRMachine] = useState("");
  const [SCRData, setSCRData] = useState([]);

  const [openUPDDialog, setOpenUPDDialog] = useState(false);
  const [UPDMachine, setUPDMachine] = useState("");
  const [UPDData, setUPDData] = useState([]);

  const [openOEEDialog, setOpenOEEDialog] = useState(false);
  const [OEEMachine, setOEEMachine] = useState("");
  const [OEEData, setOEEData] = useState([]);

  const [openGRRDialog, setOpenGRRDialog] = useState(false);
  const [GRRMachine, setGRRMachine] = useState("");
  const [GRRData, setGRRData] = useState([]);

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

  const handleOpenPMDialog = (machine) => {
    setPM_Machine(machine);
    setMessage(machine);

    axios
      .get(
        `http://10.17.66.242:3000/smart_information/smart_machine_connect_list/pm?mc_code=${machine}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setPMData(response.data);
          setOpenPMDialog(true);
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
        `http://10.17.66.242:3000/smart_information/smart_machine_connect_list/oee?oee_machine=${machine}`
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

  const handleOpenGRR = (machine) => {
    setGRRMachine(machine);
    setMessage(machine);

    axios
      .get(
        `http://10.17.66.242:3000/smart_information/smart_machine_connect_list/grr?grr_machine=${machine}`
        // `http://127.0.0.1:3000/smart_information/smart_machine_connect_list/grr?grr_machine=${machine}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          console.log("GR&R");
          setGRRData(response.data);
          setOpenGRRDialog(true);
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
      width: 120,
      align: "center",
      headerAlign: "center",
      // renderCell: (params) => {
      //   return formatdatewithtime(params.row.due_date);
      // },
    },
    {
      field: "plan_date",
      headerName: "Plan Date",
      width: 120,
      align: "center",
      headerAlign: "center",
      // renderCell: (params) => {
      //   return formatdatewithtime(params.row.plan_date);
      // },
    },
    {
      field: "last_date",
      headerName: "Last Date",
      width: 120,
      align: "center",
      headerAlign: "center",
      // renderCell: (params) => {
      //   return formatdatewithtime(params.row.last_date);
      // },
    },
    {
      field: "next_date",
      headerName: "Next Date",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status_filter",
      headerName: "Status Filter",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "wsm_status_name",
      headerName: "WSM Status",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "mc_ref",
      headerName: "MC_ref",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
  ];

  const pmColumns = [
    {
      field: "mc_code",
      headerName: "Machine Code",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "mc_desc",
      headerName: "Machine Desc",
      width: 280,
      // align: "center",
      // headerAlign: "center",
    },
    {
      field: "due_date",
      headerName: "Due Date",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "plan_date",
      headerName: "Plan Date",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actual_date",
      headerName: "Actual Date",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "last_date",
      headerName: "Last Date",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "next_date",
      headerName: "Next Date",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "cc_code",
      headerName: "CC Code",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status_desc",
      headerName: "Status Desc",
      width: 230,
      // align: "center",
      // headerAlign: "center",
    },
    {
      field: "stats_mc",
      headerName: "Status Machine",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
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
    { field: "mc_code", headerName: "Machine", width: 150 },
    { field: "process_group", headerName: "Process Group", width: 120 },
    { field: "buiding", headerName: "Building", width: 120 },
    { field: "auto_run", headerName: "Proc", width: 120 },
    { field: "power_on", headerName: "Power ON", width: 120 },
    { field: "power_off", headerName: "Power OFF", width: 120 },
    { field: "target_oee", headerName: "Target OEE", width: 120 },
    { field: "rounded_percent_oee", headerName: "Percent OEE", width: 120 },
    {
      field: "rounded_percent_available",
      headerName: "Percent available",
      width: 130,
    },
  ];

  const grrColumns = [
    {
      field: "create_at",
      headerName: "Create Date",
      width: 140,
      renderCell: (params) => {
        return formatdatewithtime(params.row.create_at);
      },
    },
    { field: "mc_code", headerName: "Machine", width: 110 },
    { field: "grr_desc", headerName: "GR&R Desc", width: 150 },
    { field: "plan", headerName: "Plan Date", width: 140 },
    { field: "actual", headerName: "Actual", width: 140 },
    {
      field: "upload",
      headerName: "Upload",
      headerAlign: "center",
      align: "center",
      width: 120,
      renderCell: (params) => {
        if (params.row.upload === null) {
          return (
            <div>
              <DoNotDisturbOnIcon style={{ fontSize: 20, color: "#CCD1D1 " }} />
            </div>
          );
        } else {
          return (
            <Button
              variant="contained"
              size="small"
              startIcon={<FileDownloadIcon />}
              style={{
                color: "#0E6655",
                backgroundColor: "#D0ECE7",
                textTransform: "none",
                borderRadius: "0.25rem",
              }}
              onClick={() => handleGRRDownload(params.value)}
            >
              Download
            </Button>
          );
        }
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
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
            import.meta.env.VITE_PATHUPLOAD_machine_buyoff
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
      import.meta.env.VITE_PATHDOWLOAD_machine_buyoff
    }/download/${text}`;
    console.log(downloadUrl);
    window.open(downloadUrl, "_blank");
  };

  // DOWLLOAD FILE GR&R

  const handleGRRDownload = (text) => {
    const downloadUrl = `${import.meta.env.VITE_IP_API_UPLOAD}${
      import.meta.env.VITE_PATHDOWLOAD_grr_upload
    }/download/${text}`;
    console.log(downloadUrl);
    window.open(downloadUrl, "_blank");
  };

  // const handleDelete = async (text) => {
  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //     cancelButtonText: "Cancel", // Added a Cancel button
  //   });

  //   if (!result.isConfirmed) {
  //     // User canceled the deletion
  //     return;
  //   }

  //   try {
  //     // Delete the file
  //     const fileResponse = await axios.delete(
  //       `${import.meta.env.VITE_IP_API_UPLOAD}${
  //         import.meta.env.VITE_PATHDELETE
  //       }/delete/${text.what_happen_need}`
  //     );

  //     if (fileResponse.status === 200) {
  //       console.log("File deleted successfully");
  //     } else {
  //       console.log("File delete failed");
  //     }

  //     // Update data
  //     const dataResponse = await axios.put(
  //       `${import.meta.env.VITE_IP_API}${
  //         import.meta.env.VITE_smart_kpi_a1_main
  //       }/deletewhat_happen_needJson/${text.id}`
  //     );

  //     if (dataResponse.status === 200) {
  //       console.log("Data updated successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error while deleting file:", error);
  //   }

  //   // Refresh the table or update UI as needed
  //   refreshtable();
  // };

  const handleFileUpload_is = async (event, row) => {
    const uploadedFile = event.target.files[0];
    console.log(uploadedFile.name);
    console.log(row.id);

    if (uploadedFile) {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_IP_API_UPLOAD}${
            import.meta.env.VITE_PATHUPLOAD_manual_is
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
          }/updatemachine_manual_is/${row.id}`,
          {
            history_track: uploadedFile.name,
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

  const handleDownload_is = (text) => {
    const downloadUrl = `${import.meta.env.VITE_IP_API_UPLOAD}${
      import.meta.env.VITE_PATHDOWLOAD_manual_is
    }/download/${text}`;
    console.log(downloadUrl);
    window.open(downloadUrl, "_blank");
  };

  const handleDelete_is = async (text) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel", // Added a Cancel button
    });

    if (!result.isConfirmed) {
      // User canceled the deletion
      return;
    }

    try {
      // Delete the file

      const dataResponse = await axios.put(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smart_machine_connect_list
        }/deletewhat_manual_is/${text.id}`
      );

      if (fileResponse.status === 200) {
        console.log("File deleted successfully");
      } else {
        console.log("File delete failed");
      }

      // Update data
      const fileResponse = await axios.delete(
        `${import.meta.env.VITE_IP_API_UPLOAD}${
          import.meta.env.VITE_Table_smart_machine_connect_list
          // }/delete/${text.history_track}`
        }/deletewhat_manual_is/${text.id}`
      );

      if (dataResponse.status === 200) {
        console.log("Data updated successfully");
      }
    } catch (error) {
      console.error("Error while deleting file:", error);
    }

    // Refresh the table or update UI as needed
    refreshtable();
  };
  //---------------------Apichet---------------------------//

  const columns = [
    // { field: "building", headerName: "Building", width: 200 },
    {
      field: "process",
      headerName: "Process",
      width: 120,
      headerAlign: "center",
    },
    {
      field: "item_owner_cc",
      headerName: "CC",
      width: 120,
      headerAlign: "center",
    },
    {
      field: "machine",
      headerName: "Machine",
      width: 120,
      headerAlign: "center",
      renderCell: (params) => {
        const machine = params.value;

        const handleClick = () => {
          setSelectedMachine(machine);
          setMessage(machine);
        };

        return (
          <>
            <div
              style={{ color: "#0ea5e9", cursor: "pointer" }}
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
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        params.value === null ? (
          <div>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <DoNotDisturbOnIcon style={{ fontSize: 20, color: "#CCD1D1" }} />
          </div>
        ) : (
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
          </>
        ),
    },

    {
      field: "pm",
      headerName: "PM",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {params.value === null ? (
            <div>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <DoNotDisturbOnIcon style={{ fontSize: 20, color: "#CCD1D1" }} />
            </div>
          ) : (
            <>
              <IconButton
                onClick={() => handleOpenPMDialog(params.row.machine)}
                sx={{ padding: 1 }}
              >
                {params.value === "Active" || params.value === "On plan" ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 14,
                      color: isDarkMode ? "#ffffff" : "#000000",
                    }}
                  >
                    <CheckCircleIcon
                      style={{ fontSize: 18, color: "#2ECC71" }}
                    />
                    &nbsp;Active
                  </div>
                ) : null}
                {params.value === "Warning" ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 14,
                      color: isDarkMode ? "#ffffff" : "#000000",
                    }}
                  >
                    <ErrorIcon style={{ fontSize: 18, color: "#F8C471" }} />
                    &nbsp;Warning
                  </div>
                ) : null}
                {params.value === "Lock / Inactive" ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 14,
                      color: isDarkMode ? "#ffffff" : "#000000",
                    }}
                  >
                    <RemoveCircleIcon
                      style={{ fontSize: 18, color: "#EC7063" }}
                    />
                    &nbsp;Lock
                  </div>
                ) : null}
              </IconButton>
            </>
          )}
        </>
      ),
    },

    {
      field: "calibration",
      headerName: "Calibration",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {params.value === null ? (
            <>
              <div>
                <DoNotDisturbOnIcon
                  style={{
                    fontSize: 20,
                    color: "#CCD1D1 ",
                    justifyContent: "center",
                  }}
                />
              </div>
            </>
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
                <span
                  style={{ fontSize: 14, ml: 1 }}
                  className={`${isDarkMode ? "text-white" : "text-black"}`}
                >
                  {params.value === "On plan" ? "Active" : params.value || ""}
                </span>
              </IconButton>
            </>
          )}
        </>
      ),
    },

    // {
    //   field: "scr",
    //   headerName: "SCR",
    //   width: 140,
    //   renderCell: (params) => {
    //     let icon, text, color;
    //     if (params.value === null) {
    //       icon = (
    //         <div>
    //           &nbsp; &nbsp;
    //           <DoNotDisturbOnIcon style={{ fontSize: 20, color: "#CCD1D1" }} />
    //         </div>
    //       );
    //     } else {
    //       switch (params.value) {
    //         case "ACTIVE":
    //           icon = (
    //             <CheckCircleIcon style={{ fontSize: 20, color: "#2ECC71" }} />
    //           );
    //           text = "Active";
    //           color = "black";
    //           break;
    //         case "BREAKDOWN":
    //           icon = (
    //             <BuildCircleIcon style={{ fontSize: 21, color: "#EC7063" }} />
    //           );
    //           text = "Breakdown";
    //           color = "black";
    //           break;
    //         case "OTHER":
    //           icon = <ErrorIcon style={{ fontSize: 20, color: "#F8C471" }} />;
    //           text = "Other Repair";
    //           color = "black";
    //           break;
    //         default:
    //           icon = null;
    //           text = params.value || "";
    //           color = "black";
    //           break;
    //       }
    //     }

    //     return (
    //       <IconButton
    //         onClick={() => handleOpenSCR(params.row)}
    //         sx={{ padding: 1 }}
    //       >
    //         {icon}
    //         &nbsp;
    //         <span style={{ color, fontSize: 14, ml: 1 }}>{text}</span>
    //       </IconButton>
    //     );
    //   },
    // },

    {
      field: "grr",
      headerName: "GR&R",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.row.grr === null || params.row.grr === "") {
          return (
            <div>
              <DoNotDisturbOnIcon style={{ fontSize: 20, color: "#CCD1D1 " }} />
            </div>
          );
        }

        return (
          <FileDownloadDoneIcon
            style={{
              color: "#3498DB",
              cursor: "pointer",
              width: "26px",
              height: "26px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => handleOpenGRR(params.row.machine)}
          />
        );
      },
    },
    // { field: "mtbf", headerName: "MTBF", width: 120 },
    // { field: "mttr", headerName: "MTTR", width: 120 },
    {
      field: "oee",
      headerName: "OEE",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        if (params.row.oee === null || params.row.oee === "") {
          return (
            <div>
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
      width: 120,
      align: "center",
      headerAlign: "center",
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
      align: "center",
      headerAlign: "center",
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

    {
      field: "history_track",
      headerName: "Manual IS",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (
          params.row.history_track === null ||
          params.row.history_track === ""
        ) {
          return (
            <Tooltip title={params.row.history_track}>
              <IconButton
                aria-label="upload"
                component="label" // เพิ่มบรรทัดนี้
                style={{
                  color: "#3498DB",
                  backgroundColor: "#F8F9F9",
                  textTransform: "none",
                  borderRadius: "0.25rem",
                  width: "30px",
                  height: "30px",
                }}
              >
                <CloudUploadIcon />
                <input
                  type="file"
                  onChange={(event) => handleFileUpload_is(event, params.row)}
                  style={{ display: "none" }}
                  aria-describedby="file_input_help"
                  id="file_input"
                />
              </IconButton>
            </Tooltip>
          );
        } else {
          return (
            <Tooltip title={params.row.history_track}>
              <IconButton
                aria-label="dowload"
                style={{
                  color: "#FFFF",
                  backgroundColor: "#3498DB",
                  textTransform: "none",
                  borderRadius: "0.25rem",
                  width: "25px",
                  height: "25px",
                }}
                onClick={() => handleDownload_is(params.value)}
              >
                <FileDownloadIcon sx={{ width: "20px", height: "20px" }} />
              </IconButton>

              <IconButton
                aria-label="dowload"
                style={{
                  color: "#FFFF",
                  backgroundColor: "#f3582d",
                  textTransform: "none",
                  borderRadius: "0.25rem",
                  marginLeft: "5px",
                  width: "25px",
                  height: "25px",
                }}
                onClick={() => handleDelete_is(params.row)}
              >
                <DeleteForeverIcon sx={{ width: "18px", height: "18px" }} />
              </IconButton>
            </Tooltip>
          );
        }
      },
    },
    // {
    //   field: "predictive",
    //   headerName: "Predictive",
    //   width: 150,
    //   headerAlign: "center",
    // },
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
    <>
      {/* <div
        className={`flex justify-end mb-2 w-fit ${
          isDarkMode ? "bg-white" : ""
        }`}
      >
        <TextField
          label="Search"
          value={search}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
        />
      </div> */}
      <StyledDataGrid
        rows={filteredItems}
        columns={columns}
        pageSize={5}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        rowsPerPageOptions={[5, 10, 20]}
        getRowClassName={getRowClassName}
        sx={{
          "& .MuiDataGrid-cell": {
            borderRight: isDarkMode ? "1px solid #676767" : "1px solid #e3e3e3",
            borderBottom: isDarkMode
              ? "1px solid #676767"
              : "1px solid #e3e3e3",
            color: isDarkMode ? "#FFFFFF" : "#000000", // Set text color based on isDarkMode
          },
          "& .MuiIconButton-root": {
            color: "#3371ff",
          },
          "& .MuiTablePagination-root": {
            color: isDarkMode ? "#FFFFFF" : "#000000", // Set text color for pagination text
          },
          "& .MuiInputBase-input": {
            color: isDarkMode ? "#FFFFFF" : "#000000", // Set text color for input
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: isDarkMode ? "#FFFFFF" : "#000000", // Set color for the underline
          },
          "& .MuiDataGrid-columnHeader": {
            borderRight: isDarkMode ? "1px solid #676767" : "1px solid #e3e3e3",
            borderBottom: isDarkMode
              ? "1px solid #676767"
              : "1px solid #e3e3e3",
            borderTop: isDarkMode ? "1px solid #676767" : "1px solid #e3e3e3",
          },
          height: 700,
        }}
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

      {/* -----------------------------PM--------------------------------------------- */}
      <Dialog
        open={openPMDialog}
        onClose={() => setOpenPMDialog(false)}
        // fullWidth={false}
        maxWidth="xl"
      >
        <DialogTitle>PM Data for {PM_Machine}</DialogTitle>
        <DialogContent>
          <DataGrid rows={PMData} columns={pmColumns} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPMDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* --------------------------------------------------------------------------- */}

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

      <Dialog
        open={openGRRDialog}
        onClose={() => setOpenGRRDialog(false)}
        // fullWidth={false}
        maxWidth="xl"
      >
        <DialogTitle>OEE Data for {GRRMachine}</DialogTitle>
        <DialogContent>
          <DataGrid rows={GRRData} columns={grrColumns} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGRRDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* <div>
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
      {/* </div> */}
    </>
  );
}

export default TableData;
