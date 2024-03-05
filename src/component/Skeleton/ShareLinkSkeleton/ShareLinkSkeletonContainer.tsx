import { SimpleGrid } from "@mantine/core";
import ShareLinkSkeleton from "./ShareLinkSkeleton";
import { FunctionComponent } from "react";

interface IShareLinkSkeletonContainer {
  className?: string;
  cardWidth?: string;
}
const ShareLinkSkeletonContainer: FunctionComponent<IShareLinkSkeletonContainer> = ({ className, cardWidth }) => {
  return (
    <div className={`w-full h-full flex flex-wrap pl-10 gap-4 pb-10 ${className ? className : ""}`}>
      <ShareLinkSkeleton cardWidth={cardWidth} />
      <ShareLinkSkeleton cardWidth={cardWidth} />
      <ShareLinkSkeleton cardWidth={cardWidth} />
      <ShareLinkSkeleton cardWidth={cardWidth} />
      <ShareLinkSkeleton cardWidth={cardWidth} />
      <ShareLinkSkeleton cardWidth={cardWidth} />
      {/* <ShareLinkSkeleton /> */}
      {/* <ShareLinkSkeleton /> */}
      {/* <ShareLinkSkeleton /> */}
    </div>
  );
};

export default ShareLinkSkeletonContainer;
