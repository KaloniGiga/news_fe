"use client";
import { usePathname, useRouter } from "@/navigation";
import { Box, useMantineTheme } from "@mantine/core";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useTransition } from "react";
import { FaBookmark } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";

const LanguageSwitcher = () => {
  const t = useTranslations("Lang");
  const theme = useMantineTheme();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  //   console.log(pathname);
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(
      // @ts-expect-error
      { pathname, params },
      { locale: e.target.value }
    );
  };
  return (
    <div className="flex">
      <select
        name="language"
        id="language"
        defaultValue={locale}
        onChange={handleSelect}
        className="bg-mantineBody text-mantineText rounded py-1 px-2 outline-none"
      >
        {["en", "np"].map((cur, index) => (
          <option key={index} value={cur}>
            {t("locale", { locale: cur })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
