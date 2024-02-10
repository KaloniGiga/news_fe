import { Chip, Group, Text, Tooltip } from "@mantine/core";
import React from "react";
import { FunctionComponent } from "react";
import { GoPlus } from "react-icons/go";

interface ICategoryChip {
  title: string;
  id: number;
}
const CategoryChip: FunctionComponent<ICategoryChip> = ({ id, title }) => {
  return (
    <Tooltip label={title} refProp="rootRef">
      <Chip value={`${id}`}>
        <Group gap={"sm"}>
          <Text>{title}</Text>
          <GoPlus />
        </Group>
      </Chip>
    </Tooltip>
  );
};

export default CategoryChip;
