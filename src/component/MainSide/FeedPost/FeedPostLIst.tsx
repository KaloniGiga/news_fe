import { GetPostData } from "@/redux/post/type";
import React, { FunctionComponent, useRef, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import FeedPost from "./FeedPost";
import { Grid, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { InfiniteLoader, List, WindowScroller } from "react-virtualized";

export interface IFeedPostList {
  feedPostData: GetPostData[];
  hasMoreData: boolean;
  loadMoreData: (param: any) => Promise<any>;
}

const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 440;

const generateIndexesForRow = (rowIndex: number, maxItemsPerRow: number, itemsAmount: number) => {
  const result = [];
  const startIndex = rowIndex * maxItemsPerRow;

  for (let i = startIndex; i < Math.min(startIndex + maxItemsPerRow, itemsAmount); i++) {
    result.push(i);
  }

  return result;
};

const getMaxItemsAmountPerRow = (width: number) => {
  return Math.max(Math.floor(width / ITEM_WIDTH), 1);
};

const getRowsAmount = (width: number, itemsAmount: number, hasMore: boolean) => {
  const maxItemsPerRow = getMaxItemsAmountPerRow(width);
  return Math.ceil(itemsAmount / maxItemsPerRow) + (hasMore ? 1 : 0);
};

const RowItem = React.memo(function RowItem({ feedPost }: { feedPost: GetPostData }) {
  return <FeedPost style={{ width: ITEM_WIDTH, margin: "10px" }} feedData={feedPost} />;
});

const FeedPostList: FunctionComponent<IFeedPostList> = ({ feedPostData, hasMoreData, loadMoreData }) => {
  // const [data, setData] = useState(() => Array.from({ length: 20 }, () => Array.from({ length: 3 }, feedPostData)));
  const theme = useMantineTheme();
  const infiniteLoaderRef = useRef<InfiniteLoader>(null);

  // const loadMoreItems = async (params: any) => {
  //   console.log("load more items", params);
  //   return await [];
  // };

  const noRowsRendered = () => (
    <div className="w-full h-full flex justify-center text-mantineText">
      <Text>Not post found.</Text>
    </div>
  );

  return (
    <WindowScroller>
      {({ height, isScrolling, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => {
            const rowCount = getRowsAmount(width, feedPostData.length, hasMoreData);
            const rowRenderer = ({ index, style }: any) => {
              const maxItemsPerRow = getMaxItemsAmountPerRow(width);
              const postIds = generateIndexesForRow(index, maxItemsPerRow, feedPostData.length).map(
                postIndex => feedPostData[postIndex]
              );

              return (
                <div style={style} className="flex justify-center">
                  {postIds.map((feedPost, index) => (
                    <RowItem key={index} feedPost={feedPost} />
                  ))}
                </div>
              );
            };
            return (
              <InfiniteLoader
                ref={infiniteLoaderRef}
                rowCount={rowCount}
                isRowLoaded={({ index }) => {
                  const maxItemsPerRow = getMaxItemsAmountPerRow(width);
                  const allItemLoaded = generateIndexesForRow(index, maxItemsPerRow, feedPostData.length).length > 0;
                  return !hasMoreData || allItemLoaded;
                }}
                loadMoreRows={loadMoreData}
                // threshold={10}
              >
                {({ onRowsRendered, registerChild }) => (
                  <section>
                    <List
                      autoHeight
                      height={height}
                      width={width}
                      isScrolling={isScrolling}
                      scrollTop={scrollTop}
                      rowCount={rowCount}
                      rowHeight={ITEM_HEIGHT}
                      ref={registerChild}
                      onRowsRendered={onRowsRendered}
                      rowRenderer={rowRenderer}
                      noRowsRenderer={noRowsRendered}
                    />
                  </section>
                )}
              </InfiniteLoader>
            );
          }}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};

export default FeedPostList;
