"use client";
import { Avatar, Button, Card, Flex, Group, Stack, Text } from "@mantine/core";
import { IoCreateOutline } from "react-icons/io5";
import { FaBullseye, FaRegShareSquare } from "react-icons/fa";
import NavTabs from "../NavTabs/NavTabs";
import { FunctionComponent, useState } from "react";
import { IUser } from "@/redux/auth/type";
import PostNewsModel from "./PostNews/PostNewsModel";
import { useDisclosure } from "@mantine/hooks";
import { selectUser } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";

const MainDescription = () => {
  const [createPost, setCreatePost] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const user = useAppSelector(selectUser);

  const setOpen = (createPost: boolean) => {
    setCreatePost(createPost);
    open();
  };

  return (
    <Card withBorder radius={"md"} className="w-[80%] ml-[5%] my-8">
      {user && (
        <Flex justify={"space-between"}>
          <Group>
            <Avatar src={"/profileuser.jpg"} />
            <Stack gap={0}>
              <Text>{user.username}</Text>
              <Text>{user.email}</Text>
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
