import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import NewsContainer from "../MainSide/NewsContainer";
import { useSearchPostQuery } from "@/redux/post/post.api";
import { Card } from "@mantine/core";
import NewsCard from "../MainSide/NewsCard";

interface IRecommendedPosts {
  tags: string[] | any;
  id: number;
}
const RecommendedPosts: FunctionComponent<IRecommendedPosts> = ({ tags, id }): ReactElement => {
  console.log(tags);
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
            return <NewsCard key={index} editData={item} />;
          })}
        </>
      )}
    </div>
  );
};

export default RecommendedPosts;
