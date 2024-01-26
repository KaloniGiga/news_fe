"use client";
import PostForm from "@/component/PostForm/PostForm";
import { EditPostData, PostData } from "@/redux/post/type";
import { Dialog, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { FunctionComponent } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IPostEditNewsDialog {
  open: boolean;
  handleClose: () => void;
  isEdit?: boolean;
  editData?: PostData;
}

const PostEditNewsDialog: FunctionComponent<IPostEditNewsDialog> = ({
  open,
  handleClose,
  isEdit = false,
  editData,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      style={{ borderRadius: "12px" }}
      slotProps={{ backdrop: { sx: { backgroundColor: "rgba(255,255,255,0.6)" } } }}
    >
      <PostForm editData={editData} isEdit={isEdit} handleClose={handleClose} />
    </Dialog>
  );
};

export default PostEditNewsDialog;
