import { ActionIcon, Badge, Box } from "@mantine/core";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const NotificationIcon = () => {
  return (
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
  );
};

export default NotificationIcon;
