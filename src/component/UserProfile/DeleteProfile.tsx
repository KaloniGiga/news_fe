"use client";
import { useDeleteUserMutation } from "@/redux/user/user.api";
import { Button, Card, Dialog, Group, Modal, Stack, Text, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteProfile = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [deleteUser, { isLoading, data, error }] = useDeleteUserMutation();

  const handleDeleteSubmit = () => {
    deleteUser();
  };

  useEffect(() => {
    if (data) {
      router.replace("/");
    }
  }, [data]);

  const handleSubmitConfirm = () => {
    deleteUser();
  };

  return (
    <>
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
            <Button onClick={toggle} w={200} color={theme.colors.red[6]} leftSection={<RiDeleteBin6Line />}>
              Delete Account
            </Button>
          </Stack>
        </Card>
      </div>

      <Modal
        styles={{ title: { color: "var(--mantine-color-text)" } }}
        size={"lg"}
        opened={opened}
        onClose={close}
        withCloseButton={true}
        title="Delete Account"
        centered
      >
        <Text styles={{ root: { color: "var(--mantine-color-text)" } }} mb={"xs"}>
          Are you sure, you want to delete the account and all its data.
        </Text>

        <Group className="w-full" justify="flex-end" align="flex-end">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button color={theme.colors.red[6]} loading={isLoading} onClick={handleSubmitConfirm}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default DeleteProfile;
