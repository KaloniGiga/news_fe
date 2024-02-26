"use client";
import Image from "next/image";
import MainTabs from "./MainTabs";
import { Avatar, CircularProgress } from "@mui/material";
import MainDescription from "./MainDescription";
import NewsContainer from "./NewsContainer";
import {
  useGetAuthUserCreatePostQuery,
  useGetCreatePostQuery,
  useGetPostQuery,
  useSearchCategoryQuery,
} from "@/redux/post/post.api";
import { Box, Center, Text } from "@mantine/core";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/auth/auth.selector";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const MainSide = () => {
  const [createPostSkip, setCreatePostSkip] = useState(true);
  const [authCreatePostSkip, setAuthCreatePostSkip] = useState(true);
  const [data, setData] = useState<any>(null);
  const search = useSearchParams();
  const searchVal = search.get("category");
  const user = useAppSelector(selectUser);
  const { data: postData, isLoading: postIsLoading } = useGetCreatePostQuery(undefined, {
    skip: createPostSkip,
    refetchOnMountOrArgChange: true,
  });
  const { data: authPostData, isLoading: authPostIsLoading } = useGetAuthUserCreatePostQuery(undefined, {
    skip: authCreatePostSkip,
    refetchOnMountOrArgChange: true,
  });

  const { data: catPostData, isLoading: catPostLoading } = useSearchCategoryQuery(searchVal ? searchVal : "");

  useEffect(() => {
    if (user) {
      setAuthCreatePostSkip(false);
      setCreatePostSkip(true);
    } else {
      setAuthCreatePostSkip(true);
      setCreatePostSkip(false);
    }
  }, [user]);

  useEffect(() => {
    if (!searchVal) {
      if (postData) {
        setData(postData.data);
      }

      if (authPostData) {
        setData(authPostData.data);
      }
    } else {
      console.log(catPostData);
      setData(catPostData?.data);
    }
  }, [postData, authPostData, searchVal, catPostData]);

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

  return postIsLoading || authPostIsLoading || catPostLoading ? (
    <Center className="text-mantineText">
      <CircularProgress />
    </Center>
  ) : data && data.length > 0 ? (
    <Box component="div" className="w-full h-full text-mantineText">
      <NewsContainer news={data} />
    </Box>
  ) : (
    <Center className="text-mantineText">
      <Text>No Data Found</Text>
    </Center>
  );
};

export default MainSide;
