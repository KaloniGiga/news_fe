"use client";
import { selectUser } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";
import { Button, Card, Chip, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import CategoryChip from "../ChooseCategory/CategoryChip";
import { useEffect, useState } from "react";
import { useGetCategoryQuery } from "@/redux/category/category.api";
import { useAddUserCategoryPreferenceMutation } from "@/redux/user/user.api";
import { useGetUserQuery } from "@/redux/auth/auth.api";

const ChangeCategoryPreference = () => {
  const [choosenCategory, setChoosenCategory] = useState<string[]>([]);
  const { data: user, refetch } = useGetUserQuery();
  const [addUserCategoryPreference, { isLoading: categoryPreferenceIsLoading, data: categoryPreferenceData }] =
    useAddUserCategoryPreferenceMutation();
  const { data: categoryData, isLoading: categoryIsLoading, error } = useGetCategoryQuery();

  const handleCategorySubmit = () => {
    console.log(choosenCategory);
    addUserCategoryPreference({ categories: choosenCategory });
  };

  useEffect(() => {
    if (user && user.data.categories && user.data.categories.length > 0) {
      const categories = user.data.categories.map(item => `${item.id}`);
      setChoosenCategory(categories);
    }
  }, [user]);

  useEffect(() => {
    if (categoryPreferenceData && categoryPreferenceData.data) {
      refetch();
    }
  }, [categoryPreferenceData]);

  return (
    <Card withBorder radius={"md"} p={"lg"} className="w-full mb-8">
      <Stack pb={"md"}>
        <Text size="lg" fw={700}>
          Change Category Preference
        </Text>

        <Chip.Group multiple value={choosenCategory} onChange={setChoosenCategory}>
          <SimpleGrid verticalSpacing={"lg"} spacing={"lg"} cols={{ base: 2, md: 4 }}>
            {categoryData &&
              categoryData.data.length > 0 &&
              categoryData.data.map((item: any, index: React.Key | null | undefined) => (
                <CategoryChip key={index} id={item.id} title={item.title} />
              ))}
          </SimpleGrid>
        </Chip.Group>

        {/* <Group> */}
        <Button loading={categoryPreferenceIsLoading} onClick={handleCategorySubmit}>
          Change Category Preference
        </Button>
        {/* </Group> */}
      </Stack>
    </Card>
  );
};

export default ChangeCategoryPreference;
