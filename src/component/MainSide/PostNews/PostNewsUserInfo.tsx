import MuiAvatar from "@/component/Avatar/MuiAvatar";
import { selectUser } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";
import { Group, Text } from "@mantine/core";

const PostNewsUserInfo = () => {
  const user = useAppSelector(selectUser);
  return (
    <Group>
      <MuiAvatar src="profileuser.jpg" />
      <div>
        <Text size="sm" fw={500}>
          {user ? user.username : "Dipak kalauni"}
        </Text>
        <Text c="dimmed" size="xs">
          {user ? user.email : "kalaunidipak5@gmail.com"}
        </Text>
      </div>
    </Group>
  );
};

export default PostNewsUserInfo;
