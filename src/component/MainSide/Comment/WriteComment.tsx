import CommentEditor from "@/component/MyEditor/CommentEditor";
import { useCreateCommentReplyMutation } from "@/redux/comment-reply/comment-reply.api";
import { useCreateCommentMutation } from "@/redux/comment/comment.api";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FunctionComponent, useEffect } from "react";

interface IWriteComment {
  toggleComment?: () => void;
  postId?: number;
  commentId?: number;
  isCommentReply?: boolean;
  buttonLabel?: string;
  placeholder?: string;
}
const WriteComment: FunctionComponent<IWriteComment> = ({
  postId,
  commentId,
  isCommentReply = false,
  buttonLabel,
  placeholder,
  toggleComment,
}) => {
  const form = useForm({
    initialValues: {
      comment: "",
    },
  });

  const [createComment, { isLoading, data: commentData, error }] = useCreateCommentMutation();
  const [createCommentReply, { isLoading: commentReplyLoading, data: commentReplyData }] =
    useCreateCommentReplyMutation();

  useEffect(() => {
    if (commentData) {
      form.reset();
      toggleComment && toggleComment();
    }

    if (commentReplyData) {
      form.reset();
      toggleComment && toggleComment();
    }
  }, [commentData, commentReplyData]);

  const handleCommentSubmit = () => {
    if (isCommentReply && commentId && postId) {
      createCommentReply({
        message: form.values.comment,
        commentId: commentId,
        postId: postId,
      });
    } else if (postId) {
      createComment({
        message: form.values.comment,
        postId: postId,
      });
    }
  };

  return (
    <div>
      <CommentEditor
        placeholder={placeholder ? placeholder : "Share your thoughts"}
        onChange={val => form.setFieldValue("comment", val)}
        value={form.values.comment}
      />
      <div className="w-full flex justify-end p-2 bg-mantineBody">
        <Button loading={isLoading || commentReplyLoading} onClick={handleCommentSubmit}>
          {buttonLabel ? buttonLabel : "Comment"}
        </Button>
      </div>
    </div>
  );
};

export default WriteComment;
