import { Card, Skeleton } from "@mantine/core";
import { FunctionComponent } from "react";

interface IShareLinkSkeleton {
  cardWidth?: string;
}
const ShareLinkSkeleton: FunctionComponent<IShareLinkSkeleton> = ({ cardWidth }) => {
  return (
    <Card withBorder radius={"md"} className={`h-[400px] ${cardWidth ? cardWidth : "w-[30%]"}`}>
      <Skeleton width={"100%"} mb={"lg"} height={200} className="" />
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
