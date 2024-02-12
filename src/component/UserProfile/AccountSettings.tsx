"use client";
import { MdOutlineChangeCircle } from "react-icons/md";
import { Button, Card, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";

const AccountSettings = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="w-full">
      <Text size="lg" fw={700}>
        Change Password
      </Text>
      <TextInput
        // styles={{ input: { border: "none" } }}
        // required
        label="Old Password"
        placeholder="Enter old password"
        size="md"
        value={form.values.oldPassword}
        onChange={event => form.setFieldValue("oldPassword", event.currentTarget.value)}
        error={form.errors.email && "Invalid old password"}
      />
      <TextInput
        // styles={{ input: { border: "none" } }}
        // required
        label="New Password"
        placeholder="Enter new password"
        size="md"
        value={form.values.newPassword}
        onChange={event => form.setFieldValue("newPassword", event.currentTarget.value)}
        error={form.errors.email && "Invalid new password"}
      />
      <TextInput
        // styles={{ input: { border: "none" } }}
        // required
        label="Confirm password"
        placeholder="Confirm old password"
        size="md"
        value={form.values.oldPassword}
        onChange={event => form.setFieldValue("confirmPassword", event.currentTarget.value)}
        error={form.errors.email && "Invalid confirm password"}
      />
      <Button w={200} leftSection={<MdOutlineChangeCircle />}>
        Change Password
      </Button>
    </div>
  );
};

export default AccountSettings;
