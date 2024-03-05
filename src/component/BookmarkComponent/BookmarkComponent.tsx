"use client";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import Header from "../Navbar/Header";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/auth/auth.selector";
import { useGetBookmarkPostsQuery, useLazyGetBookmarkPostsQuery } from "@/redux/bookmark/bookmark.api";
import { Box, Center, Grid, Text } from "@mantine/core";
import { CircularProgress } from "@mui/material";
import FeedPostWrapper from "../MainSide/FeedPost/FeedPostWrapper";
import { useGetUserQuery } from "@/redux/auth/auth.api";
import ShareLinkSkeletonContainer from "../Skeleton/ShareLinkSkeleton/ShareLinkSkeletonContainer";

const BookmarkComponent: FunctionComponent = () => {
  const { data: user, isSuccess: isUserSuccess, isError: errorUser } = useGetUserQuery();
  const [getBookmarkPosts, { isLoading, isSuccess: isPostSuccess, data: bookmarkedPosts }] =
    useLazyGetBookmarkPostsQuery();

  useEffect(() => {
    if (isUserSuccess && user && user.data) {
      getBookmarkPosts(user.data.id);
    }
  }, [user]);

  if (isLoading) {
    return <ShareLinkSkeletonContainer />;
  }

  if (errorUser) {
    return <div>404 Not Found.</div>;
  }

  if (isPostSuccess && bookmarkedPosts) {
    return (
      <div className="w-full text-mantineText  flex flex-col items-center justify-center">
        <div className="mt-10 text-[30px] font-[700] w-[90%]">
          <h1>Your Bookmarks</h1>
        </div>
        <Box component="div" className="w-full h-full text-mantineText">
          {bookmarkedPosts.data.length > 0 ? (
            <Grid p={"md"} pl={"5%"} gutter={"md"}>
              {bookmarkedPosts.data.map((item: any, index: number) => {
                return (
                  <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
                    <FeedPostWrapper feedData={item.post} />
                  </Grid.Col>
                );
              })}
            </Grid>
          ) : (
            <Center className="text-mantineText">
              <Text>No Data Found</Text>
            </Center>
          )}
        </Box>
      </div>
    );
  }
};

export default BookmarkComponent;
