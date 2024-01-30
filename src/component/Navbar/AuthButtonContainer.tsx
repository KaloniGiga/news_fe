"use client";
import { selectAuthenticated } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";
import { Button, Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import HeaderAuthUserInfo from "./HeaderAuthUser/HeaderAuthUserInfo";

const AuthButtonContainer = () => {
  const router = useRouter();
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);
  return !isAuthenticatedUser ? (
    <Group>
      <Button onClick={() => router.push("/login")}>Log in</Button>
      {/* <Button onClick={() => router.push('/auth')} variant="default">Register</Button> */}
    </Group>
  ) : (
    <HeaderAuthUserInfo />
  );
};

export default AuthButtonContainer;
