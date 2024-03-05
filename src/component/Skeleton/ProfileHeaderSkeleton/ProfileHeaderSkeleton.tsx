import { Card, Flex, Group, Skeleton, Stack } from "@mantine/core";

const ProfileHeaderSkeleton = () => {
  return (
    <Card withBorder radius={"md"} className="w-full h-full flex flex-col gap-y-2 items-center justify-center">
      <Skeleton mb={"md"} w={100} h={100} circle />
      <Skeleton w={"25%"} h={10} />
      <Skeleton w={"25%"} h={10} />
      <Group className="w-full mt-2">
        <Skeleton w={"10%"} h={15} />
        <Skeleton w={"10%"} h={15} />
        <Skeleton w={"10%"} h={15} />
      </Group>
    </Card>
  );
};

export default ProfileHeaderSkeleton;
