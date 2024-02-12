"use client";
import { Button, Card, Stack, Text, useMantineTheme } from "@mantine/core";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteProfile = () => {
  const theme = useMantineTheme();
  return (
    <div className="w-full">
      <Card withBorder radius={"md"} p={"lg"} className="w-full">
        <Stack>
          <Text c={"red"} my={"sm"} size="xl" fw={700}>
            Danger zone
          </Text>
          <Text size="lg" fw={700}>
            Delete Account
          </Text>
          <Text size="sm">Delete your profile, along with your post and shared news.</Text>
          <Button w={200} color={theme.colors.red[6]} leftSection={<RiDeleteBin6Line />}>
            Delete Account
          </Button>
        </Stack>
      </Card>
    </div>
  );
};

export default DeleteProfile;
