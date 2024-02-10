"use client";
import { Button, Card, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import DropSingleFile from "./DropSingleFile";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "@/redux/auth/auth.api";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/auth/auth.selector";

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
  }, [user, form]);

  return (
    <div className="w-[40%] py-16 flex flex-col justify-center items-center gap-y-8">
      <Title order={3}>Complete profile for full expeience.</Title>
      {/* <Text size="sm">Finish creating your account.</Text> */}

      <Card withBorder radius={"md"} p={"lg"} className="w-full">
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack>
            <TextInput
              styles={{ input: { border: "none" } }}
              required
              // label="Full name"
              placeholder="Your full name"
              size="md"
              value={form.values.fullname}
              onChange={event => form.setFieldValue("fullname", event.currentTarget.value)}
              error={form.errors.email && "Invalid fullname"}
            />

            <TextInput
              styles={{ input: { border: "none" } }}
              required
              // label="Username"
              placeholder="Your username"
              size="md"
              value={form.values.username}
              onChange={event => form.setFieldValue("username", event.currentTarget.value)}
              error={form.errors.email && "Invalid username"}
            />

            <TextInput
              styles={{ input: { border: "none" } }}
              required
              // label="Email"
              placeholder="Your email"
              size="md"
              disabled
              value={form.values.email}
              onChange={event => form.setFieldValue("email", event.currentTarget.value)}
              error={form.errors.email && "Invalid email"}
            />

            <DropSingleFile value={form.values.file} onChange={value => form.setFieldValue("file", value)} />

            <Button type="submit">Save</Button>
          </Stack>
        </form>
      </Card>
    </div>
  );
};

export default FillUserInfo;
