import { FunctionComponent } from "react";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

interface IVirtualInfiniteScroll {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: any;
  loadNextPage: () => void;
}

const VirtualInfiniteScroll: FunctionComponent<IVirtualInfiniteScroll> = ({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
}) => {
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  const isItemLoaded = (index: number) => hasNextPage || index < items.length;

  const Item = ({ index, style }: any) => {
    let content;
    if (!isItemLoaded(index)) {
      content = "Loading...";
    } else {
      content = items[index].name;
    }

    return <div style={style}>{content}</div>;
  };

  return (
    <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
      {({ onItemsRendered, ref }) => (
        <FixedSizeList itemCount={itemCount} onItemsRendered={onItemsRendered} ref={ref}>
          {Item}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
};

export default VirtualInfiniteScroll;
