"use client";
import Image from "next/image";
import MainTabs from "./MainTabs";
import { Avatar, CircularProgress } from "@mui/material";
import MainDescription from "./MainDescription";
import NewsContainer from "./NewsContainer";
import { useGetPostQuery } from "@/redux/post/post.api";
import { Box, Center, Text } from "@mantine/core";

const MainSide = () => {
  const { data, isLoading } = useGetPostQuery(undefined, { refetchOnMountOrArgChange: true });
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
    <Center>
      <CircularProgress />
    </Center>
  ) : data && data.data ? (
    <Box component="div" className="w-full h-full text-mantineText">
      <NewsContainer news={data.data} />
    </Box>
  ) : (
    <Center>
      <Text>No Data Found</Text>
    </Center>
  );
};

export default MainSide;
