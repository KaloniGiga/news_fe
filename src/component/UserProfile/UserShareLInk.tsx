"use client";
import { Center, Grid, Text } from "@mantine/core";
import { CircularProgress } from "@mui/material";
import FeedPost from "../MainSide/FeedPost/FeedPost";
import { useGetUserShareLinkQuery, useLazyGetUserShareLinkQuery } from "@/redux/post/post.api";
import { useEffect, useState } from "react";
import { GetPostData } from "@/redux/post/type";
import FeedPostList from "../MainSide/FeedPost/FeedPostLIst";
import ShareLinkSkeletonContainer from "../Skeleton/ShareLinkSkeleton/ShareLinkSkeletonContainer";

const UserShareLink = () => {
  const [data, setData] = useState<GetPostData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const [getUserShareLink, { isFetching, isLoading, isSuccess }] = useLazyGetUserShareLinkQuery();
  useEffect(() => {
    getUserShareLink(page)
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
      return getUserShareLink(page + 1)
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
    return data && <FeedPostList loadMoreData={loadMoreData} hasMoreData={hasMoreData} feedPostData={data} />;
  }
};

export default UserShareLink;
