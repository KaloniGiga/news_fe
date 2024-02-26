"use client";
import MuiAvatar from "@/component/Avatar/MuiAvatar";
import { useGetUserQuery } from "@/redux/auth/auth.api";
import { Group, Stack, Text } from "@mantine/core";

const NotificationItem = () => {
  const { data: user } = useGetUserQuery();
  return (
    <Group w={"100%"}>
      <MuiAvatar
        size="small"
        name={user?.data.username[0]}
        src={
          user && user.data.picture
            ? user.data.picture.includes("https")
              ? user.data.picture
              : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${user.data.picture}`
            : ""
        }
      />
      <Stack gap={1}>
        <Text>Patrick David commented on your Post.</Text>
        <Text>3 hours ago</Text>
      </Stack>
    </Group>
  );
};

export default NotificationItem;
