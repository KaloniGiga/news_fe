"use client";
import { useDeleteUserMutation } from "@/redux/user/user.api";
import { Button, Card, Dialog, Group, Modal, Stack, Text, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteProfile = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [opened, { toggle, close }] = useDisclosure(false);
  const t = useTranslations("UserInfo.deleteAccount");
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
              {t("header")}
            </Text>
            <Text size="lg" fw={700}>
              {t("title")}
            </Text>
            <Text size="sm">{t("description")}</Text>
            <Text size="xs" ta={"center"} c={"red"}>
              {error && ((error as FetchBaseQueryError).data as any).message}
            </Text>
            <Button onClick={toggle} w={200} color={theme.colors.red[6]} leftSection={<RiDeleteBin6Line />}>
              {t("deleteButton")}
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
        title={t("title")}
        centered
      >
        <Text styles={{ root: { color: "var(--mantine-color-text)" } }} mb={"xs"}>
          {t("confirmDeleteDesc")}
        </Text>

        <Group className="w-full" justify="flex-end" align="flex-end">
          <Button variant="default" onClick={close}>
            {t("cancelButton")}
          </Button>
          <Button color={theme.colors.red[6]} loading={isLoading} onClick={handleSubmitConfirm}>
            {t("confirmButton")}
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default DeleteProfile;
