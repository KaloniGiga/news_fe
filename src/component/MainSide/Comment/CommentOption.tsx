import { selectAuthenticated, selectUser } from "@/redux/auth/auth.selector";
import { IComment } from "@/redux/comment/type";
import { useAppSelector } from "@/redux/hooks";
import { ActionIcon, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FunctionComponent } from "react";
import { MdMoreVert } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { useDeleteCommentMutation } from "@/redux/comment/comment.api";

interface ICommentOption {
  commentData: IComment;
  handleEditToggle: () => void;
}
const CommentOption: FunctionComponent<ICommentOption> = ({ commentData, handleEditToggle }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteComment, { isLoading, data, isError }] = useDeleteCommentMutation();
  const user = useAppSelector(selectUser);

  const handleDeleteCommentClick = () => {
    deleteComment(commentData.id);
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
              <Menu.Item onClick={handleDeleteCommentClick} leftSection={<MdOutlineDelete />}>
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

export default CommentOption;
