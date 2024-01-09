import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function MainFilter({
  isDarkMode,
  selectedLob,
  selectedApp,
  selectedFlexName,
  selectedXcode,

  setSelectedLob,
  setSelectedApp,
  setSelectedFlexName,
  setSelectedXcode,

  lobOptions,
  appOptions,
  flexNameOptions,
  xcodeOptions,
}) {
  return (
    <>
      <div
        className={`py-2 px-4 duration-300 rounded-2xl shadow-md ${
          isDarkMode ? "bg-zinc-800" : "bg-white"
        }`}
      >
        <Autocomplete
          disablePortal
          id="lob"
          value={selectedLob}
          options={lobOptions || []}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Lob"
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
          onChange={(event, newValue) => {
            setSelectedLob(newValue ? newValue : "");
            setSelectedApp("");
            setSelectedFlexName("");
            setSelectedXcode("");
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
          id="Application"
          value={selectedApp}
          options={appOptions || []}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Application"
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
          onChange={(event, newValue) => {
            setSelectedApp(newValue);
            setSelectedFlexName("");
            setSelectedXcode("");
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
          id="FlexName"
          value={selectedFlexName}
          options={flexNameOptions || []}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Flex Name"
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
          onChange={(event, newValue) => {
            setSelectedFlexName(newValue ? newValue : "");
            setSelectedXcode("");
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
          id="Xcode"
          value={selectedXcode}
          options={xcodeOptions || []}
          renderInput={(params) => (
            <TextField
              {...params}
              label="X Code"
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
          onChange={(event, newValue) => {
            setSelectedXcode(newValue ? newValue : "");
          }}
        />
      </div>
    </>
  );
}
