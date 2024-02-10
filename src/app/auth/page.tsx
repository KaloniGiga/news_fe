import UserLoginForm from "@/component/Account/UserAuthenticationForm";
import React from "react";

const AuthPage = () => {
  return (
    <div className="w-full min-h-screen text-[var(--mantine-color-text)]">
      <UserLoginForm />
    </div>
  );
};

export default AuthPage;
