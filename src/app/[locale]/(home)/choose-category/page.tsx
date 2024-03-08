import ChooseCategory from "@/component/ChooseCategory/ChooseCategory";
import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";
const ChooseCategoryPage = ({ params }: { params: { locale: string } }) => {
  unstable_setRequestLocale(params.locale);
  return (
    <div className="w-full min-h-screen text-[var(--mantine-color-text)] bg-[var(--mantine-color-body)]">
      <ChooseCategory />
    </div>
  );
};

export default ChooseCategoryPage;
