import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import NewsContainer from "../MainSide/NewsContainer";
import { useSearchPostQuery } from "@/redux/post/post.api";
import { Card, Grid } from "@mantine/core";
import NewsCard from "../MainSide/NewsCard";
import FeedPostWrapper from "../MainSide/FeedPost/FeedPostWrapper";

interface IRecommendedPosts {
  tags: string[] | any;
  id: number;
}
const RecommendedPosts: FunctionComponent<IRecommendedPosts> = ({ tags, id }): ReactElement => {
  const { data: searchData, isLoading } = useSearchPostQuery(tags);
  const [data, setData] = useState<any[]>();
  useEffect(() => {
    if (searchData) {
      setData(searchData.data.filter(item => item.id !== id));
    }
  }, [searchData]);
  return (
    <div className="flex flex-wrap gap-5">
      {data && data.length > 0 && (
        <>
          {data.slice(0, 2).map((item: any, index: number) => {
            // return <NewsCard key={index} editData={item} />;
            return (
              // <Grid.Col key={index} span={{ base: 12, md: 6, lg: 4 }}>
              <FeedPostWrapper key={index} feedData={item} />
              // </Grid.Col>
            );
          })}
        </>
      )}
    </div>
  );
};

export default RecommendedPosts;
