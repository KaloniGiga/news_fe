import { ActionIcon, Badge, Box, Group, Menu, MenuLabel, Text } from "@mantine/core";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationOption from "./NotificationOption";
import NotificationItem from "./NotificationItem";

const NotificationIcon = () => {
  return (
    <Menu openDelay={100} position="bottom">
      <Menu.Target>
        <Box pos={"relative"}>
          <Box style={{ zIndex: "100" }} component="div" pos={"absolute"} top={-10} right={-10}>
            <Badge variant="gradient" gradient={{ from: "red", to: "orange", deg: 90 }} size="lg" circle>
              3
            </Badge>
          </Box>
          <ActionIcon size={"lg"} variant="danger">
            <NotificationsNoneIcon />
          </ActionIcon>
        </Box>
      </Menu.Target>
      <Menu.Dropdown>
        <MenuLabel>
          <Group gap={"xs"} justify="space-between">
            <Text c={"black"} fw="800" size="lg">
              Notification
            </Text>
            <NotificationOption />
          </Group>
        </MenuLabel>
        <div className="w-[400px] flex flex-col gap-y-2">
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationIcon;
