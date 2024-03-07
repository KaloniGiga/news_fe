import { Text, Title } from "@mantine/core";
import React from "react";
import CategoryContainer from "./CategoryContainer";
import { useTranslations } from "next-intl";

const ChooseCategory = () => {
  const t = useTranslations("ChooseCategory");
  return (
    <div className="w-full h-full pt-16 pb-8 flex flex-col items-center justify-center">
      <Title order={2} size={"h1"}>
        {t("title")}
      </Title>
      <Text my={"md"} size="lg">
        {t("desc")}
      </Text>
      <CategoryContainer />
    </div>
  );
};

export default ChooseCategory;
