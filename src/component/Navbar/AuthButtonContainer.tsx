"use client";
import { selectAuthenticated } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";
import { Button, Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import HeaderAuthUserInfo from "./HeaderAuthUser/HeaderAuthUserInfo";
import { useTranslations } from "next-intl";

const AuthButtonContainer = () => {
  const router = useRouter();
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);
  const t = useTranslations();
  return !isAuthenticatedUser ? (
    <Button variant="filled" onClick={() => router.push("/login")}>
      {t("Header.login")}
    </Button>
  ) : (
    <HeaderAuthUserInfo />
  );
};

export default AuthButtonContainer;
