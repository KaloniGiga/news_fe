"use client";
import React, { useState } from "react";
import MuiButton from "../ui/MuiButton/MuiButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AccountForm from "./AccountForm";
import Image from "next/image";
import { Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const LoginButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MuiButton label="Login" variant="text" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        {/* <DialogTitle>Login</DialogTitle> */}
        <DialogContent>
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden mx-auto">
            <Image
              src={"/Portal-logo.jpg"}
              alt=""
              width={2000}
              height={2000}
              className="w-full h-full object-contain object-center"
            />
          </div>
          <AccountForm />
        </DialogContent>
        <DialogActions>
          <div className="w-full flex flex-col gap-y-4 px-4 pb-8">
            <Button size="large" fullWidth={true} variant="contained" type="submit">
              Login
            </Button>
            <Button size="large" fullWidth={true} variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Divider>OR</Divider>
            <Button size="large" startIcon={<GoogleIcon />} fullWidth={true} variant="contained">
              Continue with Google
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginButton;
