"use client";

import { useGetAuthUserShareLinkQuery, useGetPostQuery, useGetShareLinkQuery } from "@/redux/post/post.api";
import { CircularProgress } from "@mui/material";
import { Center, Grid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/auth/auth.selector";
import FeedPostWrapper from "../MainSide/FeedPost/FeedPostWrapper";

const FeedContainer = () => {
  const [shareLinkSkip, setShareLinkSkip] = useState(true);
  const [authShareLinkSkip, setAuthShareLinkSkip] = useState(true);
  const [data, setData] = useState<any>(null);

  const user = useAppSelector(selectUser);
  const { data: shareLinkData, isLoading: shareLinkIsLoading } = useGetShareLinkQuery(undefined, {
    skip: shareLinkSkip,
    refetchOnMountOrArgChange: true,
  });
  const { data: authShareLinkData, isLoading: authShareLinkIsLoading } = useGetAuthUserShareLinkQuery(undefined, {
    skip: authShareLinkSkip,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (user) {
      setAuthShareLinkSkip(false);
      setShareLinkSkip(true);
    } else {
      setAuthShareLinkSkip(true);
      setShareLinkSkip(false);
    }
  }, [user]);

  useEffect(() => {
    if (shareLinkData) {
      setData(shareLinkData.data);
    }

    if (authShareLinkData) {
      setData(authShareLinkData.data);
    }
  }, [shareLinkData, authShareLinkData]);

  const newsData = [
    {
      title: "State of Gaming Industry",
      description:
        "A vector is a quantity or phenomenon that has two independent properties: magnitude and direction. The term also denotes the mathematical or geometrical representation of such a quantity. Examples of vectors in nature are velocity, momentum, force, electromagnetic fields and weight.",
      tags: ["#gamedev", "#webdev", "#beginners", "#homeworld"],
      coverImage: "/profileuser.jpg",
      upvote: 200,
      comments: 12,
      links: "",
    },
    {
      title: "How to do Open Source Contribution?",
      description:
        "A vector is a quantity or phenomenon that has two independent properties: magnitude and direction. The term also denotes the mathematical or geometrical representation of such a quantity. Examples of vectors in nature are velocity, momentum, force, electromagnetic fields and weight.",
      tags: ["#opensource", "#software development", "#engineering"],
      coverImage: "/profileuser1.jpg",
      upvote: 120,
      comments: 20,
      links: "",
    },
    {
      title: "What is a Vector Database?",
      description:
        "A vector is a quantity or phenomenon that has two independent properties: magnitude and direction. The term also denotes the mathematical or geometrical representation of such a quantity. Examples of vectors in nature are velocity, momentum, force, electromagnetic fields and weight.",
      tags: ["#ai", "#opensource", "#database", "#tutorial"],
      coverImage: "/loginnews1.jpg",
      upvote: 12,
      comments: 50,
      links: "",
    },
    {
      title: "JWT vs Session Authentication",
      description:
        "A vector is a quantity or phenomenon that has two independent properties: magnitude and direction. The term also denotes the mathematical or geometrical representation of such a quantity. Examples of vectors in nature are velocity, momentum, force, electromagnetic fields and weight.",
      tags: ["#jwt", "#authjs", "#javascript", "#security"],
      coverImage: "/loginnewspaper.jpg",
      upvote: 198,
      comments: 4,
      links: "",
    },
  ];

  return authShareLinkIsLoading || shareLinkIsLoading ? (
    <Center className="text-mantineText">
      <CircularProgress />
    </Center>
  ) : data && data.length > 0 ? (
    <Grid p={"md"} pl={"5%"} gutter={"md"}>
      {data.map((item: any, index: number) => {
        return (
          <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
            <FeedPostWrapper feedData={item} />
          </Grid.Col>
        );
      })}
    </Grid>
  ) : (
    <Center className="text-mantineText">
      <Text>No Data Found</Text>
    </Center>
  );
};

export default FeedContainer;
