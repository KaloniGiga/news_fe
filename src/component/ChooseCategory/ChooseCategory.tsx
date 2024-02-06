import { Text, Title } from "@mantine/core";
import React from "react";
import CategoryContainer from "./CategoryContainer";

const ChooseCategory = () => {
  return (
    <div className="w-full h-full pt-16 pb-8 flex flex-col items-center justify-center">
      <Title order={2} size={"h1"}>
        What are you interested in?
      </Title>
      <Text my={"lg"} size="lg">
        Choose three or more
      </Text>
      <CategoryContainer />
    </div>
  );
};

export default ChooseCategory;
