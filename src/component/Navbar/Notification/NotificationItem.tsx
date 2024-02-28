"use client";
import MuiAvatar from "@/component/Avatar/MuiAvatar";
import { useGetUserQuery } from "@/redux/auth/auth.api";
import { Group, Indicator, Stack, Text } from "@mantine/core";
import { FunctionComponent } from "react";

interface INotificationItem {
  id: number;
  message: string;
}
const NotificationItem: FunctionComponent<INotificationItem> = ({ id, message }) => {
  const { data: user } = useGetUserQuery();
  return (
    <Group w={"100%"} m={"md"} align="center" className="cursor-pointer text-mantineText">
      <MuiAvatar
        sx={{ width: 32, height: 32 }}
        name={user?.data.username[0]}
        src={
          user && user.data.picture
            ? user.data.picture.includes("https")
              ? user.data.picture
              : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${user.data.picture}`
            : ""
        }
      />
      <Stack w="75%" gap={1}>
        <Text size="md">{message}</Text>
        <Text c={"blue"} fw="700" size="sm">
          3 hours ago
        </Text>
      </Stack>
      <Indicator size={12} color="blue"></Indicator>
    </Group>
  );
};

export default NotificationItem;
