"use client";

import { Center, Grid, Text } from "@mantine/core";
import { CircularProgress } from "@mui/material";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import FeedPostWrapper from "../MainSide/FeedPost/FeedPostWrapper";
import { useGetMostCommentedPostsQuery } from "@/redux/post/post.api";
const DiscussedContainer: FunctionComponent = (): ReactElement => {
  const [data, setData] = useState<any>(null);
  const { data: commentedPostData, isLoading } = useGetMostCommentedPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (commentedPostData?.data) {
      setData(commentedPostData.data);
    }
  }, [commentedPostData]);

  return isLoading ? (
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

export default DiscussedContainer;
