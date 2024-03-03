"use client";
import MuiAvatar from "@/component/Avatar/MuiAvatar";
import { useGetUserQuery } from "@/redux/auth/auth.api";
import { INotification, NotificationTypeEnum } from "@/redux/notification/type";
import { Group, Indicator, Stack, Text } from "@mantine/core";
import moment from "moment";
import { FunctionComponent } from "react";

interface INotificationItem {
  notificationDetail: INotification;
  style: any;
}
const NotificationItem: FunctionComponent<INotificationItem> = ({ notificationDetail, style }) => {
  // const { data: user } = useGetUserQuery();
  return (
    <Group w={"100%"} m={"md"} align="center" style={style} className="cursor-pointer text-mantineText">
      <MuiAvatar
        sx={{ width: 32, height: 32 }}
        name={notificationDetail.senderUsername}
        src={
          notificationDetail.senderPicture && notificationDetail.senderPicture
            ? notificationDetail.senderPicture.includes("https")
              ? notificationDetail.senderPicture
              : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${notificationDetail.senderPicture}`
            : ""
        }
      />
      <Stack w="75%" gap={1}>
        <Text size="md">{notificationDetail.message}</Text>
        <Text c={"blue"} fw="700" size="sm">
          {moment(notificationDetail.createdAt, "YYYYMMDD").fromNow()}
        </Text>
      </Stack>
      <Indicator size={12} color="blue"></Indicator>
    </Group>
  );
};

export default NotificationItem;
