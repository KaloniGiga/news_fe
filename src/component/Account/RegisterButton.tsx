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
import AccountForm from "./RegisterForm";
import { Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Image from "next/image";
import RegisterForm from "./RegisterForm";

const RegisterButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MuiButton label="Register" variant="outlined" onClick={handleClickOpen} size="medium" />
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
        {/* <DialogTitle>Register an Account.</DialogTitle> */}
        <DialogContent>
          <div className="w-[100px] h-[70px] 2xl:h-[100px] rounded-full mx-auto">
            <Image
              src={"/Portal-logo.jpg"}
              alt=""
              width={2000}
              height={2000}
              className="w-full h-full object-contain object-center"
            />
          </div>
          <RegisterForm />
        </DialogContent>
        <DialogActions>
          <div className="w-full flex flex-col gap-y-2 px-4 pb-4">
            <Button size="large" fullWidth={true} variant="contained" type="submit">
              Register
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
    </div>
  );
};

export default RegisterButton;
