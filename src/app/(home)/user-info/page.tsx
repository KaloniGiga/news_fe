import React from "react";
import FillUserInfo from "../../../component/FillUserInfo/FillUserInfo";

const UserInfoPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center text-[var(--mantine-color-text)] bg-[var(--mantine-color-body)]">
      <FillUserInfo />
    </div>
  );
};

export default UserInfoPage;
