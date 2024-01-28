"use client";
import { selectAuthenticated } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";
import { Button, Menu } from "@mantine/core";
import MuiAvatar from "../Avatar/MuiAvatar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HeaderAuthUserInfo from "./HeaderAuthUserInfo";

const AuthButtonContainer = () => {
  const router = useRouter();
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);
  const [opened, setOpened] = useState(false);
  return !isAuthenticatedUser ? <Button onClick={() => router.push("/login")}>Log in</Button> : <HeaderAuthUserInfo />;
};

export default AuthButtonContainer;
