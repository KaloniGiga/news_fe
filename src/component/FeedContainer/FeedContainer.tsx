"use client";
import {
  useGetAuthUserShareLinkQuery,
  useGetPostQuery,
  useGetShareLinkQuery,
  useLazyGetAuthUserShareLinkQuery,
  useLazyGetShareLinkQuery,
} from "@/redux/post/post.api";
import { CircularProgress } from "@mui/material";
import { Center, Grid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthenticated, selectUser } from "@/redux/auth/auth.selector";
import FeedPostWrapper from "../MainSide/FeedPost/FeedPostWrapper";
import FeedPostWrapperWithVirtualScroll from "../MainSide/FeedPost/FeedPostLIst";
import { GetPostData } from "@/redux/post/type";
import "react-virtualized/styles.css";
import FeedPostList from "../MainSide/FeedPost/FeedPostLIst";

const FeedContainer = () => {
  const [data, setData] = useState<GetPostData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const isAuthenticated = useAppSelector(selectAuthenticated);

  const [getShareLink, { isFetching: shareLinkFetching }] = useLazyGetShareLinkQuery();
  const [getAuthShareLink, { isFetching: authShareLinkFetching }] = useLazyGetAuthUserShareLinkQuery();

  // load data after component mount
  useEffect(() => {
    if (isAuthenticated) {
      getAuthShareLink(page)
        .unwrap()
        .then(result => {
          if (result.data.length < 5) {
            setHasMoreData(false);
          }
          if (result.data.length != 0) {
            setData(prev => [...prev, ...result.data]);
          }
        });
    } else {
      getShareLink(page)
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
  }, [isAuthenticated]);

  // load more data function
  const loadMoreData = async (params: any) => {
    if (!shareLinkFetching && !authShareLinkFetching && hasMoreData) {
      if (isAuthenticated) {
        setPage(prev => prev + 1);
        return getAuthShareLink(page + 1)
          .unwrap()
          .then(result => {
            if (result.data.length < 5) {
              setHasMoreData(false);
            }
            if (result.data.length != 0) {
              setData(prev => [...prev, ...result.data]);
            }
          });
      } else {
        setPage(prev => prev + 1);
        return getShareLink(page + 1)
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

export default FeedContainer;
