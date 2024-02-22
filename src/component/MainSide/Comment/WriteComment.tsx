import CommentEditor from "@/component/MyEditor/CommentEditor";
import { useCreateCommentReplyMutation } from "@/redux/comment-reply/comment-reply.api";
import { useCreateCommentMutation } from "@/redux/comment/comment.api";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FunctionComponent, useEffect } from "react";

interface IWriteComment {
  postId?: number;
  commentId?: number;
  isCommentReply?: boolean;
}
const WriteComment: FunctionComponent<IWriteComment> = ({ postId, commentId, isCommentReply = false }) => {
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
      console.log(commentData);
    }

    if (commentReplyLoading) {
      console.log(commentReplyData);
    }
  }, [commentData]);

  const handleCommentSubmit = () => {
    if (isCommentReply && commentId) {
      createCommentReply({
        message: form.values.comment,
        commentId: commentId,
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
        placeholder="Share your thoughts"
        onChange={val => form.setFieldValue("comment", val)}
        value={form.values.comment}
      />
      <div className="w-full flex justify-end p-2 bg-mantineBody">
        <Button loading={isLoading} onClick={handleCommentSubmit}>
          Comment
        </Button>
      </div>
    </div>
  );
};

export default WriteComment;
