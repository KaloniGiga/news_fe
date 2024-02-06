"use client";
import { Button, Card, Chip, Divider, SimpleGrid } from "@mantine/core";
import { useState } from "react";
import CategoryChip from "./CategoryChip";
import React from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";

const CategoryContainer = () => {
  const [choosenCategory, setChoosenCategory] = useState<string[]>([]);
  const categoryData = [
    "react",
    "angular",
    "vue",
    "nextjs",
    "nuxtjs",
    "javascript",
    "data scient",
    "machine learning",
    "deep learning",
    "data analytics",
    "software engineering",
    "quality analyst",
    "ethical hacking",
    "cybersecurity expert",
    "researcher",
  ];
  return (
    <Card pt={"xl"} px={"lg"} radius={"md"} className="mt-8">
      <Chip.Group multiple value={choosenCategory} onChange={setChoosenCategory}>
        <SimpleGrid verticalSpacing={"lg"} spacing={"lg"} cols={{ base: 2, md: 4 }}>
          {categoryData &&
            categoryData.length > 0 &&
            categoryData.map((item, index) => <CategoryChip key={index} title={item} />)}
        </SimpleGrid>
      </Chip.Group>

      <div className="w-full mt-8 mb-4 flex justify-center items-center">
        <Divider
          styles={{ root: { width: "100%" } }}
          size={1}
          labelPosition="center"
          label={
            <Button
              color="var(--mantine-color-text)"
              variant="subtle"
              rightSection={<FaArrowRightToBracket />}
              size="md"
            >
              Next
            </Button>
          }
        />
      </div>
    </Card>
  );
};

export default CategoryContainer;
