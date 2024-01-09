import { useEffect, useState } from "react";
import axios from "axios";

//!components
import MainDatagrid from "../components/MainDatagrid";
import MainCard from "../components/MainCard";
import MainFilter from "../components/MainFilter";

//!img
import total from "../../../../public/Icons/total.png";
import percentdone from "../../../../public/Icons/percentdone.png";
import done from "../../../../public/Icons/done.png";
import inprogress from "../../../../public/Icons/inprogess.png";

function ULProduct({ isDarkMode }) {
  //*Filter data

  const [selectedLob, setSelectedLob] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedFlexName, setSelectedFlexName] = useState("");
  const [selectedXcode, setSelectedXcode] = useState("");

  //*Options data
  const [lobOptions, setLobOptions] = useState([]);
  const [appOptions, setAppOptions] = useState([]);
  const [flexNameOptions, setFlexNameOptions] = useState([]);
  const [xcodeOptions, setXcodeOptions] = useState([]);

  //?Lob
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_UL_PRODUCT
        }/main_table`
      )
      .then((res) => {
        const data = res.data;
        const uniqueLob = [...new Set(data.map((row) => row.lob))];
        setLobOptions(uniqueLob);
      });
  }, []);

  //?Application
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_UL_PRODUCT
        }/main_table?lob=${selectedLob}`
      )
      .then((res) => {
        const data = res.data;
        const uniqueApp = [...new Set(data.map((row) => row.application))];
        setAppOptions(uniqueApp);
      });
  }, [selectedLob]);

  //?Flex Name
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_UL_PRODUCT
        }/main_table?lob=${selectedLob}&application=${selectedApp}`
      )
      .then((res) => {
        const data = res.data;
        const uniqueFlexName = [...new Set(data.map((row) => row.flex_name))];
        setFlexNameOptions(uniqueFlexName);
      });
  }, [selectedLob, selectedApp]);

  //?Xcode
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_UL_PRODUCT
        }/main_table?lob=${selectedLob}&application=${selectedApp}&flex_name=${selectedFlexName}`
      )
      .then((res) => {
        const data = res.data;
        const uniqueXcode = [...new Set(data.map((row) => row.x_code))];
        setXcodeOptions(uniqueXcode);
      });
  }, [selectedLob, selectedApp, selectedFlexName]);

  //*Card data
  const [totalCount, setTotalCount] = useState(0);
  const [donePercent, setDonePercent] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);

  console.log(totalCount, donePercent, doneCount, inProgressCount);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_UL_PRODUCT
        }/main_card?lob=${selectedLob}&application=${selectedApp}&flex_name=${selectedFlexName}&x_code=${selectedXcode}`
      )
      .then((res) => {
        const data = res.data;

        console.log(data);

        const mapTotalCount = data.map((row) => row.total);
        const mapDonePercent = data.map((row) => row.percent_done);
        const mapDoneCount = data.map((row) => row.done);
        const mapInProgressCount = data.map((row) => row.in_progress);

        setTotalCount(mapTotalCount);
        setDonePercent(mapDonePercent);
        setDoneCount(mapDoneCount);
        setInProgressCount(mapInProgressCount);
      });
  }, [selectedLob, selectedApp, selectedFlexName, selectedXcode]);

  const dataCard = [
    {
      title: "Total",
      count: totalCount,
      icon: total,
    },
    {
      title: "% Done",
      count: donePercent,
      icon: percentdone,
    },
    {
      title: "Done",
      count: doneCount,
      icon: done,
    },
    {
      title: "In Progress",
      count: inProgressCount,
      icon: inprogress,
    },
  ];

  //*Table data
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_UL_PRODUCT
        }/main_table?lob=${selectedLob}&application=${selectedApp}&flex_name=${selectedFlexName}&x_code=${selectedXcode}`
      )
      .then((res) => {
        const data = res.data;

        const rowsWithId = data.map((row, index) => {
          return { ...row, id: index + 1 };
        });
        setRows(rowsWithId);
      });
  }, [selectedLob, selectedApp, selectedFlexName, selectedXcode]);

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    // {
    //   field: "create_at",
    //   headerName: "Create At",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    //   valueFormatter: (params) => {
    //     return params.value.slice(0, 10);
    //   },
    // },
    {
      field: "site",
      headerName: "Site",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lob",
      headerName: "LOB",
      width: 70,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={`${selectedLob ? "text-violet-500 font-bold" : ""}`}>
            {params.value}
          </div>
        );
      },
    },
    {
      field: "application",
      headerName: "Application",
      width: 90,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className={`${selectedApp ? "text-violet-500 font-bold" : ""}`}>
            {params.value}
          </div>
        );
      },
    },
    {
      field: "flex_name",
      headerName: "Flex Name",
      width: 140,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div
            className={`${
              selectedFlexName ? "text-violet-500 font-bold" : ""
            } whitespace-pre-wrap`}
          >
            {params.value}
          </div>
        );
      },
    },
    {
      field: "x_code",
      headerName: "X Code",
      width: 70,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div
            className={`${selectedXcode ? "text-violet-500 font-bold" : ""}`}
          >
            {params.value}
          </div>
        );
      },
    },
    {
      field: "apn",
      headerName: "APN",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "layer_stackup",
    //   headerName: "Layer Stackup",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "current_build",
    //   headerName: "Current Build",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "current_status",
      headerName: "Current Status",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "est_completion",
    //   headerName: "Est Completion",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "est_ramp_date",
      headerName: "Est Ramp Date",
      width: 120,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => {
        // Check if params.value is not null or undefined
        if (params.value != null) {
          // Use slice(0, 10) if params.value is not null
          return params.value.slice(0, 10);
        } else {
          // Handle the case where params.value is null or undefined
          return "N/A"; // or any default value or message you want to display
        }
      },
    },
    // {
    //   field: "ul_application_date",
    //   headerName: "UL Application Date",
    //   width: 180,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "build_at_applied",
      headerName: "Build at Applied",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "applied_at_or_before_p1",
      headerName: "Applied at or Before P1",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "ul_application_comment",
    //   headerName: "UL Application Comment",
    //   width: 200,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "ul_certification_date",
      headerName: "UL Cert Date",
      width: 120,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => {
        // Check if params.value is not null or undefined
        if (params.value != null) {
          // Use slice(0, 10) if params.value is not null
          return params.value.slice(0, 10);
        } else {
          // Handle the case where params.value is null or undefined
          return "N/A"; // or any default value or message you want to display
        }
      },
    },
    {
      field: "build_at_certified",
      headerName: "Build at Certified",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ul_certified_before_evt_input",
      headerName: "UL Cert Before EVT Input",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "ul_certification_comment",
    //   headerName: "UL Certification Comment",
    //   width: 200,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "fpc_stackup_ul_file_no",
    //   headerName: "FPC Stackup UL File No",
    //   width: 200,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "ul_logo",
      headerName: "UL Logo",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "mot",
    //   headerName: "MOT",
    //   width: 120,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "flammability",
    //   headerName: "Flammability",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "remark",
    //   headerName: "Remark",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    // },
  ];

  return (
    <>
      <div className="grid mt-16 gap-y-4">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4 animate-fade">
          <MainFilter
            isDarkMode={isDarkMode}
            selectedLob={selectedLob}
            selectedApp={selectedApp}
            selectedFlexName={selectedFlexName}
            selectedXcode={selectedXcode}
            setSelectedLob={setSelectedLob}
            setSelectedApp={setSelectedApp}
            setSelectedFlexName={setSelectedFlexName}
            setSelectedXcode={setSelectedXcode}
            lobOptions={lobOptions}
            appOptions={appOptions}
            flexNameOptions={flexNameOptions}
            xcodeOptions={xcodeOptions}
          />

          <button
            onClick={() => {
              setSelectedLob("");
              setSelectedApp("");
              setSelectedFlexName("");
              setSelectedXcode("");
            }}
            className={`${
              isDarkMode ? "btn-neutral" : "btn-ghost"
            } btn my-auto w-fit shadow-md duration-300`}
          >
            Clear
          </button>
        </div>
        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-4 animate-fade">
          {dataCard.map((cardData, index) => (
            <MainCard
              key={index} // Add a unique key for each MainCard in the array
              isDarkMode={isDarkMode}
              cardTitle={cardData.title}
              cardCount={cardData.count}
              cardIcon={cardData.icon}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 animate-delay">
          <MainDatagrid isDarkMode={isDarkMode} rows={rows} columns={columns} />
        </div>
      </div>
    </>
  );
}

export default ULProduct;
