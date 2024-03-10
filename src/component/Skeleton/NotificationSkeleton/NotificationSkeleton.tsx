import { Skeleton, Stack } from "@mantine/core";

const NotificationSkeleton = () => {
  return (
    <div className="w-full flex px-4 py-2 gap-x-2 items-center">
      <Skeleton w={40} h={40} circle />
      <Stack w={"75%"}>
        <Skeleton w={"100%"} h={10} />
        <Skeleton w={"25%"} h={10} />
      </Stack>
    </div>
  );
};

export default NotificationSkeleton;
