"use client";
import { ListItemIcon, ListItemText } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { FunctionComponent, useState } from "react";
import PostEditNewsDialog from "../PostNews/PostEditNewsDialog";
import { EditPostData, PostData } from "@/redux/post/type";

interface IEditNews {
  editData: PostData;
}
const EditNews: FunctionComponent<IEditNews> = ({ editData }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <div className="flex" onClick={handleClickOpen}>
        Edit
      </div>
      <PostEditNewsDialog editData={editData} isEdit={true} handleClose={handleClose} open={open} />
    </div>
  );
};

export default EditNews;
