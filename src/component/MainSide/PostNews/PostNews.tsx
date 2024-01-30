"use client";
import React, { useState } from "react";
import MuiButton from "../../ui/MuiButton/MuiButton";
import PostEditNewsDialog from "./PostEditNewsDialog";
import PostNewsModel from "./PostNewsModel";

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
      <PostEditNewsDialog isEdit={false} handleClose={handleClose} open={open} />
    </div>
  );
};

export default PostNews;
