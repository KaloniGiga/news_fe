import React from "react";
import FillUserInfo from "../../../component/UserProfile/FillUserInfo";

const UserInfoPage = () => {
  return (
    <div className="w-full flex justify-center items-center text-[var(--mantine-color-text)] bg-[var(--mantine-color-body)]">
      <FillUserInfo />
    </div>
  );
};

export default UserInfoPage;
