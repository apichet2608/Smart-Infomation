import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import styled from "@mui/material/styles/styled";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { useEffect, useState } from "react";
import axios from "axios";

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

export default function OnClickLqListDialog({
  openLqList,
  handleCloseDialogLdList,
  rowsLq,
  isDarkMode,
  dldProcNameLqOptions,
  dldProcNameLq,
  setDldProcNameLq,
  countLqQualify,
  countLqPlan,
  countLqWna,
  countLqWma,
  showStateCustomerName,
  setDldStatus,
  dldStatus,
}) {
  const columnsLq = [
    {
      field: "year",
      headerName: "Year",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dld_status",
      headerName: "Status",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.value === "Qualify") {
          return <div className="text-green-500 font-bold">{params.value}</div>;
        }
        if (params.value === "Plan") {
          return <div className="text-rose-500 font-bold">{params.value}</div>;
        }
        if (params.value === "Wait NPI Approve") {
          return (
            <div className="text-yellow-500 font-bold">{params.value}</div>
          );
        }
        if (params.value === "Wait Manager Approve") {
          return (
            <div className="text-yellow-500 font-bold">{params.value}</div>
          );
        }
      },
    },
    {
      field: "dld_machine",
      headerName: "Machine",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dld_customer_name",
      headerName: "Customer Name",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dld_product",
      headerName: "Product",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dld_proc_name",
      headerName: "Process Name",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div
            className={`${dldProcNameLq ? "text-violet-600 font-bold" : ""}`}
          >
            {params.value}
          </div>
        );
      },
    },
    {
      field: "dld_proc_cust_name",
      headerName: "Process Customer Name",
      width: 240,
      headerAlign: "center",
    },
    {
      field: "dld_duedate",
      headerName: "Lock Date",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const statusQualify = ["Q", "-", "F", ""];

  const handleQualify = () => {
    // Cycle through the status values
    setDldStatus(statusQualify[currentIndex]);

    // Update the index for the next click
    setCurrentIndex((currentIndex + 1) % statusQualify.length);
  };

  return (
    <>
      <Dialog
        open={openLqList}
        maxWidth="xl"
        maxHeight="80vh"
        PaperProps={{
          style: {
            backgroundColor: isDarkMode ? "#565656" : "#F1F1F1", // Set your desired background color
          },
        }}
        className="animate-fade"
      >
        <DialogTitle>
          <div className="flex place-content-between">
            <div className="font-bold text-blue-500 drop-shadow">
              {showStateCustomerName}
            </div>
            <div
              className={`py-2 px-4 duration-300 w-72 rounded-2xl shadow-md ${
                isDarkMode ? "bg-zinc-800" : "bg-white"
              }`}
            >
              <Autocomplete
                disablePortal
                id="procNameLq"
                value={dldProcNameLq}
                options={dldProcNameLqOptions || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Process Name"
                    variant="standard"
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: isDarkMode ? "#ffffff" : "inherit",
                        fontWeight: "bold",
                      },
                      "& .MuiInput-input": {
                        color: "#8c37e9", // Set the default text color
                        fontWeight: "bold",
                      },
                      "& .MuiInput-underline:before": {
                        borderBottomColor: isDarkMode ? "#ffffff" : "inherit", // Change the underline color
                      },
                      "& .MuiIconButton-root": {
                        color: isDarkMode ? "#ffffff" : "inherit", // Change the clear value button color
                      },
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div className="whitespace-pre-wrap font-semibold mr-10 text-purple-600">
                      {option}
                    </div>
                  </li>
                )}
                onChange={(event, value) => {
                  setDldProcNameLq(value ? value : "");
                }}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="grid md:grid-cols-4 mb-4 gap-4 grid-cols-2">
            <div
              onClick={() => {
                handleQualify();
              }}
              className={`card duration-300 shadow-lg ${
                isDarkMode ? "bg-zinc-800 text-white" : "bg-white text-black"
              } hover:cursor-pointer ${
                dldStatus === "Q" || dldStatus === "-" || dldStatus === "F"
                  ? "border-green-500 border-2"
                  : ""
              }`}
            >
              <div className="card-body">
                <h2 className="card-title text-green-500 drop-shadow-sm flex justify-center">
                  Qualify{" "}
                  <span
                    className={`bg-green-100 px-3 rounded-lg absolute -right-6 -top-6 ${
                      dldStatus === "" ||
                      dldStatus === "P" ||
                      dldStatus === "A" ||
                      dldStatus === "WA"
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    {statusQualify ? statusQualify[currentIndex - 1] : ""}
                  </span>
                </h2>
                <p
                  className={`font-bold text-3xl text-center p-1 rounded-xl ${
                    isDarkMode ? "bg-zinc-700" : "bg-slate-100"
                  }`}
                >
                  {countLqQualify}
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setDldStatus("P");
              }}
              className={`card duration-300 shadow-lg ${
                isDarkMode ? "bg-zinc-800 text-white" : "bg-white text-black"
              } hover:cursor-pointer ${
                dldStatus === "P" ? "border-rose-500 border-2" : ""
              }`}
            >
              <div className="card-body">
                <h2 className="card-title text-rose-500 drop-shadow-sm flex justify-center">
                  Plan
                </h2>
                <p
                  className={`font-bold text-3xl text-center p-1 rounded-xl ${
                    isDarkMode ? "bg-zinc-700" : "bg-slate-100"
                  }`}
                >
                  {countLqPlan}
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setDldStatus("A");
              }}
              className={`card duration-300 shadow-lg ${
                isDarkMode ? "bg-zinc-800 text-white" : "bg-white text-black"
              } hover:cursor-pointer ${
                dldStatus === "A" ? "border-yellow-500 border-2" : ""
              }`}
            >
              <div className="card-body">
                <h2 className="card-title text-yellow-500 drop-shadow-sm flex justify-center">
                  Wait NPI
                </h2>
                <p
                  className={`font-bold text-3xl text-center p-1 rounded-xl ${
                    isDarkMode ? "bg-zinc-700" : "bg-slate-100"
                  }`}
                >
                  {countLqWna}
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setDldStatus("WA");
              }}
              className={`card duration-300 shadow-lg ${
                isDarkMode ? "bg-zinc-800 text-white" : "bg-white text-black"
              } hover:cursor-pointer ${
                dldStatus === "WA" ? "border-yellow-500 border-2" : ""
              }`}
            >
              <div className="card-body">
                <h2 className="card-title text-yellow-500 drop-shadow-sm flex justify-center">
                  Wait Manager
                </h2>
                <p
                  className={`font-bold text-3xl text-center p-1 rounded-xl ${
                    isDarkMode ? "bg-zinc-700" : "bg-slate-100"
                  }`}
                >
                  {countLqWma}
                </p>
              </div>
            </div>
          </div>
          <DialogContentText>
            <div className="max-w-[1920px] animate-delay">
              <div
                className={`${
                  isDarkMode ? "bg-zinc-800" : "bg-white"
                } rounded-2xl shadow-md duration-300`}
              >
                <StyledDataGrid
                  rows={rowsLq}
                  columns={columnsLq}
                  slots={{ toolbar: GridToolbar }}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                    },
                  }}
                  pageSize={5}
                  sx={{
                    "& .MuiDataGrid-cell": {
                      borderRight: isDarkMode
                        ? "1px solid #676767"
                        : "1px solid #e3e3e3",
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
                      borderRight: isDarkMode
                        ? "1px solid #676767"
                        : "1px solid #e3e3e3",
                      borderBottom: isDarkMode
                        ? "1px solid #676767"
                        : "1px solid #e3e3e3",
                      borderTop: isDarkMode
                        ? "1px solid #676767"
                        : "1px solid #e3e3e3",
                    },
                    height: 450,
                  }}
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              setDldStatus("");
            }}
            className="btn btn-neutral btn-sm"
          >
            Clear
          </button>
          <button
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-xl hover:scale-110 transform duration-150 active:scale-100 ease-in-out"
            onClick={handleCloseDialogLdList}
          >
            X
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
