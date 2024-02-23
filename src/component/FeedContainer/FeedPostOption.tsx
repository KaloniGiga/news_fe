"use client";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import HideSourceIcon from "@mui/icons-material/HideSource";
import React, { FunctionComponent, useEffect, useState } from "react";
import { EditPostData, GetPostData, PostData } from "@/redux/post/type";
import { ActionIcon, Menu } from "@mantine/core";
import { Edit } from "@mui/icons-material";
import { useDisclosure } from "@mantine/hooks";
import { useGetUserQuery, useLogoutMutation } from "@/redux/auth/auth.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetAuthUser } from "@/redux/auth/auth.slice";
import { selectAuthenticated, selectUser } from "@/redux/auth/auth.selector";
import EditNews from "../MainSide/EditNews/EditNews";
import PostNewsModel from "../MainSide/PostNews/PostNewsModel";

interface IFeedPostOption {
  feedData: GetPostData;
}

const FeedPostOption: FunctionComponent<IFeedPostOption> = ({ feedData }) => {
  const [createPost, setCreatePost] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { data: user } = useGetUserQuery();
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);

  const setOpen = (createPost: boolean) => {
    setCreatePost(createPost);
    open();
  };

  return (
    <>
      <Menu withinPortal={false}>
        <Menu.Target>
          <ActionIcon styles={{ root: { border: "none" } }} size={"lg"} variant="outline">
            <MoreVertIcon />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          {user && feedData.user && user.data.id == feedData.user?.id && (
            <>
              <Menu.Item onClick={() => setOpen(true)} leftSection={<Edit />}>
                <EditNews editData={feedData} />
              </Menu.Item>
              <Menu.Item leftSection={<DeleteIcon fontSize="small" />}>Delete</Menu.Item>
            </>
          )}
          <Menu.Item leftSection={<HideSourceIcon fontSize="small" />}>Hide</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <PostNewsModel
        createPost={createPost}
        setCreatePost={setCreatePost}
        editData={feedData}
        isEdit={true}
        open={open}
        close={close}
        opened={opened}
      />
    </>
  );
};

export default FeedPostOption;
