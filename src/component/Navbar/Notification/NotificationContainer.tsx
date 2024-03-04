import { INotification } from "@/redux/notification/type";
import { Text } from "@mantine/core";
import React, { FunctionComponent, useRef } from "react";
import { AutoSizer, InfiniteLoader, List } from "react-virtualized";
import NotificationItem from "./NotificationItem";

export interface INotificationContainer {
  notificationData: INotification[];
  hasMoreData: boolean;
  loadMoreData: (param: any) => Promise<any>;
}

const ITEM_WIDTH = 400;
const ITEM_HEIGHT = 70;

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

const RowItem = React.memo(function RowItem({ notification }: { notification: INotification }) {
  return <NotificationItem style={{}} notificationDetail={notification} />;
});

const NotificationContainer: FunctionComponent<INotificationContainer> = ({
  notificationData,
  hasMoreData,
  loadMoreData,
}) => {
  const infiniteLoaderRef = useRef<InfiniteLoader>(null);

  const noRowsRendered = () => (
    <div className="w-full h-full flex justify-center text-mantineText">
      <Text>No notification found.</Text>
    </div>
  );

  return (
    <AutoSizer>
      {({ width, height }) => {
        const rowCount = getRowsAmount(width, notificationData.length, hasMoreData);
        const rowRenderer = ({ index, style }: any) => {
          const maxItemsPerRow = getMaxItemsAmountPerRow(width);
          const notificationIds = generateIndexesForRow(index, maxItemsPerRow, notificationData.length).map(
            notificationIndex => notificationData[notificationIndex]
          );

          return (
            <div style={style} className="w-full h-full">
              {notificationIds.map((notification, index) => (
                <RowItem key={index} notification={notification} />
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
              const allItemLoaded = generateIndexesForRow(index, maxItemsPerRow, notificationData.length).length > 0;
              return !hasMoreData || allItemLoaded;
            }}
            loadMoreRows={loadMoreData}
            // threshold={10}
          >
            {({ onRowsRendered, registerChild }) => (
              <section>
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

export default NotificationContainer;
