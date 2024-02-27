"use client";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import Header from "../Navbar/Header";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/auth/auth.selector";
import { useGetBookmarkPostsQuery } from "@/redux/bookmark/bookmark.api";
import { Box, Center, Grid, Text } from "@mantine/core";
import { CircularProgress } from "@mui/material";
import FeedPostWrapper from "../MainSide/FeedPost/FeedPostWrapper";

const BookmarkComponent: FunctionComponent = (): ReactElement => {
  const user = useAppSelector(selectUser);
  const [data, setData] = useState<any>();

  const { data: bookmarkedPosts, isLoading } = useGetBookmarkPostsQuery(user?.id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (bookmarkedPosts?.data) {
      console.log(bookmarkedPosts.data);
      setData(bookmarkedPosts.data);
    }
  }, [bookmarkedPosts]);

  return (
    <div className="w-full text-mantineText  flex flex-col items-center justify-center">
      <Header />

      <div className="mt-10 text-[30px] font-[700] w-[90%]">
        <h1>Your Bookmarks</h1>
      </div>
      <Box component="div" className="w-full h-full text-mantineText">
        {isLoading ? (
          <Center className="text-mantineText">
            <CircularProgress />
          </Center>
        ) : data && data.length > 0 ? (
          <Grid p={"md"} pl={"5%"} gutter={"md"}>
            {data.map((item: any, index: number) => {
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
};

export default BookmarkComponent;
