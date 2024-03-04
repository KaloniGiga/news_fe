"use client";
import { useGetMostUpvotedPostsQuery, useLazyGetMostUpvotedPostsQuery } from "@/redux/post/post.api";
import { Center, Grid, Text } from "@mantine/core";
import { CircularProgress } from "@mui/material";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import FeedPostWrapper from "../MainSide/FeedPost/FeedPostWrapper";
import { GetPostData } from "@/redux/post/type";
import FeedPostList from "../MainSide/FeedPost/FeedPostLIst";

const UpvoteContainer: FunctionComponent = (): ReactElement => {
  const [data, setData] = useState<GetPostData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const [getMostUpvotedPosts, { isFetching }] = useLazyGetMostUpvotedPostsQuery();

  useEffect(() => {
    getMostUpvotedPosts(page)
      .unwrap()
      .then(result => {
        if (result && result.data.length < 5) {
          setHasMoreData(false);
        }

        if (result && result.data.length != 0) {
          setData([...result.data]);
        }
      });
  }, []);

  const loadMoreData = async (params: any) => {
    if (!isFetching) {
      setPage(prev => prev + 1);
      return getMostUpvotedPosts(page + 1)
        .unwrap()
        .then(result => {
          if (result.data.length < 5) {
            setHasMoreData(false);
          }

          if (result.data.length != 0) {
            setData(prev => [...prev, ...result.data]);
          }
        });
    }
  };

  return (
    data && (
      <FeedPostList loadMoreData={loadMoreData} hasMoreData={hasMoreData} feedPostData={data} />
      // <Grid p={"md"} pl={"5%"} gutter={"md"}>
      //   {data.map((item: any, index: number) => {
      //     return (
      //       <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
      //         <FeedPostWrapper feedData={item} />
      //       </Grid.Col>
      //     );
      //   })}
      // </Grid>
    )
  );
};

export default UpvoteContainer;
