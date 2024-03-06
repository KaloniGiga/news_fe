/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Anchor,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { GoogleButton } from "./GoogleButton";
import { FacebookButton } from "./FacebookButton";
import { FunctionComponent, useEffect } from "react";
import LockIcon from "@mui/icons-material/Lock";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { SubmitHandler } from "react-hook-form";
import { UserData } from "@/redux/auth/type";
import { useCreateUserMutation, useReadLoginMutation } from "@/redux/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthUser } from "@/redux/auth/auth.slice";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useTranslations } from "next-intl";

const UserLoginForm = () => {
  const t = useTranslations();
  const [type, toggle] = useToggle([t("Login.signUpButton"), t("Login.loginButton")]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [createUser, { isLoading: createUserLoading, data: createUserData, error }] = useCreateUserMutation();

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
    if (createUserData) {
      dispatch(setAuthUser(createUserData.data));
      if (createUserData.data && createUserData.data.categories && createUserData.data.categories.length > 0) {
        router.replace("/");
      } else {
        router.replace("/choose-category");
      }
    }
  }, [createUserData, dispatch, router]);

  const handleFormSubmit: SubmitHandler<UserData> = values => {
    if (type == t("Login.signUpButton")) {
      createUser(values);
    }
  };

  return (
    <div className="w-full h-screen flex items-center overflow-hidden">
      <div className="w-[60%] h-full bg-[url('/loginnews1.jpg')] bg-cover bg-center lg:block hidden"></div>
      <Card className="lg:w-[40%] w-full" p="xl">
        <Title order={2} ta="center" mt="md" mb="md">
          {t("Login.title")}
        </Title>
        <Text ta={"center"} size="xs" c="red">
          {error && ((error as FetchBaseQueryError).data as any).message}
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
              placeholder="Your password"
              label={t("Login.password")}
              size="md"
              value={form.values.password}
              onChange={event => form.setFieldValue("password", event.currentTarget.value)}
              error={form.errors.password && "Password should include at least 6 characters"}
              leftSection={<LockOpenIcon />}
            />

            {type === t("Login.signUpButton") && (
              <Checkbox
                label={t("Login.accessTerms")}
                checked={form.values.terms}
                onChange={event => form.setFieldValue("terms", event.currentTarget.checked)}
              />
            )}
          </Stack>

          {type == t("Login.loginButton") && (
            <Group justify="space-between" mt="lg">
              <Checkbox
                onChange={event => form.setFieldValue("keepLoggedIn", event.currentTarget.checked)}
                checked={form.values.keepLoggedIn}
                label={t("Login.keepLogged")}
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
              onClick={() => router.push("/login")}
              size="xs"
            >
              {type === t("Login.signupButton") ? t("Login.loginLink") : t("Login.registerLink")}
            </Anchor>
            <Button loading={createUserLoading} fullWidth type="submit" radius="sm">
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

export default UserLoginForm;
