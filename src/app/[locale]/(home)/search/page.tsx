import SearchComponent from "@/component/Search/SearchComponent";
import { NextPage } from "next";
import React, { ReactElement } from "react";
import { unstable_setRequestLocale } from "next-intl/server";
const Page = ({ params }: { params: { locale: string } }): ReactElement => {
  unstable_setRequestLocale(params.locale);
  return (
    <div>
      <SearchComponent />
    </div>
  );
};

export default Page;
