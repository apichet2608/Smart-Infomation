import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "@emotion/styled";
import { GridToolbar } from "@mui/x-data-grid";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import axios from "axios";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

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

export default function MainDatagrid({ isDarkMode }) {
  const navigate = useNavigate();

  const [optionsYear, setOptionsYear] = useState([]);
  const [optionsCustomerDesc, setOptionsCustomerDesc] = useState([]);
  const [optionsCustomerCode, setOptionsCustomerCode] = useState([]);
  const [optionsProduct, setOptionsProduct] = useState([]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCustomerDesc, setSelectedCustomerDesc] = useState("");
  const [selectedCustomerCode, setSelectedCustomerCode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const selectedData = {
    selectedYear,
    selectedCustomerDesc,
    selectedCustomerCode,
    selectedProduct,
  };

  console.log("selectedData: ", selectedData);

  //*Get data for the autocomplete options
  //?Get options for Year
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_information/npi_product_status/smart_machine_upd_npi_product_status/smart_machine_upd_npi_product_status_read`
      )
      .then((response) => {
        const getYear = response.data
          .map((row) => row.flpm_year)
          .filter((year) => year !== null); // Filter out null values

        const uniqueYear = [...new Set(getYear)];
        setOptionsYear(uniqueYear);
      });
  }, []);

  //?Get options for Customer Description
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_information/npi_product_status/smart_machine_upd_npi_product_status/smart_machine_upd_npi_product_status_read?flpm_year=${selectedYear}`
      )
      .then((response) => {
        const getCustomerDesc = response.data
          .map((row) => row.pmc_customer_desc)
          .filter((customerDesc) => customerDesc !== null); // Filter out null values

        const uniqueCustomerDesc = [...new Set(getCustomerDesc)];
        setOptionsCustomerDesc(uniqueCustomerDesc);
      });
  }, [selectedYear]);

  //?Get options for Customer Code
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_information/npi_product_status/smart_machine_upd_npi_product_status/smart_machine_upd_npi_product_status_read?flpm_year=${selectedYear}&pmc_customer_desc=${selectedCustomerDesc}`
      )
      .then((response) => {
        const getCustomerCode = response.data
          .map((row) => row.pmc_customer_code)
          .filter((customerCode) => customerCode !== null); // Filter out null values

        const uniqueCustomerCode = [...new Set(getCustomerCode)];
        setOptionsCustomerCode(uniqueCustomerCode);
      });
  }, [selectedYear, selectedCustomerDesc]);

  //?Get options for Product
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_information/npi_product_status/smart_machine_upd_npi_product_status/smart_machine_upd_npi_product_status_read?flpm_year=${selectedYear}&pmc_customer_desc=${selectedCustomerDesc}&pmc_customer_code=${selectedCustomerCode}`
      )
      .then((response) => {
        const getProduct = response.data
          .map((row) => row.flpmb_product)
          .filter((product) => product !== null); // Filter out null values

        const uniqueProduct = [...new Set(getProduct)];
        setOptionsProduct(uniqueProduct);
      });
  }, [selectedYear, selectedCustomerDesc, selectedCustomerCode]);

  //*Get data for the datagrid
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_information/npi_product_status/smart_machine_upd_npi_product_status/smart_machine_upd_npi_product_status_read?flpm_year=${selectedYear}&pmc_customer_desc=${selectedCustomerDesc}&pmc_customer_code=${selectedCustomerCode}&flpmb_product=${selectedProduct}`
      )
      .then((response) => {
        console.log("Rows data: ", response.data);

        const rowsWithId = response.data.map((row, index) => {
          return { ...row, id: index + 1 };
        });

        setRows(rowsWithId);
      });
  }, [
    selectedYear,
    selectedCustomerDesc,
    selectedCustomerCode,
    selectedProduct,
  ]);

  const columns = [
    {
      field: "flpm_year",
      headerName: "Year",
      width: 50,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        return (
          <div className="flex flex-col">
            <div
              className={`${
                selectedYear ? "text-violet-600 font-bold drop-shadow-sm" : ""
              }`}
            >
              {params.value}
            </div>
          </div>
        );
      },
    },
    {
      field: "pmc_customer_desc",
      headerName: "Customer Desc",
      width: 340,
      headerAlign: "center",
      renderCell(params) {
        return (
          <div className="flex flex-col">
            <div
              className={`${
                selectedCustomerDesc
                  ? "text-violet-600 font-bold drop-shadow-sm"
                  : ""
              }`}
            >
              {params.value}
            </div>
          </div>
        );
      },
    },
    {
      field: "pmc_customer_code",
      headerName: "Customer Code",
      width: 120,
      headerAlign: "center",
      renderCell(params) {
        return (
          <div className="flex flex-col">
            <div
              className={`${
                selectedCustomerCode
                  ? "text-violet-600 font-bold drop-shadow-sm"
                  : ""
              }`}
            >
              {params.value}
            </div>
          </div>
        );
      },
    },
    {
      field: "flpmb_product",
      headerName: "Product",
      width: 130,
      headerAlign: "center",
      renderCell(params) {
        return (
          <div className="flex flex-col">
            <div
              className={`${
                selectedProduct
                  ? "text-violet-600 font-bold drop-shadow-sm"
                  : ""
              }`}
            >
              {params.value}
            </div>
          </div>
        );
      },
    },
    // {
    //   field: "pmc_apn",
    //   headerName: "APN",
    //   width: 130,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "flpm_name",
    //   headerName: "flpm_name",
    //   width: 150,
    //   headerAlign: "center",
    // },

    // {
    //   field: "flqbu_build_name",
    //   headerName: "Build",
    //   width: 80,
    //   headerAlign: "center",
    //   renderCell(params) {
    //     return (
    //       <div className="flex flex-col">
    //         <div className="font-bold drop-shadow-sm">{params.value}</div>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   field: "flqbu_seq",
    //   headerName: "Seq",
    //   width: 50,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "build_start",
    //   headerName: "build_start",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    //   valueFormatter: (params) => {
    //     return params.value ? params.value.substring(0, 10) : "";
    //   },
    // },
    // {
    //   field: "build_stop",
    //   headerName: "build_stop",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    //   valueFormatter: (params) => {
    //     return params.value ? params.value.substring(0, 10) : "";
    //   },
    // },
    // {
    //   field: "pmc_box_email",
    //   headerName: "pmc_box_email",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "pmc_ok2s",
    //   headerName: "OK2S",
    //   width: 60,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "pmc_customer_box",
    //   headerName: "Customer Box",
    //   width: 110,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "flpm_lock_scan",
      headerName: "Lock",
      width: 50,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        return (
          <div className="font-bold text-slate-500 drop-shadow-sm">
            {params.value}
          </div>
        );
      },
    },
    // {
    //   field: "lock_date",
    //   headerName: "Date",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    //   valueFormatter: (params) => {
    //     return params.value ? params.value.substring(0, 10) : "";
    //   },
    // },
    {
      field: "status_ok2s",
      headerName: "OK2S",
      width: 60,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        if (params.value === "Y") {
          return (
            <div
              onClick={() => {
                console.log("params.row: ", params.row.pmc_ok2s);
                const link = `${params.row.pmc_ok2s}`;
                window.open(link, "_blank");
              }}
              className="font-bold text-green-500 drop-shadow-sm hover:scale-125 active:scale-100 hover:cursor-pointer duration-200"
            >
              <Tooltip title={params.row.pmc_ok2s}>{params.value}</Tooltip>
            </div>
          );
        } else if (params.value === "N") {
          return (
            <div
              // onClick={() => {
              //   console.log("params.row: ", params.row.pmc_ok2s);
              // }}
              className="font-bold text-red-500 drop-shadow-sm"
            >
              {params.value}
            </div>
          );
        }
      },
    },
    {
      field: "status_lq",
      headerName: "LQ",
      width: 50,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        if (params.value === "Y") {
          return (
            <div className="font-bold text-green-500 drop-shadow-sm">
              {params.value}
            </div>
          );
        } else if (params.value === "N") {
          return (
            <div className="font-bold text-red-500 drop-shadow-sm">
              {params.value}
            </div>
          );
        }
      },
    },
    // {
    //   field: "id",
    //   headerName: "id",
    //   width: 130,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "create_at",
    //   headerName: "create_at",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    //   valueFormatter: (params) => {
    //     return params.value ? params.value.substring(0, 10) : "";
    //   },
    // },
    // {
    //   field: "update_date",
    //   headerName: "update_date",
    //   width: 130,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "seq1",
      headerName: "POC, C6.0",
      width: 90,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        if (
          params.row.flqbu_seq === "1" &&
          params.row.status_ok2s === "Y" &&
          params.row.seq_group === "Pass"
        ) {
          return (
            <div className="font-bold text-green-800 bg-green-200 w-full h-[90%] items-center justify-center flex text-center rounded-md drop-shadow-sm">
              Pass
            </div>
          );
        } else if (
          params.row.flqbu_seq === "1" &&
          params.row.status_ok2s === "N"
        ) {
          return (
            <div className="font-bold text-yellow-800 bg-yellow-200 w-full h-[90%] items-center justify-center flex text-center rounded drop-shadow-sm">
              Pending
            </div>
          );
        }
      },
    },
    {
      field: "seq2",
      headerName: "P0, C5.0",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        if (
          params.row.flqbu_seq === "2" &&
          params.row.status_ok2s === "Y" &&
          params.row.seq_group === "Pass"
        ) {
          return (
            <div className="font-bold text-green-800 bg-green-200 w-full h-[90%] items-center justify-center flex text-center rounded-md drop-shadow-sm">
              Pass
            </div>
          );
        } else if (
          params.row.flqbu_seq === "2" &&
          params.row.status_ok2s === "N"
        ) {
          return (
            <div className="font-bold text-yellow-800 bg-yellow-200 w-full h-[90%] items-center justify-center flex text-center rounded drop-shadow-sm">
              Pending
            </div>
          );
        }
      },
    },
    {
      field: "seq3",
      headerName: "P1, C4.0",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        if (
          params.row.flqbu_seq === "3" &&
          params.row.status_ok2s === "Y" &&
          params.row.seq_group === "Pass"
        ) {
          return (
            <div className="font-bold text-green-800 bg-green-200 w-full h-[90%] items-center justify-center flex text-center rounded-md drop-shadow-sm">
              Pass
            </div>
          );
        } else if (
          params.row.flqbu_seq === "3" &&
          params.row.status_ok2s === "N"
        ) {
          return (
            <div className="font-bold text-yellow-800 bg-yellow-200 w-full h-[90%] items-center justify-center flex text-center rounded drop-shadow-sm">
              Pending
            </div>
          );
        }
      },
    },
    {
      field: "seq4",
      headerName: "P2, C3.0",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        if (
          params.row.flqbu_seq === "4" &&
          params.row.status_ok2s === "Y" &&
          params.row.seq_group === "Pass"
        ) {
          return (
            <div className="font-bold text-green-800 bg-green-200 w-full h-[90%] items-center justify-center flex text-center rounded-md drop-shadow-sm">
              Pass
            </div>
          );
        } else if (
          params.row.flqbu_seq === "4" &&
          params.row.status_ok2s === "N"
        ) {
          return (
            <div className="font-bold text-yellow-800 bg-yellow-200 w-full h-[90%] items-center justify-center flex text-center rounded drop-shadow-sm">
              Pending
            </div>
          );
        }
      },
    },
    {
      field: "seq5",
      headerName: "C3.1",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        if (
          params.row.flqbu_seq === "5" &&
          params.row.status_ok2s === "Y" &&
          params.row.seq_group === "Pass"
        ) {
          return (
            <div className="font-bold text-green-800 bg-green-200 w-full h-[90%] items-center justify-center flex text-center rounded-md drop-shadow-sm">
              Pass
            </div>
          );
        } else if (
          params.row.flqbu_seq === "5" &&
          params.row.status_ok2s === "N"
        ) {
          return (
            <div className="font-bold text-yellow-800 bg-yellow-200 w-full h-[90%] items-center justify-center flex text-center rounded drop-shadow-sm">
              Pending
            </div>
          );
        }
      },
    },
    {
      field: "seq6",
      headerName: "P3",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        if (
          params.row.flqbu_seq === "6" &&
          params.row.status_ok2s === "Y" &&
          params.row.seq_group === "Pass"
        ) {
          return (
            <div className="font-bold text-green-800 bg-green-200 w-full h-[90%] items-center justify-center flex text-center rounded-md drop-shadow-sm">
              Pass
            </div>
          );
        } else if (
          params.row.flqbu_seq === "6" &&
          params.row.status_ok2s === "N"
        ) {
          return (
            <div className="font-bold text-yellow-800 bg-yellow-200 w-full h-[90%] items-center justify-center flex text-center rounded drop-shadow-sm">
              Pending
            </div>
          );
        }
      },
    },
    {
      field: "seq7",
      headerName: "AB1, C2.0",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        if (
          params.row.flqbu_seq === "7" &&
          params.row.status_ok2s === "Y" &&
          params.row.seq_group === "Pass"
        ) {
          return (
            <div className="font-bold text-green-800 bg-green-200 w-full h-[90%] items-center justify-center flex text-center rounded-md drop-shadow-sm">
              Pass
            </div>
          );
        } else if (
          params.row.flqbu_seq === "7" &&
          params.row.status_ok2s === "N"
        ) {
          return (
            <div className="font-bold text-yellow-800 bg-yellow-200 w-full h-[90%] items-center justify-center flex text-center rounded drop-shadow-sm">
              Pending
            </div>
          );
        }
      },
    },
    {
      field: "seq8",
      headerName: "EVT, C1.0",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        if (
          params.row.flqbu_seq === "8" &&
          params.row.status_ok2s === "Y" &&
          params.row.status_lq === "Y" &&
          params.row.seq_group === "Pass"
        ) {
          return (
            <div className="font-bold text-green-800 bg-green-200 w-full h-[90%] items-center justify-center flex text-center rounded-md drop-shadow-sm">
              Pass
            </div>
          );
        } else if (
          params.row.flqbu_seq === "8" &&
          params.row.status_ok2s === "N" &&
          params.row.status_lq === "Y"
        ) {
          return (
            <div className="font-bold text-yellow-800 bg-yellow-200 w-full h-[90%] items-center justify-center flex text-center rounded drop-shadow-sm">
              Pending
            </div>
          );
        }
      },
    },
    {
      field: "seq9",
      headerName: "EVT2",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        if (
          params.row.flqbu_seq === "9" &&
          params.row.status_ok2s === "Y" &&
          params.row.status_lq === "Y" &&
          params.row.seq_group === "Pass"
        ) {
          return (
            <div className="font-bold text-green-800 bg-green-200 w-full h-[90%] items-center justify-center flex text-center rounded-md drop-shadow-sm">
              Pass
            </div>
          );
        } else if (
          params.row.flqbu_seq === "9" &&
          params.row.status_ok2s === "N" &&
          params.row.status_lq === "Y"
        ) {
          return (
            <div className="font-bold text-yellow-800 bg-yellow-200 w-full h-[90%] items-center justify-center flex text-center rounded drop-shadow-sm">
              Pending
            </div>
          );
        }
      },
    },
    {
      field: "seq11",
      headerName: "CARRIER",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        if (
          params.row.flqbu_seq === "11" &&
          params.row.status_ok2s === "Y" &&
          params.row.status_lq === "Y" &&
          params.row.seq_group === "Pass"
        ) {
          return (
            <div className="font-bold text-green-800 bg-green-200 w-full h-[90%] items-center justify-center flex text-center rounded-md drop-shadow-sm">
              Pass
            </div>
          );
        } else if (
          params.row.flqbu_seq === "11" &&
          params.row.status_ok2s === "N" &&
          params.row.status_lq === "Y"
        ) {
          return (
            <div className="font-bold text-yellow-800 bg-yellow-200 w-full h-[90%] items-center justify-center flex text-center rounded drop-shadow-sm">
              Pending
            </div>
          );
        }
      },
    },
    {
      field: "seq12",
      headerName: "DVT",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        if (
          params.row.flqbu_seq === "12" &&
          params.row.status_ok2s === "Y" &&
          params.row.status_lq === "Y" &&
          params.row.seq_group === "Pass"
        ) {
          return (
            <div className="font-bold text-green-800 bg-green-200 w-full h-[90%] items-center justify-center flex text-center rounded-md drop-shadow-sm">
              Pass
            </div>
          );
        } else if (
          params.row.flqbu_seq === "12" &&
          params.row.status_ok2s === "N" &&
          params.row.status_lq === "Y"
        ) {
          return (
            <div className="font-bold text-yellow-800 bg-yellow-200 w-full h-[90%] items-center justify-center flex text-center rounded drop-shadow-sm">
              Pending
            </div>
          );
        }
      },
    },
    {
      field: "seq13",
      headerName: "MP",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell(params) {
        if (
          params.row.flqbu_seq === "13" &&
          params.row.status_ok2s === "Y" &&
          params.row.status_lq === "Y" &&
          params.row.seq_group === "Pass"
        ) {
          return (
            <div className="font-bold text-green-800 bg-green-200 w-full h-[90%] items-center justify-center flex text-center rounded-md drop-shadow-sm">
              Pass
            </div>
          );
        } else if (
          params.row.flqbu_seq === "13" &&
          params.row.status_ok2s === "N" &&
          params.row.status_lq === "Y"
        ) {
          return (
            <div className="font-bold text-yellow-800 bg-yellow-200 w-full h-[90%] items-center justify-center flex text-center rounded drop-shadow-sm">
              Pending
            </div>
          );
        }
      },
    },
  ];

  return (
    <>
      <div className="grid gap-y-4">
        <div className={`grid grid-cols-5 gap-4 `}>
          <div
            className={`py-2 px-4 duration-300 rounded-2xl shadow-md ${
              isDarkMode ? "bg-zinc-800" : "bg-white"
            }`}
          >
            <Autocomplete
              disablePortal
              id="year"
              value={selectedYear}
              options={optionsYear || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Year"
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
                setSelectedYear(value ? value : "");
                setSelectedCustomerDesc("");
                setSelectedCustomerCode("");
                setSelectedProduct("");
              }}
            />
          </div>
          <div
            className={`py-2 px-4 duration-300 rounded-2xl shadow-md ${
              isDarkMode ? "bg-zinc-800" : "bg-white"
            }`}
          >
            <Autocomplete
              disablePortal
              id="customerDesc"
              value={selectedCustomerDesc}
              options={optionsCustomerDesc || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Customer Description"
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
                setSelectedCustomerDesc(value ? value : "");
                setSelectedCustomerCode("");
                setSelectedProduct("");
              }}
            />
          </div>
          <div
            className={`py-2 px-4 duration-300 rounded-2xl shadow-md ${
              isDarkMode ? "bg-zinc-800" : "bg-white"
            }`}
          >
            <Autocomplete
              disablePortal
              id="customerCode"
              value={selectedCustomerCode}
              options={optionsCustomerCode || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Customer Code"
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
                setSelectedCustomerCode(value ? value : "");
                setSelectedProduct("");
              }}
            />
          </div>
          <div
            className={`py-2 px-4 duration-300 rounded-2xl shadow-md ${
              isDarkMode ? "bg-zinc-800" : "bg-white"
            }`}
          >
            <Autocomplete
              disablePortal
              id="product"
              value={selectedProduct}
              options={optionsProduct || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Product"
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
                setSelectedProduct(value ? value : "");
              }}
            />
          </div>
          <button
            className={`btn btn-square my-auto duration-300 shadow-md ${
              isDarkMode ? "btn-neutral" : "btn-ghost"
            }`}
            onClick={() => {
              setSelectedYear("");
              setSelectedCustomerDesc("");
              setSelectedCustomerCode("");
              setSelectedProduct("");
            }}
          >
            <ReplayRoundedIcon />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div
            className={`card duration-300 shadow-lg ${
              isDarkMode ? "bg-zinc-800 text-white" : "bg-white text-black"
            }`}
          >
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>This is demo card</p>
            </div>
          </div>
          <div
            className={`card duration-300 shadow-lg ${
              isDarkMode ? "bg-zinc-800 text-white" : "bg-white text-black"
            }`}
          >
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>This is demo card</p>
            </div>
          </div>
          <div
            className={`card duration-300 shadow-lg ${
              isDarkMode ? "bg-zinc-800 text-white" : "bg-white text-black"
            }`}
          >
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
              <p>This is demo card</p>
            </div>
          </div>
        </div>
        <div className="max-w-[1920px] overflow-auto">
          <div
            className={`${
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
                height: 550,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}