import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import LoginAuth from "./components/login/LoginAuth";

//Tab
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table_data_sub_lock from "./components/lock/Table_data_sub_lock";
import Table_unlock from "./components/unlock/Table_for_unlock";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Machine_lq_sub_lock_main() {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0, // breakpoint xs
        sm: 600, // breakpoint sm
        md: 960, // breakpoint md
        lg: 1280, // breakpoint lg
        xl: 1900, // breakpoint xl
      },
    },
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Table UPD
  const [distinct_product, setDistinctProduct] = useState([]);
  const [product, setProduct] = useState({ dld_product: "ALL" });

  const [distinct_process, setDistinctProcess] = useState([]);
  const [process, setProcess] = useState({ dld_proc_name: "ALL" });

  const [get_data_sub_lock, setGetDataSubLock] = useState([]);

  const fetch_product = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smart_machine_upd_lq_sub_lock
        }/distinct_product`
      );
      setDistinctProduct(response.data);
      console.log("Product: ", response.data);
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  const fetch_process = async () => {
    const params = {
      product: product.dld_product,
    };
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smart_machine_upd_lq_sub_lock
        }/distinct_process`,
        { params: params }
      );
      setDistinctProcess(response.data);
      console.log("Process: ", response.data);
    } catch (error) {
      // Handle error
    }
  };

  const fetch_data_sub_lock = async () => {
    const params = {
      product: product.dld_product,
      process: process.dld_proc_name,
    };
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smart_machine_upd_lq_sub_lock
        }/Get_data_sub_lock`,
        { params: params }
      );
      setGetDataSubLock(response.data);
      console.log("Data Sub Lock: ", response.data);
    } catch (error) {
      // Handle error
    }
  };

  const handlePrdChange = (event, newvalue) => {
    if (newvalue === null) {
      setProduct({ dld_product: "ALL" });
    } else {
      setProduct(newvalue);
    }

    setProcess({ dld_proc_name: "ALL" });
  };

  const handleProcessChange = (event, newvalue) => {
    if (newvalue === null) {
      setProcess({ dld_proc_name: "ALL" });
    } else {
      setProcess(newvalue);
    }
  };

  //refresh table upd
  const refresh_table_upd = () => {
    fetch_data_sub_lock();
  };

  //Table Sub-lock
  const [distinct_product_lock, setDistinctProductLock] = useState([]);
  const [product_lock, setProductLock] = useState({ product: "ALL" });

  const [distinct_process_lock, setDistinctProcessLock] = useState([]);
  const [process_lock, setProcessLock] = useState({ process: "ALL" });

  const [get_data_for_unlock, setGetDataForUnlock] = useState([]);

  const fetch_product_lock = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smart_machine_upd_lq_sub_lock
        }/distinct_product_lock`
      );
      setDistinctProductLock(response.data);
      console.log("Product Lock: ", response.data);
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  const fetch_process_lock = async () => {
    const params = {
      product: product_lock.product,
    };
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smart_machine_upd_lq_sub_lock
        }/distinct_process_lock`,
        { params: params }
      );
      setDistinctProcessLock(response.data);
      console.log("Process Lock: ", response.data);
    } catch (error) {
      // Handle error
    }
  };

  const fetch_data_for_unlock = async () => {
    const params = {
      product: product_lock.product,
      process: process_lock.process,
    };
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smart_machine_upd_lq_sub_lock
        }/Get_data_for_unlock`,
        { params: params }
      );
      setGetDataForUnlock(response.data);
      console.log("Data Sub Lock Y: ", response.data);
    } catch (error) {
      // Handle error
    }
  };

  const handlePrdLockChange = (event, newvalue) => {
    if (newvalue === null) {
      setProductLock({ product: "ALL" });
    } else {
      setProductLock(newvalue);
    }

    setProcessLock({ process: "ALL" });
  };

  const handleProcessLockChange = (event, newvalue) => {
    if (newvalue === null) {
      setProcessLock({ process: "ALL" });
    } else {
      setProcessLock(newvalue);
    }
  };

  //refresh table sub lock
  const refresh_table_sub_lock = () => {
    fetch_data_for_unlock();
    setProcessLock({ process: "ALL" });
    setProductLock({ product: "ALL" });
  };

  const refresh_table_sub_lock_all = () => {
    fetch_data_sub_lock();
    fetch_process_lock();
    fetch_product_lock();
  };

  useEffect(() => {
    fetch_product();
    fetch_process();
    fetch_data_sub_lock();

    fetch_product_lock();
    fetch_process_lock();
    fetch_data_for_unlock();
  }, [product, process, product_lock, process_lock]);

  //!Login Auth

  const [openLoginAuth, setOpenLoginAuth] = useState(false);
  const getUserLocal = JSON.parse(localStorage.getItem("userData"));
  const currentUser = getUserLocal ? getUserLocal : null;

  return (
    <ThemeProvider theme={theme}>
      <LoginAuth open={openLoginAuth} setOpen={setOpenLoginAuth} />
      <button
        onClick={() => {
          setOpenLoginAuth(true);
        }}
        className={`btn btn-success text-slate-50 absolute right-6 top-20 z-50 ${
          currentUser ? "hidden" : "block"
        }`}
      >
        Login
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("userData");
          window.location.reload();
        }}
        className={`btn btn-error text-slate-50 absolute right-6 top-20 z-50 ${
          currentUser ? "block" : "hidden"
        }`}
      >
        Log Out
      </button>
      <div
        className={`${
          currentUser ? "hidden" : "block"
        } flex mx-auto my-auto h-screen w-screen justify-center items-center text-3xl font-bold text-info`}
      >
        Please Login to veiw page
      </div>
      <div className={`${currentUser ? "block" : "hidden"}`}>
        <div className="mt-16 animate-fade grid gap-y-6">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", mt: -2 }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{
                      ".MuiTabs-indicator": {
                        backgroundColor: "#34495E",
                        height: "5px",
                      },
                      ".MuiTab-root": {
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "10px",
                        fontSize: "1rem",
                        marginRight: 0.2,
                        marginLeft: 0.6,
                        "&:hover": {
                          backgroundColor: "#F7DC6F", // สีเมื่อเมาส์ hover ไว้ที่แท็บ
                        },
                        "&.Mui-selected": {
                          color: "#EBF5FB",
                          backgroundColor: value === 0 ? "#F39C12" : "#28B463", // สีเหลืองสำหรับ Lock, สีเขียวสำหรับ Unlock
                        },
                        "&.Mui-focusVisible": {
                          backgroundColor: "#FDFEFE",
                          color: "primary.contrastText",
                        },
                      },
                    }}
                  >
                    <Tab label="Lock" {...a11yProps(0)} />
                    <Tab label="Unlock" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  <div
                    // className="Paper_Contents"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "5px",
                      marginTop: "-10px",
                    }}
                  >
                    <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                      <Autocomplete
                        size="small"
                        options={distinct_product}
                        value={product}
                        getOptionLabel={(option) =>
                          option && option.dld_product ? option.dld_product : ""
                        }
                        onChange={handlePrdChange}
                        style={{ width: 300, backgroundColor: "white" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Product" />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={2} xl={2} ml={4}>
                      <Autocomplete
                        size="small"
                        options={distinct_process}
                        value={process}
                        getOptionLabel={(option) =>
                          option && option.dld_proc_name
                            ? option.dld_proc_name
                            : ""
                        }
                        onChange={handleProcessChange}
                        style={{ width: 300, backgroundColor: "white" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Process" />
                        )}
                      />
                    </Grid>
                  </div>
                  <Table_data_sub_lock
                    lock_data={get_data_sub_lock}
                    refresh_upd={refresh_table_upd}
                    refresh_sub_lock_all={refresh_table_sub_lock_all}
                  />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <div
                    // className="Paper_Contents"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "5px",
                      marginTop: "-10px",
                    }}
                  >
                    <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                      <Autocomplete
                        size="small"
                        options={distinct_product_lock}
                        value={product_lock}
                        getOptionLabel={(option) =>
                          option && option.product ? option.product : ""
                        }
                        onChange={handlePrdLockChange}
                        style={{ width: 300, backgroundColor: "white" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Product" />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={2} xl={2} ml={4}>
                      <Autocomplete
                        size="small"
                        options={distinct_process_lock}
                        value={process_lock}
                        getOptionLabel={(option) =>
                          option && option.process ? option.process : ""
                        }
                        onChange={handleProcessLockChange}
                        style={{ width: 300, backgroundColor: "white" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Process" />
                        )}
                      />
                    </Grid>
                  </div>
                  <Table_unlock
                    data_is_y={get_data_for_unlock}
                    refresh_sub_lock={refresh_table_sub_lock}
                  />
                </CustomTabPanel>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
}
