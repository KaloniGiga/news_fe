import MuiAvatar from "@/component/Avatar/MuiAvatar";
import { selectAuthenticated } from "@/redux/auth/auth.selector";
import { IComment } from "@/redux/comment/type";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, Button, Group, Stack, useMantineTheme } from "@mantine/core";
import moment from "moment";
import { FunctionComponent, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GoHeartFill } from "react-icons/go";
import WriteComment from "./WriteComment";
import { MdOutlineReply } from "react-icons/md";
import CommentOption from "./CommentOption";
import CommentReply from "./CommentReply";
import { useAddLikeToACommentMutation, useRemoveLikeToACommentMutation } from "@/redux/comment-like/comment-like.api";
import { useGetCommentsByPostIdQuery } from "@/redux/comment/comment.api";

interface ICommentContainer {
  comment: IComment;
  postId: number;
}

const CommentContainer: FunctionComponent<ICommentContainer> = ({ comment, postId }) => {
  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);
  const [addLikeToAComment, { isLoading: addLikeLoading, data: addLikeData }] = useAddLikeToACommentMutation();
  const [removeLikeToAComment, { isLoading: removeLikeLoading, data: removeLikeData }] =
    useRemoveLikeToACommentMutation();
  const theme = useMantineTheme();

  const handleLikeToCommentToggle = () => {
    if (!isAuthenticatedUser) return;
    if (isAuthenticatedUser && comment) {
      if (comment.hasUserLiked) {
        removeLikeToAComment({ commentId: comment.id, postId });
      } else {
        addLikeToAComment({ commentId: comment.id, postId });
      }
    }
  };

  const handleReplyCommentToggle = () => {
    if (!isAuthenticatedUser) return;
    setIsCommentClicked(prev => !prev);
  };

  const handleEditToggle = () => {
    if (!isAuthenticatedUser) return;
    setIsEditComment(prev => !prev);
  };
  return (
    <Stack gap={"xs"} px={"md"} my={"sm"}>
      <div className="w-full flex gap-x-2 justify-start ">
        <div>
          <MuiAvatar
            sx={{ width: 30, height: 30 }}
            name={comment.user.username[0]}
            src={
              comment.user && comment.user.picture
                ? comment.user.picture.includes("https")
                  ? comment.user.picture
                  : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${comment.user.picture}`
                : ""
            }
          />
        </div>
        <div className="w-full flex flex-col gap-y-4 px-4 py-4 rounded-xl toggleBodyColor">
          <div className="w-full flex justify-between">
            <div className="flex gap-x-4 items-center">
              <span className="font-semibold">{comment?.user?.username}</span>
              <span className="font-regular text-sm">{moment(comment.createdAt, "YYYYMMDD").fromNow()}</span>
            </div>
            <div>
              <CommentOption handleEditToggle={handleEditToggle} commentData={comment} />
            </div>
          </div>
          {!isEditComment && <h4 dangerouslySetInnerHTML={{ __html: comment.message }} />}
          {isEditComment && (
            <WriteComment
              toggleComment={handleEditToggle}
              isEdit={true}
              editData={comment.rawMessage}
              buttonLabel="Edit"
              commentId={comment.id}
              postId={postId}
            />
          )}
          <Group>
            <Button
              onClick={handleLikeToCommentToggle}
              variant="subtle"
              color="gray"
              leftSection={
                comment && comment?.hasUserLiked ? (
                  <GoHeartFill size={20} color={theme.colors.red[6]} />
                ) : (
                  <CiHeart size={20} color={theme.colors.red[6]} />
                )
              }
            >
              {`${comment.commentLikesNum} likes`}
            </Button>

            <Button
              onClick={handleReplyCommentToggle}
              color="gray"
              variant="subtle"
              leftSection={<MdOutlineReply size={18} color={theme.colors.yellow[7]} />}
            >
              {`${comment.commentRepliesNum} Reply`}
            </Button>
          </Group>
          {isCommentClicked && (
            <WriteComment
              toggleComment={handleReplyCommentToggle}
              buttonLabel="Submit"
              placeholder="Reply to the comment."
              commentId={comment.id}
              postId={postId}
              isCommentReply={true}
            />
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Stack w={"95%"}>
          {comment.commentReplies &&
            comment.commentReplies.length > 0 &&
            comment.commentReplies.map((replyItem, index) => (
              <CommentReply key={index} commentId={comment.id} commentReply={replyItem} />
            ))}
        </Stack>
      </div>
    </Stack>
  );
};

export default CommentContainer;
