import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useSearchPostQuery } from "@/redux/post/post.api";
import { Card, Grid, Text } from "@mantine/core";
import FeedPostWrapper from "../MainSide/FeedPost/FeedPostWrapper";
import ShareLinkSkeletonContainer from "../Skeleton/ShareLinkSkeleton/ShareLinkSkeletonContainer";
import FeedPost from "../MainSide/FeedPost/FeedPost";

interface IRecommendedPosts {
  tags: string[] | any;
  id: number;
}
const RecommendedPosts: FunctionComponent<IRecommendedPosts> = ({ tags, id }) => {
  const { data: searchData, isLoading, isSuccess, isError } = useSearchPostQuery(tags);
  const [data, setData] = useState<any[]>();
  useEffect(() => {
    if (searchData) {
      setData(searchData.data.filter(item => item.id !== id));
    }
  }, [searchData]);

  if (isLoading) {
    return <ShareLinkSkeletonContainer />;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  if (isSuccess && data) {
    return (
      <div className="w-full text-mantineText">
        {data.length > 0 && (
          <>
            <Text fw={700} size="xl" my={"md"}>
              More Post like this
            </Text>
            <div className="flex flex-wrap gap-5 mb-4">
              {data.slice(0, 2).map((item: any, index: number) => {
                return (
                  // <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
                  <div key={index} className="cursor-pointer">
                    <FeedPost feedData={item} />
                  </div>
                  // </Grid.Col>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
};

export default RecommendedPosts;
