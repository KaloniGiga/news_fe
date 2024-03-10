import { Modal } from "@mantine/core";
import { FunctionComponent, SetStateAction } from "react";
import PostNewsFormContainer from "./PostNewsFormContainer";
import { GetPostData } from "@/redux/post/type";
import React from "react";
import { useTranslations } from "next-intl";

interface IPostNewsModel {
  opened: boolean;
  close: () => void;
  open: () => void;
  isEdit: boolean;
  editData?: GetPostData;
  createPost?: boolean;
  setCreatePost: React.Dispatch<SetStateAction<boolean>>;
}
const PostNewsModel: FunctionComponent<IPostNewsModel> = ({
  setCreatePost,
  createPost = false,
  opened,
  open,
  close,
  isEdit,
  editData,
}) => {
  const t = useTranslations("PostNewsModel");
  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"lg"}
      title={`${createPost ? t("title.createPost") : t("title.shareLink")}`}
      overlayProps={{
        backgroundOpacity: 0.55,
      }}
      zIndex={9999}
      // centered
      styles={{ root: { color: "var(--mantine-color-text)" } }}
    >
      <PostNewsFormContainer
        setCreatePost={setCreatePost}
        createPost={createPost}
        isEdit={isEdit}
        editData={editData}
        close={close}
      />
    </Modal>
  );
};

export default PostNewsModel;
