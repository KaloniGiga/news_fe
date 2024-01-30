"use client";
import {
  Anchor,
  Box,
  Button,
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
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthUser } from "@/redux/auth/auth.slice";
import { notifications } from "@mantine/notifications";
import { SubmitHandler } from "react-hook-form";
import { UserData } from "@/redux/auth/type";
import { useCreateUserMutation } from "@/redux/auth/auth.api";

const AuthForm = () => {
  const [type, toggle] = useToggle(["Sign up", "Login"]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [createUser, { isLoading: createUserLoading, data: createUserData }] = useCreateUserMutation();
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
      form.reset();
      if (createUserData.data) {
        dispatch(setAuthUser(createUserData.data));
        notifications.show({
          message: "Login success! 🤥",
        });
        router.replace("/");
      }
    }
  }, [createUserData]);

  const handleFormSubmit: SubmitHandler<UserData> = values => {
    console.log(values);
    if (type == "Sign up") {
      createUser(values);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[40%]">
        <Paper h="100%" w="100%" p="xl">
          <Title order={2} ta="center" mt="md" mb="xl">
            Welcome back to News Portal!
          </Title>
          <form onSubmit={form.onSubmit(handleFormSubmit)}>
            <Stack>
              {type === "Sign up" && (
                <TextInput
                  required
                  label="Username"
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
                label="Email"
                size="md"
                placeholder="hello@gmail.com"
                value={form.values.email}
                onChange={event => form.setFieldValue("email", event.currentTarget.value)}
                error={form.errors.email && "Invalid email"}
                leftSection={<MailOutlineIcon />}
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                size="md"
                value={form.values.password}
                onChange={event => form.setFieldValue("password", event.currentTarget.value)}
                error={form.errors.password && "Password should include at least 6 characters"}
                leftSection={<LockOpenIcon />}
              />

              {type === "Sign up" && (
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={event => form.setFieldValue("terms", event.currentTarget.checked)}
                />
              )}
            </Stack>

            {type == "Login" && (
              <Group justify="space-between" mt="lg">
                <Checkbox
                  label="Keep me logged in"
                  checked={form.values.keepLoggedIn}
                  onChange={event => form.setFieldValue("keepLoggedIn", event.currentTarget.checked)}
                />
                <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor>
              </Group>
            )}

            <Stack mt="xl" align="flex-start">
              {/* <Anchor fs={"xl"} component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                {type === "Sign up" ? "Already have an account? Login" : "Don't have an account? Register"}
              </Anchor> */}
              <Button loading={createUserLoading} fullWidth type="submit" radius="sm">
                {upperFirst(type)}
              </Button>
            </Stack>
          </form>

          <Divider label="Or continue with email" labelPosition="center" my="lg" />
          <Group grow mb={"md"} mt="md">
            <GoogleButton radius={"xl"}> Continue with Google</GoogleButton>
            <FacebookButton radius={"xl"}>Continue with Facebook</FacebookButton>
          </Group>
        </Paper>
      </div>
    </div>
  );
};

export default AuthForm;
