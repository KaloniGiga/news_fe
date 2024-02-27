import React, { FunctionComponent, ReactElement } from "react";
import { Box, Center, Grid, Text } from "@mantine/core";
import { CircularProgress } from "@mui/material";
import FeedPostWrapper from "../MainSide/FeedPost/FeedPostWrapper";
import { useGetPostByUserQuery } from "@/redux/post/post.api";
interface IProfile {
  id: number;
}
const UserProfilePosts: FunctionComponent<IProfile> = ({ id }): ReactElement => {
  const { data, isLoading } = useGetPostByUserQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  console.log(data);
  return (
    <div>
      <Box component="div" className="w-[80%] mx-auto h-full text-mantineText">
        {isLoading ? (
          <Center className="text-mantineText">
            <CircularProgress />
          </Center>
        ) : data?.data && data.data.length > 0 ? (
          <Grid p={"md"} gutter={"md"}>
            {data.data.map((item: any, index: number) => {
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
        )}
      </Box>
    </div>
  );
};

export default UserProfilePosts;
