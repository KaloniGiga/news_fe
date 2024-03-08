/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Anchor,
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { GoogleButton } from "./GoogleButton";
import { useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthUser } from "@/redux/auth/auth.slice";
import { notifications } from "@mantine/notifications";
import { SubmitHandler } from "react-hook-form";
import { UserData } from "@/redux/auth/type";
import { useLazyGoogleAuthQuery, useReadLoginMutation } from "@/redux/auth/auth.api";
import React from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useTranslations } from "next-intl";

const AuthForm = () => {
  const t = useTranslations();
  const [type, toggle] = useToggle([t("Login.loginButton"), t("Login.signUpButton")]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [readLogin, { isLoading: loginLoading, data: readLoginData, error }] = useReadLoginMutation();
  const [googleAuth, { isLoading, error: googleError }] = useLazyGoogleAuthQuery();
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      terms: true,
      keepLoggedIn: false,
    },
    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: val => (val.length <= 6 ? "Password should include at least 6 characters" : null),
    },
  });

  useEffect(() => {
    if (readLoginData) {
      form.reset();
      if (readLoginData.data) {
        dispatch(setAuthUser(readLoginData.data));
        notifications.show({
          message: "Login success! 🤥",
        });

        if (readLoginData.data && readLoginData.data.categories && readLoginData.data.categories.length > 0) {
          router.replace("/");
        } else {
          router.replace("/choose-category");
        }
      }
    }
  }, [readLoginData, dispatch, router]);

  const handleFormSubmit: SubmitHandler<UserData> = values => {
    if (type == t("Login.loginButton")) {
      readLogin(values);
    }
  };
  console.log(error);

  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <Card withBorder className="lg:w-[40%] w-full">
        <Title order={2} ta="center" mt="md" mb="xl">
          {t("Login.title")}
        </Title>
        <Text ta={"center"} size="xs" c="red">
          {error && (error as FetchBaseQueryError).data && ((error as FetchBaseQueryError).data as any).message}
        </Text>
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack>
            {type === t("Login.signUpButton") && (
              <TextInput
                required
                label={t("Login.username")}
                placeholder="Your username"
                size="md"
                value={form.values.username}
                onChange={event => form.setFieldValue("username", event.currentTarget.value)}
                error={form.errors.email && "Invalid username"}
                leftSection={<PersonOutlineIcon />}
              />
            )}

            <TextInput
              required
              label={t("Login.email")}
              size="md"
              placeholder="hello@gmail.com"
              value={form.values.email}
              onChange={event => form.setFieldValue("email", event.currentTarget.value)}
              error={form.errors.email && "Invalid email"}
              leftSection={<MailOutlineIcon />}
            />

            <PasswordInput
              required
              label={t("Login.password")}
              placeholder="Your password"
              size="md"
              value={form.values.password}
              onChange={event => form.setFieldValue("password", event.currentTarget.value)}
              error={form.errors.password && "Password should include at least 6 characters"}
              leftSection={<LockOpenIcon />}
            />

            {type === t("Login.signUpButton") && (
              <Checkbox
                labelPosition="right"
                label={t("Login.accessTerms")}
                checked={form.values.terms}
                onChange={event => form.setFieldValue("terms", event.currentTarget.checked)}
              />
            )}
          </Stack>

          {type == t("Login.loginButton") && (
            <Group justify="space-between" mt="lg">
              <Checkbox
                labelPosition="right"
                label={t("Login.keepLogged")}
                checked={form.values.keepLoggedIn}
                onChange={event => form.setFieldValue("keepLoggedIn", event.currentTarget.checked)}
              />
              <Anchor component="button" size="sm">
                {t("Login.forgetPassword")}
              </Anchor>
            </Group>
          )}

          <Stack mt="xl" align="flex-start">
            <Anchor
              fs={"xl"}
              component="button"
              type="button"
              c="dimmed"
              onClick={() => router.push("/auth")}
              size="xs"
            >
              {type === t("Login.signupButton") ? t("Login.loginLink") : t("Login.registerLink")}
            </Anchor>
            <Button variant="filled" loading={loginLoading} fullWidth type="submit" radius="sm">
              {upperFirst(type)}
            </Button>
          </Stack>
        </form>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />
        <Group grow mb={"md"} mt="md">
          <GoogleButton label={t("Login.continueWithGoogle")} />
          {/* <FacebookButton radius={"xl"}>Continue with Facebook</FacebookButton> */}
        </Group>
      </Card>
    </div>
  );
};

export default AuthForm;
