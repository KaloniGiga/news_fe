import { FunctionComponent } from "react";
import NewsCard from "./NewsCard";
import { GetPostData } from "@/redux/post/type";
import { Box, Flex, Text } from "@mantine/core";

interface INewsContainer {
  news: GetPostData[];
}
const NewsContainer: FunctionComponent<INewsContainer> = ({ news }) => {
  return (
    <Flex w={"70%"} py={"xl"} mx={"auto"} rowGap={"xl"} direction={"column"}>
      {news && news.length > 0 ? (
        <>
          {news.map((item, index: number) => {
            return <NewsCard key={index} editData={item} />;
          })}
        </>
      ) : (
        <Box>
          <Text>No news found.</Text>
        </Box>
      )}
    </Flex>
  );
};

export default NewsContainer;
