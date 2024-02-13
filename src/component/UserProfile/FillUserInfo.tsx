"use client";
import { Button, Card, Group, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import DropSingleFile from "./DropSingleFile";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/auth/auth.selector";
import UploadAvatar from "./UploadAvatar";
import { useUpdateUserMutation } from "@/redux/user/user.api";
import { setAuthUser } from "@/redux/auth/auth.slice";
import { useGetUserQuery } from "@/redux/auth/auth.api";

const FillUserInfo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const user = useAppSelector(selectUser);
  const { data: userData, refetch } = useGetUserQuery();
  const [updateUser, { isLoading, data: updateData, error }] = useUpdateUserMutation();

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

    updateUser(formData);
  };

  useEffect(() => {
    if (userData && userData.data) {
      console.log(userData);
      form.setFieldValue("fullname", userData.data.fullname);
      form.setFieldValue("username", userData.data.username);
      form.setFieldValue("email", userData.data.email);
    }
  }, [userData]);

  useEffect(() => {
    if (updateData) {
      refetch();
    }
  }, [updateData]);

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
            <Button loading={isLoading} type="submit">
              Save
            </Button>
            {/* </Group> */}
          </Stack>
        </form>
      </Card>
    </div>
  );
};

export default FillUserInfo;
