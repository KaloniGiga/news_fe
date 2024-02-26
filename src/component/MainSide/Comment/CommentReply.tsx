import MuiAvatar from "@/component/Avatar/MuiAvatar";
import { useGetCommentReplyByCommentIdQuery } from "@/redux/comment-reply/comment-reply.api";
import { Stack } from "@mantine/core";
import { FunctionComponent, useState } from "react";
import CommentOption from "./CommentOption";
import moment from "moment";
import CommentReplyOption from "./CommentReplyOption";
import { ICommentReply } from "@/redux/comment-reply/type";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthenticated } from "@/redux/auth/auth.selector";
import WriteComment from "./WriteComment";

interface ICommentReplyData {
  commentReply: ICommentReply;
  commentId: number;
}
const CommentReply: FunctionComponent<ICommentReplyData> = ({ commentReply, commentId }) => {
  const [isEditComment, setIsEditComment] = useState(false);
  const isAuthenticatedUser = useAppSelector(selectAuthenticated);

  const handleEditToggle = () => {
    if (!isAuthenticatedUser) return;
    setIsEditComment(prev => !prev);
  };
  return (
    <div className="w-full flex gap-x-2 justify-start ">
      <div>
        <MuiAvatar
          // size="small"
          sx={{ width: 25, height: 25 }}
          name={commentReply.user.username[0]}
          src={
            commentReply.user && commentReply.user.picture
              ? commentReply.user.picture.includes("https")
                ? commentReply.user.picture
                : `${process.env.NEXT_PUBLIC_SERVER_URL}/avatar/${commentReply.user.picture}`
              : ""
          }
        />
      </div>
      <div className="w-full flex flex-col gap-y-4 px-4 py-4 rounded-xl bg-mantineBody">
        <div className="w-full flex justify-between">
          <div className="flex gap-x-4 items-center">
            <span className="font-semibold">{commentReply.user.username}</span>
            <span className="font-regular text-sm">{moment(commentReply.createdAt, "YYYYMMDD").fromNow()}</span>
          </div>
          <div>
            <CommentReplyOption handleEditToggle={handleEditToggle} commentData={commentReply} />
          </div>
        </div>
        {/* <h4 className="text-sm line-clamp-3">{comment.message}</h4> */}
        {!isEditComment && <h4 dangerouslySetInnerHTML={{ __html: commentReply.message }} />}
        {isEditComment && (
          <WriteComment
            toggleComment={handleEditToggle}
            isEdit={true}
            editData={commentReply.message}
            buttonLabel="Edit"
            commentId={commentId}
            commentReplyId={commentReply.id}
            isCommentReply={true}
            // postId={postId}
          />
        )}
      </div>
    </div>
  );
};

export default CommentReply;
