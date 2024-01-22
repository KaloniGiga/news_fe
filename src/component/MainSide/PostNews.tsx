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
        <DialogTitle>Create News Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Share your favorite news with the community. Consider sharing more articles to help people find interesting
            news.
          </DialogContentText>
          {/* <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
          /> */}
          <MyEditor />
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostNews;
