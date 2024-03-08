import UserLoginForm from "@/component/Account/UserAuthenticationForm";
import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";

const AuthPage = ({ params }: { params: { locale: string } }) => {
  unstable_setRequestLocale(params.locale);
  return (
    <div className="w-full min-h-screen text-[var(--mantine-color-text)]">
      <UserLoginForm />
    </div>
  );
};

export default AuthPage;
