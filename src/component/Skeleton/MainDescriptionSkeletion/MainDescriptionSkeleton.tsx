import { Card, Flex, Group, Skeleton, Stack } from "@mantine/core";

const MainDescriptionSkeleton = () => {
  return (
    <Card withBorder radius={"md"} className="lg:w-[80%] w-[90%] ml-[5%] my-8">
      <Flex className="w-full flex lg:flex-row flex-col gap-5 justify-between mb-8">
        <Group w={"60%"}>
          <Skeleton w={50} h={50} circle />
          <Stack w={"50%"}>
            <Skeleton h={10} w={"50%"} />
            <Skeleton h={10} w={"50%"} />
          </Stack>
        </Group>

        <Group>
          <Skeleton h={30} w={100} />
          <Skeleton h={30} w={100} />
        </Group>
      </Flex>
      <Group justify="space-around" className="w-full">
        <Skeleton w={"25%"} h={15} />
        <Skeleton w={"25%"} h={15} />
        <Skeleton w={"25%"} h={15} />
      </Group>
    </Card>
  );
};

export default MainDescriptionSkeleton;
