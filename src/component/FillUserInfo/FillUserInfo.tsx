"use client";
import { Button, Card, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import DropSingleFile from "./DropSingleFile";
import { SubmitHandler } from "react-hook-form";

const FillUserInfo = () => {
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
    console.log(values);
  };

  return (
    <div className="w-[40%] py-16 flex flex-col justify-center items-center gap-y-4">
      <Title order={2}>Complete profile for full expeience.</Title>
      <Text size="sm">Finish creating your account.</Text>

      <Card radius={"md"} p={"md"} className="w-full">
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack>
            <TextInput
              required
              label="Full name"
              placeholder="Your fullname"
              size="md"
              value={form.values.fullname}
              onChange={event => form.setFieldValue("fullname", event.currentTarget.value)}
              error={form.errors.email && "Invalid fullname"}
            />

            <TextInput
              required
              label="Username"
              placeholder="Your username"
              size="md"
              value={form.values.username}
              onChange={event => form.setFieldValue("username", event.currentTarget.value)}
              error={form.errors.email && "Invalid username"}
            />

            <TextInput
              required
              label="Email"
              placeholder="Your email"
              size="md"
              value={form.values.email}
              onChange={event => form.setFieldValue("email", event.currentTarget.value)}
              error={form.errors.email && "Invalid email"}
            />

            <DropSingleFile
              value={form.values.file}
              onChange={event => form.setFieldValue("file", event.currentTarget.value)}
            />

            <Button>Save</Button>
          </Stack>
        </form>
      </Card>
    </div>
  );
};

export default FillUserInfo;
