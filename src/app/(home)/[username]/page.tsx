import UserInfoLayout from "@/component/AppShell/UserInfoLayout";
import ProfileComponent from "@/component/Profile/ProfileComponent";
import { NextPage } from "next";
import React, { ReactElement } from "react";

const page: NextPage = (): ReactElement => {
  return (
    <UserInfoLayout>
      <ProfileComponent />
    </UserInfoLayout>
  );
};

export default page;
