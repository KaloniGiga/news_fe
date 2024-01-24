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
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import MyEditor from "../MyEditor/MyEditor";
import PostForm from "../PostForm/PostForm";
import PostFormTitle from "../PostForm/PostFormTitle";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PostNews = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full flex justify-end">
      <MuiButton label="Post News" variant="outlined" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
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
        <DialogTitle>
          <PostFormTitle handleClose={handleClose} />
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Share your favorite news with the community. Consider sharing more articles to help people find interesting
            news.
          </DialogContentText> */}
          <PostForm />
        </DialogContent>
        <DialogActions>
          <div className="w-[90%] mx-auto mb-4">
            <Button fullWidth variant="contained" type="submit">
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostNews;
