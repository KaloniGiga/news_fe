"use client";
import { useGetUserCreatePostQuery } from "@/redux/post/post.api";
import { Box, Center, Text } from "@mantine/core";
import { CircularProgress } from "@mui/material";
import NewsContainer from "../MainSide/NewsContainer";

const UserPost = () => {
  const { data: postData, isLoading: postIsLoading } = useGetUserCreatePostQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return postIsLoading ? (
    <Center className="text-mantineText">
      <CircularProgress />
    </Center>
  ) : postData && postData.data.length > 0 ? (
    <Box component="div" className="w-full h-full text-mantineText">
      <NewsContainer news={postData.data} />
    </Box>
  ) : (
    <Center className="text-mantineText">
      <Text>No Data Found</Text>
    </Center>
  );
};

export default UserPost;
