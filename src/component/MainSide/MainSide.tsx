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
      title: "State of Gaming Industry",
      description:
        "A vector is a quantity or phenomenon that has two independent properties: magnitude and direction. The term also denotes the mathematical or geometrical representation of such a quantity. Examples of vectors in nature are velocity, momentum, force, electromagnetic fields and weight.",
      tags: ["#gamedev", "#webdev", "#beginners", "#homeworld"],
      coverImage: "/profileuser.jpg",
      upvote: 200,
      comments: 12,
    },
    {
      title: "How to do Open Source Contribution?",
      description:
        "A vector is a quantity or phenomenon that has two independent properties: magnitude and direction. The term also denotes the mathematical or geometrical representation of such a quantity. Examples of vectors in nature are velocity, momentum, force, electromagnetic fields and weight.",
      tags: ["#opensource", "#software development", "#engineering"],
      coverImage: "/profileuser1.jpg",
      upvote: 120,
      comments: 20,
    },
    {
      title: "What is a Vector Database?",
      description:
        "A vector is a quantity or phenomenon that has two independent properties: magnitude and direction. The term also denotes the mathematical or geometrical representation of such a quantity. Examples of vectors in nature are velocity, momentum, force, electromagnetic fields and weight.",
      tags: ["#ai", "#opensource", "#database", "#tutorial"],
      coverImage: "/loginnews1.jpg",
      upvote: 12,
      comments: 50,
    },
    {
      title: "JWT vs Session Authentication",
      description:
        "A vector is a quantity or phenomenon that has two independent properties: magnitude and direction. The term also denotes the mathematical or geometrical representation of such a quantity. Examples of vectors in nature are velocity, momentum, force, electromagnetic fields and weight.",
      tags: ["#jwt", "#authjs", "#javascript", "#security"],
      coverImage: "/loginnewspaper.jpg",
      upvote: 198,
      comments: 4,
    },
  ];

  return isLoading ? (
    <div className="w-full h-screen flex justify-center items-center">
      <CircularProgress />
    </div>
  ) : data && data.data ? (
    <div className="w-full flex flex-col py-4">
      {/* <MainTabs /> */}
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
