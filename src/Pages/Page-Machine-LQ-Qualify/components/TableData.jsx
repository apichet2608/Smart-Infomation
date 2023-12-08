import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { Link } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

import RemoveIcon from "@mui/icons-material/Remove";

function TableMachineLQ({ datafromAPIlq }) {
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

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredItems = datafromAPIlq.filter((item) => {
    return (
      (item.dld_year &&
        item.dld_year.toLowerCase().includes(search.toLowerCase())) ||
      (item.dld_status_result &&
        item.dld_status_result.toLowerCase().includes(search.toLowerCase())) ||
      (item.dld_machine &&
        item.dld_machine.toLowerCase().includes(search.toLowerCase())) ||
      (item.dld_customer_name &&
        item.dld_customer_name.toLowerCase().includes(search.toLowerCase())) ||
      (item.dld_model_name &&
        item.dld_model_name
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (item.dld_product &&
        item.dld_product
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (item.dld_proc_name &&
        item.dld_proc_name
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (item.dld_proc_cust_name &&
        item.dld_proc_cust_name
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (item.dld_customer_box &&
        item.dld_customer_box
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (item.dld_ok2s &&
        item.dld_ok2s.toString().toLowerCase().includes(search.toLowerCase()))
    );
  });

  const columns = [
    { field: "dld_year", headerName: "Year", width: 80 },
    // {
    //   field: "dld_status",
    //   headerName: "Status",
    //   width: 200,
    //   // renderCell: (params) =>
    //   //   params.value === null ? (
    //   //     <div>
    //   //       &nbsp; &nbsp; &nbsp; &nbsp;
    //   //       <DoNotDisturbOnIcon style={{ fontSize: 20, color: "#CCD1D1" }} />
    //   //     </div>
    //   //   ) : (
    //   //     <>
    //   //       {params.value === "F" && (
    //   //         <div style={{ display: "flex", alignItems: "center" }}>
    //   //           <CheckCircleIcon style={{ fontSize: 20, color: "#2ECC71" }} />
    //   //           &nbsp;Qualify
    //   //         </div>
    //   //       )}
    //   //       {params.value === "-" && (
    //   //         <div style={{ display: "flex", alignItems: "center" }}>
    //   //           <CheckCircleIcon style={{ fontSize: 20, color: "#2ECC71" }} />
    //   //           &nbsp;Qualify
    //   //         </div>
    //   //       )}
    //   //       {params.value === "Q" && (
    //   //         <div style={{ display: "flex", alignItems: "center" }}>
    //   //           <CheckCircleIcon style={{ fontSize: 20, color: "#2ECC71" }} />
    //   //           &nbsp;Qualify
    //   //         </div>
    //   //       )}
    //   //       {params.value === "P" && (
    //   //         <div style={{ display: "flex", alignItems: "center" }}>
    //   //           <AccessTimeFilledIcon
    //   //             style={{ fontSize: 20, color: "#2980B9" }}
    //   //           />
    //   //           &nbsp;Plan
    //   //         </div>
    //   //       )}
    //   //       {params.value === "A" && (
    //   //         <div style={{ display: "flex", alignItems: "center" }}>
    //   //           <InfoIcon style={{ fontSize: 20, color: "#F8C471" }} />
    //   //           &nbsp;Wait NPI Approve
    //   //         </div>
    //   //       )}
    //   //       {params.value === "WA" && (
    //   //         <div style={{ display: "flex", alignItems: "center" }}>
    //   //           <InfoIcon style={{ fontSize: 20, color: "#F7DC6F" }} />
    //   //           &nbsp;Wait Manager Approve
    //   //         </div>
    //   //       )}
    //   //     </>
    //   //   ),
    // },
    {
      field: "dld_status_result",
      headerName: "Status",
      width: 200,
      renderCell: (params) =>
        params.value === null ? (
          <div>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <DoNotDisturbOnIcon style={{ fontSize: 20, color: "#CCD1D1" }} />
          </div>
        ) : (
          <>
            {params.value === "Qualify" && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <CheckCircleIcon style={{ fontSize: 20, color: "#2ECC71" }} />
                &nbsp;Qualify
              </div>
            )}

            {params.value === "Plan" && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <AccessTimeFilledIcon
                  style={{ fontSize: 20, color: "#3498DB" }}
                />
                &nbsp;Plan
              </div>
            )}
            {params.value === "Wait NPI Approve" && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <InfoIcon style={{ fontSize: 20, color: "#F7DC6F" }} />
                &nbsp;Wait NPI Approve
              </div>
            )}
            {params.value === "Wait Manager Approve" && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <InfoIcon style={{ fontSize: 20, color: "#F39C12" }} />
                &nbsp;Wait Manager Approve
              </div>
            )}
          </>
        ),
    },
    { field: "dld_machine", headerName: "Machine", width: 120 },
    { field: "dld_customer_name", headerName: "Customer", width: 250 },
    { field: "dld_model_name", headerName: "Model", width: 200 },
    { field: "dld_product", headerName: "Product", width: 200 },
    { field: "dld_proc_name", headerName: "Process", width: 120 },
    {
      field: "dld_proc_cust_name",
      headerName: "Process(Customer)",
      width: 300,
    },
    {
      field: "dld_customer_box",
      headerName: "UPD",
      width: 80,
      renderCell: (params) => {
        if (params.value === null) {
          return (
            <Button
              component="a"
              variant="outlined"
              justifyContent="center"
              href={params.value}
              target=""
              rel="noopener noreferrer"
              style={{ color: "#808B96", margin: 2 }}
            >
              <RemoveIcon style={{ fontSize: 20 }} />
            </Button>
          );
        }

        return (
          <Button
            component="a"
            variant="outlined"
            justifyContent="center"
            href={params.value}
            target=""
            rel="noopener noreferrer"
            style={{ color: "#2980B9", margin: 2 }}
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
          return (
            <Button
              component="a"
              variant="outlined"
              justifyContent="center"
              href={params.value}
              target=""
              rel="noopener noreferrer"
              style={{ color: "#808B96" }}
            >
              <RemoveIcon style={{ fontSize: 20 }} />
            </Button>
          );
        }

        return (
          <Button
            component="a"
            variant="outlined"
            justifyContent="center"
            href={params.value}
            target=""
            rel="noopener noreferrer"
            style={{ color: "#2980B9", margin: 2 }}
          >
            <LinkIcon />
          </Button>
        );
      },
    },
  ];

  return (
    <item style={{ height: 605, width: "100%" }}>
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
        pagination
        slots={{
          toolbar: GridToolbar,
        }}
        getRowHeight={() => "auto"}
        pageSize={5}
        sx={{ height: 605, maxWidth: "100%", marginTop: 2 }}
      />
    </item>
  );
}

export default TableMachineLQ;
