"use client";
import { Button, Card, Chip, Divider, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react";
import CategoryChip from "./CategoryChip";
import React from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useGetCategoryQuery } from "@/redux/category/category.api";
import { useAddUserCategoryPreferenceMutation } from "@/redux/user/user.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/auth/auth.selector";

const CategoryContainer = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [addUserCategoryPreference, { isLoading: categoryPreferenceIsLoading, data: categoryPreferenceData }] =
    useAddUserCategoryPreferenceMutation();
  const { data: categoryData, isLoading: categoryIsLoading, error } = useGetCategoryQuery();
  const [choosenCategory, setChoosenCategory] = useState<string[]>([]);
  // const categoryData = [
  //   "react",
  //   "angular",
  //   "vue",
  //   "nextjs",
  //   "nuxtjs",
  //   "javascript",
  //   "data scient",
  //   "machine learning",
  //   "deep learning",
  //   "data analytics",
  //   "software engineering",
  //   "quality analyst",
  //   "ethical hacking",
  //   "cybersecurity expert",
  //   "researcher",
  // ];

  const handleCategorySubmit = () => {
    console.log(choosenCategory);
    addUserCategoryPreference({ categories: choosenCategory });
  };

  useEffect(() => {
    if (categoryPreferenceData) {
      console.log(categoryPreferenceData);
    }
  }, [categoryPreferenceData]);

  useEffect(() => {
    console.log(user);
    if (user && user.categories && user.categories.length > 0) {
      const categories = user.categories.map(item => `${item.id}`);
      setChoosenCategory(categories);
    }
  }, [user]);

  return (
    <Card withBorder pt={"xl"} px={"lg"} radius={"md"} className="mt-8">
      <Chip.Group multiple value={choosenCategory} onChange={setChoosenCategory}>
        <SimpleGrid verticalSpacing={"lg"} spacing={"lg"} cols={{ base: 2, md: 4 }}>
          {categoryData &&
            categoryData.data.length > 0 &&
            categoryData.data.map((item: any, index: React.Key | null | undefined) => (
              <CategoryChip key={index} id={item.id} title={item.title} />
            ))}
        </SimpleGrid>
      </Chip.Group>

      <div className="w-full mt-4 mb-2 flex justify-center items-center">
        <Divider
          styles={{ root: { width: "100%" } }}
          size={1}
          labelPosition="center"
          label={
            <Button
              loading={categoryPreferenceIsLoading}
              onClick={handleCategorySubmit}
              color="var(--mantine-color-text)"
              variant="subtle"
              // rightSection={<FaArrowRightToBracket />}
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
