import { useEffect, useState } from "react";

//! Import user data
import user from "../../../../../Components/Auth/userData.js";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";

export default function LoginAuth({ open, setOpen }) {
  const userData = user;

  console.log("user", userData);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // console.log("username", username);
    // console.log("password", password);
    // console.log("userData", userData);

    const foundUser = userData.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      console.log("user", foundUser);
      console.log("Login Success");

      localStorage.setItem("userData", JSON.stringify(foundUser));
      setOpen(false);

      Swal.fire({
        icon: "success",
        title: "Login Success",
        text: "Welcome to Smart Factory",
      });
    } else {
      console.log("Login Failed");
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please check your username and password",
      });
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle id="loginAuth">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <button onClick={handleLogin} className="btn btn-primary">
            Login
          </button>
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="btn btn-error"
          >
            close
          </button>
        </DialogActions>
      </Dialog>
      <div className="grid grid-cols-1 my-auto"></div>
    </>
  );
}
