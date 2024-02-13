"use client";
import { useDeleteUserMutation } from "@/redux/user/user.api";
import { Button, Card, Stack, Text, useMantineTheme } from "@mantine/core";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteProfile = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [deleteUser, { isLoading, data, error }] = useDeleteUserMutation();

  const handleDeleteSubmit = () => {
    deleteUser();
  };

  useEffect(() => {
    if (data) {
      router.replace("/");
    }
  }, [data]);

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
          <Text size="xs" ta={"center"} c={"red"}>
            {error && ((error as FetchBaseQueryError).data as any).message}
          </Text>
          <Button
            loading={isLoading}
            onClick={handleDeleteSubmit}
            w={200}
            color={theme.colors.red[6]}
            leftSection={<RiDeleteBin6Line />}
          >
            Delete Account
          </Button>
        </Stack>
      </Card>
    </div>
  );
};

export default DeleteProfile;
