import { GetPostData } from "@/redux/post/type";
import React, { FunctionComponent, useRef, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import FeedPost from "./FeedPost";
import { Grid, Text } from "@mantine/core";
import { InfiniteLoader, List } from "react-virtualized";

export interface IFoodPostWrapperWithVirtualScroll {
  feedPostData: GetPostData[];
  hasMore?: boolean;
}

const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 400;

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
  return <FeedPost style={{ width: ITEM_WIDTH, padding: "10px" }} feedData={feedPost} />;
});

const FoodPostWrapperWithVirtualScroll: FunctionComponent<IFoodPostWrapperWithVirtualScroll> = ({
  feedPostData,
  hasMore = false,
}) => {
  // const [data, setData] = useState(() => Array.from({ length: 20 }, () => Array.from({ length: 3 }, feedPostData)));

  const infiniteLoaderRef = useRef<InfiniteLoader>(null);

  const loadMoreItems = async (params: any) => {
    console.log("load more items");
    return await [];
  };

  const noRowsRendered = () => (
    <div>
      <Text>Not post found.</Text>
    </div>
  );

  return (
    <AutoSizer>
      {({ width, height }) => {
        const rowCount = getRowsAmount(width, feedPostData.length, hasMore);
        const rowRenderer = ({ index, style }: any) => {
          const maxItemsPerRow = getMaxItemsAmountPerRow(width);
          const postIds = generateIndexesForRow(index, maxItemsPerRow, feedPostData.length).map(
            postIndex => feedPostData[postIndex]
          );

          return (
            <div style={style} className="flex justify-start">
              {postIds.map(feedPost => (
                <RowItem key={feedPost.id} feedPost={feedPost} />
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
              return !hasMore || allItemLoaded;
            }}
            loadMoreRows={loadMoreItems}
          >
            {({ onRowsRendered, registerChild }) => (
              <section className="w-[95%] mx-auto">
                <List
                  height={height}
                  width={width}
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
  );
};

export default FoodPostWrapperWithVirtualScroll;
