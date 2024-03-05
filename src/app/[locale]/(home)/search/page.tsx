import SearchComponent from "@/component/Search/SearchComponent";
import { NextPage } from "next";
import React, { ReactElement } from "react";

const page: NextPage = (): ReactElement => {
  return (
    <div>
      <SearchComponent />
    </div>
  );
};

export default page;
