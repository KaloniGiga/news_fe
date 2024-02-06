import { Chip, Group, Text, Tooltip } from "@mantine/core";
import React from "react";
import { FunctionComponent } from "react";
import { GoPlus } from "react-icons/go";

interface ICategoryChip {
  title: string;
}
const CategoryChip: FunctionComponent<ICategoryChip> = ({ title }) => {
  return (
    <Tooltip label={title} refProp="rootRef">
      <Chip value={title}>
        <Group gap={"sm"}>
          <Text>{title}</Text>
          <GoPlus />
        </Group>
      </Chip>
    </Tooltip>
  );
};

export default CategoryChip;
