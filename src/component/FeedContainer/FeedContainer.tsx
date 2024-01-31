"use client";

import { useGetPostQuery } from "@/redux/post/post.api";
import { CircularProgress } from "@mui/material";
import FeedPost from "../MainSide/FeedPost/FeedPost";
import { Box, Grid, Text } from "@mantine/core";

const FeedContainer = () => {
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

  return isLoading ? (
    <Box>
      <CircularProgress />
    </Box>
  ) : data && data.data ? (
    <Grid p={"md"} gutter={"md"}>
      {data.data.map((item, index: number) => {
        return (
          <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
            <FeedPost feedData={item} />
          </Grid.Col>
        );
      })}
    </Grid>
  ) : (
    <Box>
      <Text>No Data Found</Text>
    </Box>
  );
};

export default FeedContainer;
