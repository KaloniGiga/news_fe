import React from "react";
import FillUserInfo from "../../../component/UserProfile/FillUserInfo";
import DeleteProfile from "@/component/UserProfile/DeleteProfile";
import AccountSettingsContainer from "@/component/UserProfile/AccountSettingsContainer";
import AccountSettings from "@/component/UserProfile/AccountSettings";
import ChangeCategoryPreference from "@/component/UserProfile/ChangeCategoryPreference";

const UserInfoPage = () => {
  return (
    <div className="w-[70%] mx-auto flex flex-col justify-center items-center text-[var(--mantine-color-text)] bg-[var(--mantine-color-body)] mt-40 pb-8">
      <FillUserInfo />
      {/* <AccountSettingsContainer /> */}
      <AccountSettings />
      <ChangeCategoryPreference />
      <DeleteProfile />
    </div>
  );
};

export default UserInfoPage;
