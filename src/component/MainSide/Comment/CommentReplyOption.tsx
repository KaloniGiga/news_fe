import { selectUser } from "@/redux/auth/auth.selector";
import { useDeleteCommentReplyMutation } from "@/redux/comment-reply/comment-reply.api";
import { ICommentReply } from "@/redux/comment-reply/type";
import { useAppSelector } from "@/redux/hooks";
import { ActionIcon, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FunctionComponent } from "react";
import { CiEdit } from "react-icons/ci";
import { MdMoreVert, MdOutlineDelete, MdOutlineReportGmailerrorred } from "react-icons/md";

interface ICommentReplyOption {
  commentData: ICommentReply;
  handleEditToggle: () => void;
}
const CommentReplyOption: FunctionComponent<ICommentReplyOption> = ({ commentData, handleEditToggle }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const user = useAppSelector(selectUser);

  const [deleteCommentReply, { isLoading, data, error }] = useDeleteCommentReplyMutation();

  const handleCommentReplyDelete = () => {
    deleteCommentReply(commentData.id);
  };

  return (
    <>
      <Menu>
        <Menu.Target>
          <ActionIcon size={"lg"} variant="subtle" color="gray">
            <MdMoreVert />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <>
            {user && commentData.user && user.id == commentData.user.id && (
              <Menu.Item onClick={handleEditToggle} leftSection={<CiEdit />}>
                Edit
              </Menu.Item>
            )}
            {user && commentData.user && user.id == commentData.user.id && (
              <Menu.Item onClick={handleCommentReplyDelete} leftSection={<MdOutlineDelete />}>
                Delete
              </Menu.Item>
            )}
            <Menu.Item leftSection={<MdOutlineReportGmailerrorred />}>Report abuse</Menu.Item>
          </>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default CommentReplyOption;
