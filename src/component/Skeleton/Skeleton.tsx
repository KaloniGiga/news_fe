"use client";
import React, { FunctionComponent, ReactElement } from "react";
import { Skeleton } from "@mantine/core";

const SkeletonComponent: FunctionComponent = (): ReactElement => {
  return (
    <div>
      <Skeleton height={50} circle mb="xl" />
      <Skeleton height={8} mt={30} width="20%" radius="xl" />
      <Skeleton height={8} mt={30} radius="xl" />
      <Skeleton height={8} mt={30} width="30%" radius="xl" />
      <Skeleton height={8} mt={20} width="10%" radius="xl" />

      <Skeleton height={250} mt={30} />
      <Skeleton height={8} mt={30} radius="xl" />
      <Skeleton height={8} mt={35} width="30%" radius="xl" />
      <Skeleton height={8} mt={30} radius="xl" />
    </div>
  );
};

export default SkeletonComponent;
