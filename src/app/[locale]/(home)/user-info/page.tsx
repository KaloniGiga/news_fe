import React from "react";
import DeleteProfile from "@/component/UserProfile/DeleteProfile";
import AccountSettings from "@/component/UserProfile/AccountSettings";
import ChangeCategoryPreference from "@/component/UserProfile/ChangeCategoryPreference";
import FillUserInfo from "@/component/UserProfile/FillUserInfo";
import { unstable_setRequestLocale } from "next-intl/server";

const UserInfoPage = ({ params }: { params: { locale: string } }) => {
  unstable_setRequestLocale(params.locale);
  return (
    <div className="lg:w-[70%] w-[90%] mx-auto flex flex-col justify-center items-center text-[var(--mantine-color-text)] pt-44 lg:pt-40 pb-8">
      <FillUserInfo />
      {/* <AccountSettingsContainer /> */}
      <AccountSettings />
      <ChangeCategoryPreference />
      <DeleteProfile />
    </div>
  );
};

export default UserInfoPage;
