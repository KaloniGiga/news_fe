"use client";
import React from "react";
import { Flex, Group, Tabs } from "@mantine/core";
import PostNewsUserInfo from "./PostNewsUserInfo";
import PostNewsForm from "./PostNewsForm";
import { FunctionComponent, SetStateAction, useState } from "react";
import { useTranslations } from "next-intl";

interface IPostNewsContainer {
  isEdit: boolean;
  editData: any;
  createPost: boolean;
  setCreatePost: React.Dispatch<SetStateAction<boolean>>;
  close: () => void;
}

const PostNewsFormContainer: FunctionComponent<IPostNewsContainer> = ({
  setCreatePost,
  createPost,
  isEdit,
  editData,
  close,
}) => {
  const t = useTranslations("PostNewsModel");
  return (
    <Flex direction={"column"} justify={"space-between"}>
      <Group justify="space-between">
        <PostNewsUserInfo />
        <Tabs
          defaultValue={createPost ? "post" : "news"}
          className="text-mantineText"
          onChange={value => (value == "post" ? setCreatePost(true) : setCreatePost(false))}
        >
          <Tabs.List className="before:hidden">
            <Tabs.Tab value="post">{t("title.createPost")}</Tabs.Tab>
            <Tabs.Tab value="news">{t("title.shareLink")}</Tabs.Tab>
          </Tabs.List>

          {/* <Tabs.Panel value="news"> */}
          {/* </Tabs.Panel> */}
        </Tabs>
      </Group>
      <PostNewsForm close={close} createPost={createPost} isEdit={isEdit} editData={editData} />
    </Flex>
  );
};

export default PostNewsFormContainer;
