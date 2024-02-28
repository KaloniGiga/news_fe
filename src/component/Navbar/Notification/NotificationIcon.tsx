import { ActionIcon, Badge, Box, Group, Menu, MenuLabel, ScrollArea, Text } from "@mantine/core";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationOption from "./NotificationOption";
import NotificationItem from "./NotificationItem";
import { useGetNotificationsQuery } from "@/redux/notification/notification.api";

const NotificationIcon = () => {
  const { isLoading, data, isError } = useGetNotificationsQuery();
  const notificationData = [
    {
      id: 1,
      message: "Simon comment on your post,",
    },
    {
      id: 2,
      message: "Simon comment on your post,",
    },
    {
      id: 3,
      message: "Simon comment on your post,",
    },
    {
      id: 4,
      message: "Simon comment on your post,",
    },
    {
      id: 5,
      message: "Simon comment on your post,",
    },
    {
      id: 6,
      message: "Simon comment on your post,",
    },
    {
      id: 7,
      message: "Simon comment on your post,",
    },
    {
      id: 9,
      message: "Simon comment on your post,",
    },
    {
      id: 10,
      message: "Simon comment on your post,",
    },
  ];

  return (
    <Menu openDelay={100} position="bottom">
      <Menu.Target>
        <Box pos={"relative"}>
          <Box style={{ zIndex: "100" }} component="div" pos={"absolute"} top={-10} right={-10}>
            <Badge variant="gradient" gradient={{ from: "red", to: "orange", deg: 90 }} size="lg" circle>
              3
            </Badge>
          </Box>
          <ActionIcon color="gray" size={"lg"} variant="danger">
            <NotificationsNoneIcon />
          </ActionIcon>
        </Box>
      </Menu.Target>
      <Menu.Dropdown>
        <MenuLabel>
          <Group gap={"xs"} justify="space-between">
            <Text className="text-mantineText" fw="800" size="lg">
              Notification
            </Text>
            <NotificationOption />
          </Group>
        </MenuLabel>

        <div className="w-[400px] flex flex-col">
          <ScrollArea.Autosize mah={500} scrollbars="y">
            {isLoading && <div>Loading...</div>}
            {notificationData && notificationData.length > 0 ? (
              <>
                {notificationData.map((notif, index) => {
                  return <NotificationItem key={index} id={notif.id} message={notif.message} />;
                })}
              </>
            ) : (
              <div>No noficication</div>
            )}
          </ScrollArea.Autosize>
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationIcon;
