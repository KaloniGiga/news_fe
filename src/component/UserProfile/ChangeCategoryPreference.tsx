import { selectUser } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";
import { Chip, SimpleGrid, Text } from "@mantine/core";
import CategoryChip from "../ChooseCategory/CategoryChip";
import { useState } from "react";
import { useGetCategoryQuery } from "@/redux/category/category.api";

const ChangeCategoryPreference = () => {
  const [choosenCategory, setChoosenCategory] = useState<string[]>([]);
  const user = useAppSelector(selectUser);
  const { data: categoryData, isLoading: categoryIsLoading, error } = useGetCategoryQuery();
  return (
    <div>
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
    </div>
  );
};

export default ChangeCategoryPreference;
