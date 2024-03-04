import { GetPostData } from "@/redux/post/type";
import { Text } from "@mantine/core";
import React, { FunctionComponent, useRef } from "react";
import { AutoSizer, InfiniteLoader, List, WindowScroller } from "react-virtualized";
import NewsCard from "./NewsCard";

interface INewsCardList {
  newsPostData: GetPostData[];
  hasMoreData: boolean;
  loadMoreData: (param: any) => Promise<any>;
}

const ITEM_WIDTH = 800;
const ITEM_HEIGHT = 300;

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

const RowItem = React.memo(function RowItem({ newsPost }: { newsPost: GetPostData }) {
  return <NewsCard style={{ width: ITEM_WIDTH, margin: "10px" }} editData={newsPost} />;
});

const NewsCardList: FunctionComponent<INewsCardList> = ({ newsPostData, hasMoreData, loadMoreData }) => {
  const infiniteLoaderRef = useRef<InfiniteLoader>(null);

  const noRowsRendered = () => (
    <div className="w-full h-full flex justify-center text-mantineText">
      <Text>No post found.</Text>
    </div>
  );

  return (
    <WindowScroller>
      {({ height, isScrolling, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => {
            const rowCount = getRowsAmount(width, newsPostData.length, hasMoreData);
            const rowRenderer = ({ index, style }: any) => {
              const maxItemsPerRow = getMaxItemsAmountPerRow(width);
              const newsPostIds = generateIndexesForRow(index, maxItemsPerRow, newsPostData.length).map(
                newPostIndex => newsPostData[newPostIndex]
              );

              return (
                <div style={style} className="pl-20">
                  {newsPostIds.map((newsPost, index) => (
                    <RowItem key={index} newsPost={newsPost} />
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
                  const allItemLoaded = generateIndexesForRow(index, maxItemsPerRow, newsPostData.length).length > 0;
                  return !hasMoreData || allItemLoaded;
                }}
                loadMoreRows={loadMoreData}
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

export default NewsCardList;
