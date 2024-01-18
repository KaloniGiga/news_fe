"use client";
import Image from "next/image";
import MainTabs from "./MainTabs";
import { Avatar } from "@mui/material";
import MainDescription from "./MainDescription";
import NewsContainer from "./NewsContainer";

const MainSide = () => {
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

  return (
    <div className="w-full flex flex-col">
      <MainTabs />
      <MainDescription />
      <NewsContainer news={newsData} />
    </div>
  );
};

export default MainSide;
