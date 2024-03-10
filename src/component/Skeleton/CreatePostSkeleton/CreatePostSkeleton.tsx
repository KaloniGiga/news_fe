import { Card, Flex, Group, Skeleton, Stack } from "@mantine/core";
import { FunctionComponent } from "react";

const CreatePostSkeleton: FunctionComponent = () => {
  return (
    <Card w={800} h={300} withBorder radius={"md"}>
      <Group w={"100%"} mb={"md"}>
        <Skeleton w={40} h={40} circle />
        <Stack w={"60%"}>
          <Skeleton w={"30%"} h={10} />
          <Skeleton w={"15%"} h={10} />
        </Stack>
      </Group>
      <Stack>
        <Skeleton h={10} w={"100%"} />
        <Skeleton h={10} w={"100%"} />
        <Skeleton h={10} w={"80%"} />
        <Skeleton h={10} w={"40%"} />
      </Stack>

      <Flex mt={"md"} justify={"space-between"}>
        <Group>
          <Skeleton w={40} h={40} circle />
          <Skeleton w={40} h={40} circle />
          <Skeleton w={40} h={40} circle />
        </Group>

        <Group>
          <Skeleton w={"30%"} h={10} />
        </Group>
      </Flex>
    </Card>
  );
};

export default CreatePostSkeleton;
