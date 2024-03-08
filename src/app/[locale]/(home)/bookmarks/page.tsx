import BookmarkComponent from "@/component/BookmarkComponent/BookmarkComponent";
import { NextPage } from "next";
import React, { ReactElement } from "react";

const page: NextPage = (): ReactElement => {
  return (
    <div>
      <BookmarkComponent />
    </div>
  );
};

export default page;
