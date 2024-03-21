import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import axios from "axios";
import Swal from "sweetalert2";

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="200"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

function DataGridComponents({ lock_data, refresh_upd, refresh_sub_lock_all }) {
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [dataTable, setdataTable] = React.useState([]);
  const [dataTableSelect, setdataTableSelect] = React.useState([]);

  const [updateBy, setUpdateBy] = React.useState("");

  const RowSelectData = (value) => {
    const foundData = dataTable.filter((item) => value.includes(item.id));
    console.log("Row Select:", foundData);
    setRowSelectionModel(value);
    setdataTableSelect(foundData);
  };

  const handleReset = () => {
    setRowSelectionModel([]);
    setdataTableSelect([]);
  };

  const handleSaveLock = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Prepare the data array from the selected items
        const newData = dataTableSelect.map((item) => ({
          sub_lock: "Y", // Assuming you want to set all selected to "Y"
          machine: item.machine,
          process: item.process,
          product: item.product,
          update_by: updateBy,
        }));

        axios
          .post(
            `${import.meta.env.VITE_IP_API}${
              import.meta.env.VITE_Table_smart_machine_upd_lq_sub_lock
            }/add_sub_lock`,
            newData // Send the array of objects
          )
          .then((response) => {
            console.log("Data added successfully:", response.data);

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your data has been added successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            refresh_upd();
            refresh_sub_lock_all();
          })
          .catch((error) => {
            console.error("Error adding data:", error);
          });
      }
    });
  };

  useEffect(() => {
    if (lock_data && lock_data.length > 0) {
      setdataTable(lock_data);
    } else {
      setdataTable([]);
    }
  }, [lock_data]);

  const columns = [
    {
      field: "sub_lock",
      headerName: "Sub Lock",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (cellValues) => {
        return cellValues.value === "Y" ? (
          <div
            style={{
              color: "white",
              backgroundColor: "#EC7063",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "85%",
              borderRadius: 5,
              fontWeight: "bold",
            }}
          >
            Lock{" "}
            <RemoveCircleIcon
              style={{ marginLeft: 5, color: "white", width: 15 }}
            />
          </div>
        ) : (
          <div>
            {/* <LockOpenIcon sx={{ width: 18, color: "#138D75" }} /> */}
          </div>
        );
      },
    },
    {
      field: "machine",
      headerName: "Machine",
      width: 180,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <span style={{ color: "#34495E", fontWeight: "bold" }}>
          {params.value}
        </span>
      ),
    },
    {
      field: "process",
      headerName: "Process",
      width: 180,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      align: "center",
      headerAlign: "center",
      hide: true,
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Typography
          sx={{
            ml: 1,
            fontWeight: "bold",
            backgroundColor: "#E8DAEF",
            color: "#8E44AD",
            borderRadius: 1,
            padding: 0.5,
          }}
        >
          Machine UPD List
        </Typography>
        <Typography sx={{ ml: 1, fontSize: 15, color: "#E74C3C" }}>
          *Please select machine for lock scan
        </Typography>
        <div style={{ flexGrow: 1 }}></div>
        <Typography
          sx={{
            mr: 78,
            backgroundColor: "#D0ECE7",
            color: "#0E6655",
            fontWeight: "bold",
            borderRadius: 1,
            padding: 0.5,
          }}
        >
          Machine select for lock scan
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: 570,
          width: "100%",
        }}
        className="grid gap-4"
      >
        <DataGrid
          //Check Box Select
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            RowSelectData(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          //Check Box Select

          rows={dataTable}
          columns={columns}
          pageSize={5}
          // disableRowSelectionOnClick
          // getRowHeight={() => "auto"}
          rowHeight={30}
          slots={{
            toolbar: GridToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            "& .MuiDataGrid-cell": {
              borderRight: "1px solid #e0e0e0",
              // borderTop: "1px solid #e0e0e0",
            },
            "& .MuiDataGrid-columnHeader": {
              borderRight: "1px solid #e0e0e0",
              borderTop: "1px solid #e0e0e0",
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              color: "#3371ff",
              fontSize: "14px",
              textAlign: "center",
              FontFace: "Poppins",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            "& .MuiCheckbox-root svg": {
              color: "#CACFD2",
            },
            "& .MuiCheckbox-root.Mui-checked svg": {
              color: "#3498DB",
            },
            backgroundColor: "#fff",
          }}
        />

        <DataGrid
          rows={dataTableSelect}
          columns={columns}
          pageSize={5}
          rowHeight={30}
          slots={{
            toolbar: GridToolbar,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            "& .MuiDataGrid-cell": {
              borderRight: "1px solid #e0e0e0",
              // borderTop: "1px solid #e0e0e0",
            },
            "& .MuiDataGrid-columnHeader": {
              borderRight: "1px solid #e0e0e0",
              borderTop: "1px solid #e0e0e0",
              alignItems: "center",
              justifyContent: "center",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              color: "#3371ff",
              fontSize: "14px",
              textAlign: "center",
              FontFace: "Poppins",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            backgroundColor: "#fff",
          }}
        />
      </div>
      {/* ให้ปุ่มอยู่ชิดขวา */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: 10,
          marginTop: 10,
        }}
      >
        <TextField
          size="small"
          label="Update By"
          variant="outlined"
          value={updateBy}
          onChange={(e) => setUpdateBy(e.target.value)}
          sx={{ mr: 1, backgroundColor: "white" }} // Add some spacing before the Reset button
        />
        <Button
          onClick={handleReset}
          variant="contained"
          sx={{
            borderRadius: 2,
            backgroundColor: "#F39C12",
            color: "#fff",
            ":hover": { backgroundColor: "#D35400" },
            mr: 1,
          }}
        >
          Reset
          <RotateLeftIcon style={{ marginLeft: 1, width: 20 }} />
        </Button>
        <Button
          onClick={handleSaveLock}
          variant="contained"
          sx={{
            borderRadius: 2,
            backgroundColor: "#EC7063",
            color: "#fff",
            ":hover": { backgroundColor: "#A93226" },
          }}
        >
          Lock
          <BlockIcon style={{ marginLeft: 1, width: 20 }} />
        </Button>
      </div>
    </div>
  );
}

export default DataGridComponents;
