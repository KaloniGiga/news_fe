import { ActionIcon, Badge, Box, Button, Group } from "@mantine/core";
import NewsLogo from "./NewsLogo";
import SearchInput from "./SearchInput";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MuiAvatar from "../Avatar/MuiAvatar";

const Header = () => {
  return (
    <div className="w-full h-[10vh] overflow-hidden bg-white border-b-[1px] border-[rgba(0,0,0,0.2)]">
      <div className="w-[80%] mx-auto h-full flex justify-between py-2">
        <Group w={"40%"} justify="flex-start" wrap="nowrap">
          <NewsLogo />
          <SearchInput />
        </Group>

        <Group visibleFrom="sm">
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
          <Button variant="default">Log in</Button>
          <Button>Sign up</Button>
          <MuiAvatar src="/profileuser.jpg" />
        </Group>
      </div>
    </div>
  );
};

export default Header;
