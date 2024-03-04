"use client";
import { ActionIcon, Badge, Box, Button, Group } from "@mantine/core";
import NewsLogo from "./NewsLogo";
import SearchInput from "./SearchInput";
import MuiAvatar from "../Avatar/MuiAvatar";
import { useRouter } from "next/navigation";
import AuthButtonContainer from "./AuthButtonContainer";
import NotificationIcon from "./Notification/NotificationIcon";
import DarkLightMode from "../DarkLightMode/DarkLightMode";
import Bookmark from "./Bookmark/Bookmark";

const Header = () => {
  return (
    <Box className="w-[80%] mx-auto h-full flex justify-between py-2">
      <Group w={"40%"} justify="flex-start" wrap="nowrap">
        <NewsLogo />
        <SearchInput />
      </Group>

      <Group visibleFrom="sm">
        <NotificationIcon />
        <AuthButtonContainer />
        <DarkLightMode />
        <Bookmark />
      </Group>
    </Box>
  );
};

export default Header;
