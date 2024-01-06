import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

export default function OnclickYearDialog({
  isDarkMode,
  openYearPrd,
  setOpenYearPrd,
  StyledDataGrid,
  flpmYear,
  setFlpmYear,
}) {
  //*get data to create table in dialog
  const [rowYearPrd, setRowYearPrd] = useState([]);
  const columnsYearPrd = [
    {
      field: "flpm_year",
      headerName: "Year",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "pmc_customer_desc",
      headerName: "Customer",
      width: 400,
      headerAlign: "center",
      renderCell: (params) => {
        return <div className="font-bold">{params.value}</div>;
      },
    },
    {
      field: "flqbu_seq",
      headerName: "Seq",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status_lq",
      headerName: "Status LQ",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.value === "N" ? "text-red-500" : "text-green-500"
            } rounded-xl drop-shadow text-center px-2 font-bold`}
          >
            {params.value}
          </div>
        );
      },
    },
    {
      field: "status_lq_count",
      headerName: "Count",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
  ];

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_NPI_STATUS
        }/upd_status_onclick_year?flpm_year=${flpmYear}`
      )
      .then((res) => {
        const data = res.data;

        const rowsWithid = data.map((row, index) => {
          return { id: index + 1, ...row };
        });
        setRowYearPrd(rowsWithid);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [flpmYear]);

  return (
    <>
      <div className="grid">
        <Dialog
          open={openYearPrd}
          maxWidth="xl"
          maxHeight="80vh"
          PaperProps={{
            style: {
              backgroundColor: isDarkMode ? "#565656" : "#F1F1F1",
            },
          }}
          className="animate-fade"
        >
          <DialogTitle>
            <div className="font-bold text-blue-500 drop-shadow">
              {flpmYear}
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <div
              className={`${
                isDarkMode ? "bg-zinc-800" : "bg-white"
              } rounded-2xl shadow-md duration-300`}
            >
              <StyledDataGrid
                rows={rowYearPrd}
                columns={columnsYearPrd}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
                // getRowHeight={() => "auto"}
                disableSelectionOnClick
                rowHeight={30}
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
          </DialogContent>
          <DialogActions>
            <button
              onClick={() => {
                setOpenYearPrd(false);
                setFlpmYear("");
              }}
              className="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-xl hover:scale-110 transform duration-150 active:scale-100 ease-in-out"
            >
              X
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
