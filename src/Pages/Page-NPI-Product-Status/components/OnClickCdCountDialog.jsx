import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import styled from "@mui/material/styles/styled";
import Divider from "@mui/material/Divider";

import { useState, useEffect } from "react";
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

export default function OnClickCdCountDialog({
  isDarkMode,
  openCdCount,
  handleCloseDialogCdCount,
  rowsCdCount,
  showStateCustomerName,
}) {
  const [openMachine, setOpenMachine] = useState(false);

  const handleCloseDialogMachine = () => {
    setOpenMachine(false);
  };

  const columnsCdCount = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 50,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "create_date",
    //   headerName: "Create Date",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "dld_customer_name",
    //   headerName: "Customer Name",
    //   width: 180,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "dld_proc_cust_name",
      headerName: "Proc Cust Name",
      width: 240,
      headerAlign: "center",
    },
    {
      field: "grouped_status",
      headerName: "Grouped Status",
      width: 150,
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
      field: "count",
      headerName: "Machine",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <button
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold w-full mx-6 py-1 rounded-xl hover:scale-125 transform duration-150 active:scale-100 ease-in-out"
            onClick={() => {
              setCustomerName(params.row.dld_customer_name);
              setGrpStatus(params.row.grouped_status);
              setProcCustName(params.row.dld_proc_cust_name);
              setOpenMachine(true);
              setShowStateProcCustName(params.row.dld_proc_cust_name);
              setShowStateGrpStatus(params.row.grouped_status);
            }}
          >
            {params.value}
          </button>
        );
      },
    },
  ];

  //*Get data Machine

  const [customerName, setCustomerName] = useState([]);
  const [grpStatus, setGrpStatus] = useState([]);
  const [procCustName, setProcCustName] = useState([]);

  // const queryDataMachine = [customerName, grpStatus, procCustName];

  // console.log("queryDataMachine", queryDataMachine);

  const [showStateProcCustName, setShowStateProcCustName] = useState("");
  const [showStateGrpStatus, setShowStateGrpStatus] = useState("");

  const [rowsMachine, setRowsMachine] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_NPI_STATUS
        }/smart_machine_upd_onclick_count_view_machine?dld_customer_name=${customerName}&dld_proc_cust_name=${procCustName}&grouped_status=${grpStatus}`
      )
      .then((res) => {
        const data = res.data;

        const rowsWithid = data.map((row, index) => {
          return { id: index + 1, ...row };
        });
        setRowsMachine(rowsWithid);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [customerName, grpStatus, procCustName]);

  const machineData = rowsMachine.map((row) => {
    return row.dld_machine;
  });

  return (
    <>
      <Dialog
        open={openCdCount}
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
            <span className="font-bold text-blue-600 drop-shadow-sm">
              Customer Description Count
            </span>
            <span className="font-bold text-violet-700 bg-violet-200 rounded-lg px-2 py-1 shadow">
              {showStateCustomerName}
            </span>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="max-w-[1920px] animate-delay">
              <div
                className={`${
                  isDarkMode ? "bg-zinc-800" : "bg-white"
                } rounded-2xl shadow-md duration-300`}
              >
                <StyledDataGrid
                  rows={rowsCdCount}
                  columns={columnsCdCount}
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
                    height: 600,
                  }}
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-xl hover:scale-110 transform duration-150 active:scale-100 ease-in-out"
            onClick={handleCloseDialogCdCount}
          >
            X
          </button>
        </DialogActions>
      </Dialog>

      {/* Machine Dialog */}
      <Dialog
        open={openMachine}
        maxWidth="xl"
        maxHeight="80vh"
        PaperProps={{
          style: {
            backgroundColor: isDarkMode ? "#565656" : "#F1F1F1", // Set your desired background color
          },
        }}
      >
        <DialogTitle>
          <div className="font-bold drop-shadow-sm">
            <div className="bg-blue-500 w-fit px-2 rounded-xl text-white my-2 text-center">
              Machine{" "}
            </div>
            <p className={`${isDarkMode ? "text-zinc-100" : "text-slate-700"}`}>
              Process Customer Name :{" "}
              <span className="text-blue-500">{showStateProcCustName}</span>
            </p>
            <p className={`${isDarkMode ? "text-zinc-100" : "text-slate-700"}`}>
              Grouped Status :{" "}
              <span
                className={`${
                  showStateGrpStatus === "Qualify"
                    ? "text-green-500"
                    : showStateGrpStatus === "Plan"
                    ? "text-rose-500"
                    : "text-yellow-500"
                }`}
              >
                {showStateGrpStatus}
              </span>
            </p>
          </div>
        </DialogTitle>
        <Divider>
          <div
            className={`${
              isDarkMode ? "text-zinc-100" : "text-slate-700"
            } font-bold`}
          >
            List
          </div>
        </Divider>
        <DialogContent>
          <DialogContentText>
            <div className="grid grid-cols-6 gap-5">
              {machineData.map((item, index) => (
                <p
                  key={index}
                  className="whitespace-pre-line leading-normal font-bold"
                >
                  <span
                    className={`${
                      isDarkMode ? "text-zinc-100" : "text-slate-700"
                    } drop-shadow`}
                  >{`${index + 1}. `}</span>

                  <span className="text-green-500 drop-shadow">{item}</span>
                </p>
              ))}
            </div>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <button
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-xl hover:scale-110 transform duration-150 active:scale-100 ease-in-out"
            onClick={handleCloseDialogMachine}
          >
            X
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
