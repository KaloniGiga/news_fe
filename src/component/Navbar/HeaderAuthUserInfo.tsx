"use client";
import { selectUser } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";
import { Group, Menu, Text, UnstyledButton } from "@mantine/core";
import MuiAvatar from "../Avatar/MuiAvatar";
import { ChevronRight, LogoutOutlined, PostAddOutlined, Settings, VerifiedUserOutlined } from "@mui/icons-material";

const HeaderAuthUserInfo = () => {
  const user = useAppSelector(selectUser);
  return (
    <Menu withArrow>
      <Menu.Target>
        <UnstyledButton>
          <Group>
            <MuiAvatar src="profileuser.jpg" />
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
        <Menu.Item leftSection={<VerifiedUserOutlined />}>Profile</Menu.Item>
        <Menu.Item leftSection={<PostAddOutlined />}>Create Post</Menu.Item>
        <Menu.Item leftSection={<Settings />}>Settings</Menu.Item>
        <Menu.Item leftSection={<LogoutOutlined />}>Sign Out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default HeaderAuthUserInfo;
