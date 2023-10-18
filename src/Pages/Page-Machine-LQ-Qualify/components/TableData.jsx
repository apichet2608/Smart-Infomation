import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function TableMachineLQ({ datafromAPIlq }) {
  const [DataTablelq, setDataTablelq] = useState([]);

  useEffect(() => {
    // Make an API request and fetch dataz
    console.log(datafromAPIlq);
    if (datafromAPIlq && datafromAPIlq.length > 0) {
      setDataTablelq(datafromAPIlq);
    } else {
      setDataTablelq([]);
    }
  }, [datafromAPIlq]);

  const formatCreateDate = (createDate) => {
    if (createDate !== null) {
      const date = new Date(createDate);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      const seconds = String(date.getUTCSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  };

  const columns = [
    { field: "dld_machine", headerName: "Machine", width: 150 },
    { field: "dld_customer_name", headerName: "Customer", width: 150 },
    { field: "dld_model_name", headerName: "Model", width: 150 },
    { field: "dld_product", headerName: "Product", width: 150 },
    { field: "dld_proc_name", headerName: "Process", width: 150 },
    {
      field: "dld_proc_cust_name",
      headerName: "Process(Customer)",
      width: 150,
    },
    { field: "----------------", headerName: "Quality Report", width: 150 },
    { field: "dld_customer_box", headerName: "UPD Report", width: 150 },
    { field: "dld_ok2s", headerName: "OK2S", width: 150 },
    { field: "dld_status", headerName: "Status", width: 150 },
  ];

  return (
    <Box sx={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={DataTablelq}
        columns={columns}
        pagination
        getRowHeight={() => "auto"}
        pageSize={5}
        sx={{ height: 700, maxWidth: "100%", marginTop: 2 }}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  );
}
