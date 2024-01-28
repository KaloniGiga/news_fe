"use client";
import { selectAuthenticated } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@mantine/core";
import MuiAvatar from "../Avatar/MuiAvatar";
import { useRouter } from "next/navigation";

const AuthButtonContainer = () => {
  const router = useRouter();
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);
  return !isAuthenticatedUser ? (
    <Button onClick={() => router.push("/login")}>Log in</Button>
  ) : (
    <MuiAvatar src="/profileuser.jpg" />
  );
};

export default AuthButtonContainer;
