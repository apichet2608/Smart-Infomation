import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "@emotion/styled";
import { GridToolbar } from "@mui/x-data-grid";

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

export default function MainDatagrid({ isDarkMode, rows, columns }) {
  return (
    <>
      <div className="grid grid-cols-1 animate-delay">
        <div
          className={`xl:h-[580px] md:h-[420px] ${
            isDarkMode ? "bg-zinc-800" : "bg-white"
          } rounded-2xl shadow-md duration-300`}
        >
          <StyledDataGrid
            rows={rows}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            getRowHeight={() => "auto"}
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
              // height: 550,
            }}
          />
        </div>
      </div>
    </>
  );
}
