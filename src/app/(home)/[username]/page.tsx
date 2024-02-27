import ProfileComponent from "@/component/Profile/ProfileComponent";
import { NextPage } from "next";
import React, { ReactElement } from "react";

const page: NextPage = (): ReactElement => {
  return (
    <div>
      <ProfileComponent />
    </div>
  );
};

export default page;
