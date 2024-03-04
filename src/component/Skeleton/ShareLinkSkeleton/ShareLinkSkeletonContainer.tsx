import { SimpleGrid } from "@mantine/core";
import ShareLinkSkeleton from "./ShareLinkSkeleton";

const ShareLinkSkeletonContainer = () => {
  return (
    <div className="w-full h-full flex flex-wrap pl-10 gap-4 pb-10">
      <ShareLinkSkeleton />
      <ShareLinkSkeleton />
      <ShareLinkSkeleton />
      <ShareLinkSkeleton />
      <ShareLinkSkeleton />
      <ShareLinkSkeleton />
      {/* <ShareLinkSkeleton /> */}
      {/* <ShareLinkSkeleton /> */}
      {/* <ShareLinkSkeleton /> */}
    </div>
  );
};

export default ShareLinkSkeletonContainer;
