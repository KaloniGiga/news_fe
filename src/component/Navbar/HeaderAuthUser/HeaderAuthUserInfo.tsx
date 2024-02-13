"use client";
import { selectUser } from "@/redux/auth/auth.selector";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Group, Menu, Text, UnstyledButton } from "@mantine/core";
import MuiAvatar from "../../Avatar/MuiAvatar";
import { ChevronRight, LogoutOutlined, PostAddOutlined, Settings, VerifiedUserOutlined } from "@mui/icons-material";
import PostNewsModel from "@/component/MainSide/PostNews/PostNewsModel";
import { useDisclosure } from "@mantine/hooks";
import { useGetUserQuery, useLogoutMutation } from "@/redux/auth/auth.api";
import { useEffect, useState } from "react";
import { resetAuthUser } from "@/redux/auth/auth.slice";
import { useRouter } from "next/navigation";

const HeaderAuthUserInfo = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [createPost, setCreatePost] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  // const user = useAppSelector(selectUser);
  const { data: user } = useGetUserQuery();

  const [logout, { isLoading, error, data }] = useLogoutMutation();

  const handleLogoutClick = () => {
    logout();
  };

  const setOpen = (createPost: boolean) => {
    setCreatePost(createPost);
    open();
  };

  const handleProfileClick = () => {
    router.push("/user-info");
  };

  useEffect(() => {
    if (data) {
      dispatch(resetAuthUser());
    }
  }, [data, dispatch]);

  return (
    <>
      <Menu withArrow>
        <Menu.Target>
          <UnstyledButton>
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
              {/* <div>
            <Text size="sm" fw={500}>
              {user ? user.username : ""}
            </Text>

            <Text c="dimmed" size="xs">
              {user ? user.email: ""}
            </Text>
            </div>
            <ChevronRight /> */}
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => handleProfileClick()} leftSection={<VerifiedUserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item onClick={() => setOpen(true)} leftSection={<PostAddOutlined />}>
            Create Post
          </Menu.Item>
          <Menu.Item leftSection={<Settings />}>Settings</Menu.Item>
          <Menu.Item onClick={handleLogoutClick} leftSection={<LogoutOutlined />}>
            Sign Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <PostNewsModel
        createPost={createPost}
        setCreatePost={setCreatePost}
        isEdit={false}
        open={open}
        close={close}
        opened={opened}
      />
    </>
  );
};

export default HeaderAuthUserInfo;
