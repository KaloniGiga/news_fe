"use client";

import React, { FunctionComponent, useEffect, useState } from "react";
import { useLazyGetMostCommentedPostsQuery } from "@/redux/post/post.api";
import { GetPostData } from "@/redux/post/type";
import FeedPostList from "../MainSide/FeedPost/FeedPostLIst";
import ShareLinkSkeletonContainer from "../Skeleton/ShareLinkSkeleton/ShareLinkSkeletonContainer";
const DiscussedContainer: FunctionComponent = () => {
  const [data, setData] = useState<GetPostData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const [getMostCommentedPost, { isFetching, isLoading, isSuccess }] = useLazyGetMostCommentedPostsQuery();

  useEffect(() => {
    getMostCommentedPost(page)
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
      return getMostCommentedPost(page + 1)
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

  if (isLoading) {
    return <ShareLinkSkeletonContainer />;
  }

  if (isSuccess) {
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
  }
};

export default DiscussedContainer;
