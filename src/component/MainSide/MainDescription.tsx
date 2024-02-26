"use client";
import { Avatar, Button, Card, Flex, Group, Stack, Text } from "@mantine/core";
import { IoCreateOutline } from "react-icons/io5";
import { FaBullseye, FaRegShareSquare } from "react-icons/fa";
import NavTabs from "../NavTabs/NavTabs";
import { FunctionComponent, useState } from "react";
import { IUser } from "@/redux/auth/type";
import PostNewsModel from "./PostNews/PostNewsModel";
import { useDisclosure } from "@mantine/hooks";
import { selectAuthenticated, selectUser } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";
import { useGetUserQuery } from "@/redux/auth/auth.api";
import MuiAvatar from "../Avatar/MuiAvatar";

const MainDescription = () => {
  const [createPost, setCreatePost] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const { data: user } = useGetUserQuery();
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);

  const setOpen = (createPost: boolean) => {
    setCreatePost(createPost);
    open();
  };

  return (
    <Card withBorder radius={"md"} className="lg:w-[80%] w-[90%] ml-[5%] my-8">
      {isAuthenticatedUser && (
        <Flex className="flex lg:flex-row flex-col gap-5 justify-between">
          <Group>
            <MuiAvatar
              name={user?.data.username[0]}
              src={
                user && user.data.picture
                  ? user.data.picture.includes("https")
                    ? user.data.picture
                    : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${user.data.picture}`
                  : ""
              }
            />
            <Stack gap={0}>
              <Text>{user && user.data.username}</Text>
              <Text>{user && user.data.email}</Text>
            </Stack>
          </Group>

          <Group>
            <Button variant="default" leftSection={<FaRegShareSquare />} onClick={() => setOpen(false)}>
              Share News
            </Button>
            <Button leftSection={<IoCreateOutline />} onClick={() => setOpen(true)}>
              Create Post
            </Button>
            <PostNewsModel
              setCreatePost={setCreatePost}
              createPost={createPost}
              isEdit={false}
              open={open}
              close={close}
              opened={opened}
            />
          </Group>
        </Flex>
      )}
      <NavTabs />
    </Card>
  );
};

export default MainDescription;
