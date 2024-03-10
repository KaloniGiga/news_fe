"use client";
import { Button, Card, Chip, Divider, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react";
import CategoryChip from "./CategoryChip";
import React from "react";
import { useGetCategoryQuery } from "@/redux/category/category.api";
import { useAddUserCategoryPreferenceMutation } from "@/redux/user/user.api";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "@/redux/auth/auth.api";

const CategoryContainer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: user, refetch } = useGetUserQuery();
  const [addUserCategoryPreference, { isLoading: categoryPreferenceIsLoading, data: categoryPreferenceData }] =
    useAddUserCategoryPreferenceMutation();
  const { data: categoryData, isLoading: categoryIsLoading, error } = useGetCategoryQuery();
  const [choosenCategory, setChoosenCategory] = useState<string[]>([]);

  const handleCategorySubmit = () => {
    addUserCategoryPreference({ categories: choosenCategory });
  };

  useEffect(() => {
    if (categoryPreferenceData) {
      refetch();
      router.push("/");
    }
  }, [categoryPreferenceData]);

  useEffect(() => {
    if (user && user.data.categories && user.data.categories.length > 0) {
      const categories = user.data.categories.map(item => `${item.id}`);
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
