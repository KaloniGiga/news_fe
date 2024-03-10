import { Skeleton, Stack } from "@mantine/core";
import NotificationSkeleton from "./NotificationSkeleton";

const NotificationSkeletonContainer = () => {
  return (
    <div className="w-full flex flex-col">
      <NotificationSkeleton />
      <NotificationSkeleton />
      <NotificationSkeleton />
      <NotificationSkeleton />
    </div>
  );
};

export default NotificationSkeletonContainer;
