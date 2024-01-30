import { Modal, Button } from "@mantine/core";
import { FunctionComponent } from "react";
import PostNewsForm from "./PostNewsForm";

interface IPostNewsModel {
  opened: boolean;
  close: () => void;
  open: () => void;
  isEdit: boolean;
  editData?: any;
}
const PostNewsModel: FunctionComponent<IPostNewsModel> = ({ opened, open, close, isEdit, editData }) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"lg"}
      title="Create post"
      overlayProps={{
        backgroundOpacity: 0.55,
      }}
      zIndex={9999}
      centered
    >
      <PostNewsForm isEdit={isEdit} editData={editData} />
    </Modal>
  );
};

export default PostNewsModel;
