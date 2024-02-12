"use client";
import { Center, Grid, Text } from "@mantine/core";
import { CircularProgress } from "@mui/material";
import FeedPost from "../MainSide/FeedPost/FeedPost";
import { useGetUserShareLinkQuery } from "@/redux/post/post.api";

const UserShareLink = () => {
  const { data: shareLinkData, isLoading: shareLinkIsLoading } = useGetUserShareLinkQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  return shareLinkIsLoading ? (
    <Center className="text-mantineText">
      <CircularProgress />
    </Center>
  ) : shareLinkData && shareLinkData.data && shareLinkData.data.length > 0 ? (
    <Grid p={"md"} pl={"5%"} gutter={"md"}>
      {shareLinkData.data.map((item: any, index: number) => {
        return (
          <Grid.Col key={index} span={{ base: 12, md: 6, lg: 6 }}>
            <FeedPost feedData={item} />
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

export default UserShareLink;
