"use client";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import Header from "../Navbar/Header";
import { useSearchPostQuery } from "@/redux/post/post.api";
import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import NewsContainer from "../MainSide/NewsCard/NewsContainer";

const SearchComponent: FunctionComponent = (): ReactElement => {
  const [data, setData] = useState<any>("");
  const search = useSearchParams();
  const searchVal = search.getAll("q");
  const { data: searchData, isLoading } = useSearchPostQuery(searchVal ? searchVal : []);
  useEffect(() => {
    if (searchData) {
      setData(searchData.data);
    }
  }, [searchData]);
  return (
    <div className="w-full text-mantineText flex flex-col items-center justify-center">
      <Header />
      <div className="w-[80%] flex justify-between items-center">
        <h1 className="lg:text-[30px] text-[20px] font-[700]">Searched results:</h1>
        <div className="flex gap-5 lg:text-[16px] text-[13px] font-[500]">
          <h5>Most Relevant</h5>
          <h5>Newest</h5>
          <h5>Oldest</h5>
        </div>
      </div>
      <Box component="div" className="w-full h-full text-mantineText">
        <NewsContainer news={data} />
      </Box>
    </div>
  );
};

export default SearchComponent;
