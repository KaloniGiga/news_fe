"use client";
import { Button, Card, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import DropSingleFile from "./DropSingleFile";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "@/redux/auth/auth.api";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/auth/auth.selector";
import UploadAvatar from "./UploadAvatar";

const FillUserInfo = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  // const { data: userData, error } = useGetUserQuery(undefined, { refetchOnMountOrArgChange: true });

  const form = useForm({
    initialValues: {
      file: "",
      fullname: "",
      username: "",
      email: "",
    },
    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
    },
  });

  const handleFormSubmit: SubmitHandler<any> = values => {
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("fullname", values.fullname);
    formData.append("username", values.username);
    formData.append("email", values.email);

    router.push("/choose-category");
  };

  useEffect(() => {
    if (user) {
      form.setFieldValue("username", user.username);
      form.setFieldValue("email", user.email);
    }
  }, [user]);

  return (
    <div className="w-full pb-8 flex flex-col justify-center items-center gap-y-8">
      <Card withBorder radius={"md"} p={"lg"} className="w-full">
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack>
            <Text my={"sm"} size="xl" fw={700}>
              Profile Info
            </Text>
            <TextInput
              // styles={{ input: { border: "none" } }}
              // required
              label="Full name"
              placeholder="Your full name"
              size="md"
              value={form.values.fullname}
              onChange={event => form.setFieldValue("fullname", event.currentTarget.value)}
              error={form.errors.email && "Invalid fullname"}
            />

            <TextInput
              // styles={{ input: { border: "none" } }}
              required
              label="Username"
              placeholder="Your username"
              size="md"
              value={form.values.username}
              onChange={event => form.setFieldValue("username", event.currentTarget.value)}
              error={form.errors.email && "Invalid username"}
            />

            <TextInput
              // styles={{ input: { border: "none" } }}
              // required
              label="Email"
              placeholder="Your email"
              size="md"
              disabled
              value={form.values.email}
              onChange={event => form.setFieldValue("email", event.currentTarget.value)}
              error={form.errors.email && "Invalid email"}
            />

            <DropSingleFile value={form.values.file} onChange={value => form.setFieldValue("file", value)} />
            {/* <UploadAvatar /> */}

            {/* <Group> */}
            <Button type="submit">Save</Button>
            {/* </Group> */}
          </Stack>
        </form>
      </Card>
    </div>
  );
};

export default FillUserInfo;
