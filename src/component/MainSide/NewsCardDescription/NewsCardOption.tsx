"use client";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import HideSourceIcon from "@mui/icons-material/HideSource";
import React, { FunctionComponent, useEffect } from "react";
import EditNews from "../EditNews/EditNews";
import { EditPostData, GetPostData, PostData } from "@/redux/post/type";
import { ActionIcon, Menu } from "@mantine/core";
import { Edit } from "@mui/icons-material";
import { useDisclosure } from "@mantine/hooks";
import PostNewsModel from "../PostNews/PostNewsModel";
import { useLogoutMutation } from "@/redux/auth/auth.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetAuthUser } from "@/redux/auth/auth.slice";
import { selectUser } from "@/redux/auth/auth.selector";

interface INewsCardOption {
  editData: GetPostData;
}

const NewsCardOption: FunctionComponent<INewsCardOption> = ({ editData }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const user = useAppSelector(selectUser);

  return (
    <>
      <Menu withinPortal={false}>
        <Menu.Target>
          <ActionIcon size={"lg"} variant="light">
            <MoreVertIcon />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          {user && editData.user && user.id == editData.user?.id && (
            <>
              <Menu.Item onClick={open} leftSection={<Edit />}>
                <EditNews editData={editData} />
              </Menu.Item>
              <Menu.Item leftSection={<DeleteIcon fontSize="small" />}>Delete</Menu.Item>
            </>
          )}
          <Menu.Item leftSection={<HideSourceIcon fontSize="small" />}>Hide</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <PostNewsModel editData={editData} isEdit={true} open={open} close={close} opened={opened} />
    </>
  );
};

export default NewsCardOption;
