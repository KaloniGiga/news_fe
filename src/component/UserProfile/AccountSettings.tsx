"use client";
import { MdOutlineChangeCircle } from "react-icons/md";
import { Button, Card, PasswordInput, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { useChangePasswordMutation, useGetUserQuery } from "@/redux/auth/auth.api";
import { SubmitHandler } from "react-hook-form";
import { PasswordDetail } from "@/redux/auth/type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useTranslations } from "next-intl";

const AccountSettings = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const t = useTranslations("UserInfo.changePassword");
  const { data: user } = useGetUserQuery();
  const [changePassword, { isLoading, data, error }] = useChangePasswordMutation();
  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit: SubmitHandler<PasswordDetail> = values => {
    form.reset();
    changePassword(values);
  };

  return user?.data.isGoogleAuth ? (
    <div></div>
  ) : (
    <form className="w-full mb-8" onSubmit={form.onSubmit(handleFormSubmit)}>
      <Card withBorder radius={"md"} p={"lg"} className="w-full">
        <Stack pb={"md"} className="w-full">
          <Text size="lg" fw={700}>
            {t("title")}
          </Text>
          <PasswordInput
            // styles={{ input: { border: "none" } }}
            required
            label={t("oldPassword")}
            placeholder="Enter old password"
            size="md"
            value={form.values.oldPassword}
            onChange={event => form.setFieldValue("oldPassword", event.currentTarget.value)}
            error={form.errors.email && "Invalid old password"}
          />
          <PasswordInput
            // styles={{ input: { border: "none" } }}
            required
            label={t("newPassword")}
            placeholder="Enter new password"
            size="md"
            value={form.values.newPassword}
            onChange={event => form.setFieldValue("newPassword", event.currentTarget.value)}
            error={form.errors.email && "Invalid new password"}
          />
          <PasswordInput
            // styles={{ input: { border: "none" } }}
            required
            label={t("confirmPassword")}
            placeholder="Confirm new password"
            size="md"
            value={form.values.confirmPassword}
            onChange={event => form.setFieldValue("confirmPassword", event.currentTarget.value)}
            error={form.errors.email && "Invalid confirm password"}
          />

          <Text size="xs" ta={"center"} c={"red"}>
            {error && ((error as FetchBaseQueryError).data as any).message}
          </Text>
          <Button loading={isLoading} type="submit" leftSection={<MdOutlineChangeCircle />}>
            {t("passwordButton")}
          </Button>
        </Stack>
      </Card>
    </form>
  );
};

export default AccountSettings;
