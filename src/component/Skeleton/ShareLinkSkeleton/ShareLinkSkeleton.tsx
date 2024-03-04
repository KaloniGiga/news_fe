import { Card, Skeleton } from "@mantine/core";
import { FunctionComponent } from "react";

const ShareLinkSkeleton: FunctionComponent = () => {
  return (
    <Card withBorder radius={"md"} className="min-w-[300px] h-[400px]">
      <Skeleton width={"100%"} mb={"lg"} height={200} />
      <Skeleton h={10} mb={"sm"} width={"100%"} />
      <Skeleton h={10} mb={"sm"} width={"100%"} />
      <Skeleton h={10} mb={"sm"} width={"30%"} />
      <div className="flex justify-between items-center">
        <Skeleton w={40} h={40} circle />
        <Skeleton h={20} w={"60%"} />
      </div>
    </Card>
  );
};

export default ShareLinkSkeleton;
