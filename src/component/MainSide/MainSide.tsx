"use client";
import Image from "next/image";
import MainTabs from "./MainTabs";
import { Avatar, CircularProgress } from "@mui/material";
import MainDescription from "./MainDescription";
import NewsContainer from "./NewsContainer";
import { useGetPostQuery } from "@/redux/post/post.api";

const MainSide = () => {
  const { data, isLoading } = useGetPostQuery();
  const newsData = [
    {
      title: "Don't be left out.Sign up to waitlist for daily.dev Search (Beta).It's fire.",
      image: "/dailv.webp",
    },
    {
      title: "Don't be left out.Sign up to waitlist for daily.dev Search (Beta).It's fire.",
      image: "/dailv.webp",
    },
    {
      title: "Don't be left out.Sign up to waitlist for daily.dev Search (Beta).It's fire.",
      image: "/dailv.webp",
    },
    {
      title: "Don't be left out.Sign up to waitlist for daily.dev Search (Beta).It's fire.",
      image: "/dailv.webp",
    },
    {
      title: "Don't be left out.Sign up to waitlist for daily.dev Search (Beta).It's fire.",
      image: "/dailv.webp",
    },
    {
      title: "Don't be left out.Sign up to waitlist for daily.dev Search (Beta).It's fire.",
      image: "/dailv.webp",
    },
  ];

  return isLoading ? (
    <div className="w-full h-screen justify-center items-center">
      <CircularProgress />
    </div>
  ) : data && data.data ? (
    <div className="w-full flex flex-col">
      <MainTabs />
      <MainDescription />
      <NewsContainer news={data.data} />
    </div>
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <p className="font-semibold">No Data Found</p>
    </div>
  );
};

export default MainSide;
