import { Modal, Button } from "@mantine/core";
import { FunctionComponent, SetStateAction } from "react";
import PostNewsFormContainer from "./PostNewsFormContainer";

interface IPostNewsModel {
  opened: boolean;
  close: () => void;
  open: () => void;
  isEdit: boolean;
  editData?: any;
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
  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"lg"}
      title={`${createPost ? "Create Post" : "Share News"}`}
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
