import { ActionIcon, Menu } from "@mantine/core";
import { MdMoreHoriz } from "react-icons/md";

const NotificationOption = () => {
  return (
    <Menu withinPortal={false} withArrow arrowPosition="side">
      <Menu.Target>
        <ActionIcon styles={{ root: { border: "none" } }} size={"lg"} variant="outline">
          <MdMoreHoriz size={25} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>Mark all as Read</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationOption;
