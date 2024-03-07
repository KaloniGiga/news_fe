"use client";
import { Button, Card, Flex, Group, Stack, Text } from "@mantine/core";
import { IoCreateOutline } from "react-icons/io5";
import { FaRegShareSquare } from "react-icons/fa";
import NavTabs from "../NavTabs/NavTabs";
import { FunctionComponent, useState } from "react";
import PostNewsModel from "./PostNews/PostNewsModel";
import { useDisclosure } from "@mantine/hooks";
import { selectAuthenticated } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";
import { useGetUserQuery } from "@/redux/auth/auth.api";
import MuiAvatar from "../Avatar/MuiAvatar";
import MainDescriptionSkeleton from "../Skeleton/MainDescriptionSkeletion/MainDescriptionSkeleton";
import { useTranslations } from "next-intl";

const MainDescription: FunctionComponent = () => {
  const t = useTranslations();
  const [createPost, setCreatePost] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const { data: user, isLoading } = useGetUserQuery();
  const isAuthenticated = useAppSelector(selectAuthenticated);

  const setOpen = (createPost: boolean) => {
    setCreatePost(createPost);
    open();
  };

  if (isLoading) {
    return <MainDescriptionSkeleton />;
  }
  return (
    <Card withBorder radius={"md"} className="lg:w-[80%] w-[90%] ml-[5%] my-8">
      {isAuthenticated && user && (
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
              {t("Home.mainDesc.shareNews")}
            </Button>
            <Button leftSection={<IoCreateOutline />} onClick={() => setOpen(true)}>
              {t("Home.mainDesc.createPost")}
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
