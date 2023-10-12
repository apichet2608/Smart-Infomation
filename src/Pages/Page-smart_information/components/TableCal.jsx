import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";

export default function TableDataCal({ datafromAPICal }) {
  const [TableCal, setTableCal] = useState([]);

  const fetch_TableCal = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smart_machine_connect_list
        }/cal`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      console.log("Table-CAL");
      setTableCal(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // เมื่อคอมโพเนนต์ถูกโหลดครั้งแรก ให้ทำการดึงข้อมูล Calibration
    fetch_TableCal();
  }, []);

  useEffect(() => {
    // Make an API request and fetch dataz
    console.log(datafromAPICal);
    if (datafromAPICal && datafromAPICal.length > 0) {
      setTableCal(datafromAPICal);
    } else {
      setTableCal([]);
    }
  }, [datafromAPICal]);

  const columns = [
    { field: "equiment_code", headerName: "Equiment Code", width: 150 },
    { field: "equiment_desc", headerName: "Equiment Desc", width: 150 },
    { field: "due_date", headerName: "Due Date", width: 150 },
    { field: "plan_date", headerName: "Plan Date", width: 150 },
    { field: "last_date", headerName: "Last Date", width: 150 },
    { field: "status_filter", headerName: "Status Filter", width: 150 },
    { field: "wsm_status_name", headerName: "WSM status", width: 150 },
    { field: "mc_ref", headerName: "MC_ref", width: 150 },
  ];

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredItems = dataAPI.filter((item) => {
    return (
      (item.equiment_code &&
        item.equiment_code.toLowerCase().includes(search.toLowerCase())) ||
      (item.equiment_desc &&
        item.equiment_desc.toLowerCase().includes(search.toLowerCase())) ||
      (item.due_date &&
        item.due_date.toLowerCase().includes(search.toLowerCase())) ||
      (item.plan_date &&
        item.plan_date.toLowerCase().includes(search.toLowerCase())) ||
      (item.last_date &&
        item.last_date
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (item.status_filter &&
        item.status_filter
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (item.wsm_status_name &&
        item.wsm_status_name
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (item.mc_ref &&
        item.mc_ref.toString().toLowerCase().includes(search.toLowerCase()))
    );
  });

  useEffect(() => {
    // When dataAPI changes, update the rows
    setRows(datafromAPICal);
  }, [datafromAPICal]);

  return (
    <Box sx={{ height: 500, width: "100%" }}>
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
        rows={TableCal}
        columns={columns}
        pagination
        getRowHeight={() => "auto"}
        pageSize={5}
        sx={{ height: 500, maxWidth: "100%", marginTop: 2 }}
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
