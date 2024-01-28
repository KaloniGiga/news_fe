import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import HideSourceIcon from "@mui/icons-material/HideSource";
import React, { FunctionComponent } from "react";
import EditNews from "../EditNews/EditNews";
import { EditPostData, PostData } from "@/redux/post/type";
import { ActionIcon, Menu } from "@mantine/core";
import { Edit } from "@mui/icons-material";

interface INewsCardOption {
  editData: PostData;
}

const NewsCardOption: FunctionComponent<INewsCardOption> = ({ editData }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("wher");
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon size={"lg"} variant="light">
          <MoreVertIcon />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<Edit />}>
          <EditNews editData={editData} />
        </Menu.Item>
        <Menu.Item leftSection={<DeleteIcon fontSize="small" />}>Delete</Menu.Item>
        <Menu.Item leftSection={<HideSourceIcon fontSize="small" />}>Hide</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NewsCardOption;
