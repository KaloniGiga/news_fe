import CommentEditor from "@/component/MyEditor/CommentEditor";
import {
  useCreateCommentReplyMutation,
  useGetCommentReplyByCommentIdQuery,
  useUpdateCommentReplyMutation,
} from "@/redux/comment-reply/comment-reply.api";
import { useCreateCommentMutation, useUpdateCommentMutation } from "@/redux/comment/comment.api";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FunctionComponent, useEffect } from "react";

interface IWriteComment {
  toggleComment?: () => void;
  commentReplyId?: number;
  postId?: number;
  commentId?: number;
  isCommentReply?: boolean;
  buttonLabel?: string;
  placeholder?: string;
  isEdit?: boolean;
  editData?: string;
}
const WriteComment: FunctionComponent<IWriteComment> = ({
  postId,
  commentId,
  commentReplyId,
  isCommentReply = false,
  buttonLabel,
  placeholder,
  toggleComment,
  isEdit,
  editData,
}) => {
  const form = useForm({
    initialValues: {
      comment: "",
    },
  });

  const [createComment, { isLoading, data: commentData, error }] = useCreateCommentMutation();
  const [updateComment, { isLoading: editCommentLoading, data: updateCommentData }] = useUpdateCommentMutation();

  const [createCommentReply, { isLoading: commentReplyLoading, data: commentReplyData }] =
    useCreateCommentReplyMutation();
  const [updateCommentReply, { isLoading: editCommentReplyLoading, data: updateCommentReplyData }] =
    useUpdateCommentReplyMutation();

  useEffect(() => {
    if (isEdit && editData) {
      form.setFieldValue("comment", editData);
    }
  }, []);

  useEffect(() => {
    if (commentData) {
      form.reset();
      toggleComment && toggleComment();
    }

    if (commentReplyData) {
      form.reset();
      toggleComment && toggleComment();
    }

    if (updateCommentData) {
      form.reset();
      toggleComment && toggleComment();
    }

    if (updateCommentReplyData) {
      form.reset();
      toggleComment && toggleComment();
    }
  }, [commentData, commentReplyData, updateCommentData, updateCommentReplyData]);

  const handleCommentSubmit = () => {
    if (isEdit) {
      if (isCommentReply && commentId) {
        updateCommentReply({
          id: commentReplyId,
          message: form.values.comment,
          commentId: commentId,
        });
      } else if (postId && commentId) {
        updateComment({
          message: form.values.comment,
          postId: postId,
          id: commentId,
        });
      }
    } else {
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
    }
  };

  return (
    <div>
      <CommentEditor
        placeholder={placeholder ? placeholder : "Share your thoughts"}
        onChange={val => form.setFieldValue("comment", val)}
        value={form.values.comment}
      />
      <div className="w-full flex gap-x-2 justify-end p-1 pt-2 bg-mantineBody">
        <Button variant="outline" onClick={toggleComment}>
          {"Cancel"}
        </Button>
        <Button
          loading={isLoading || commentReplyLoading || editCommentLoading || editCommentReplyLoading}
          onClick={handleCommentSubmit}
        >
          {buttonLabel ? buttonLabel : "Comment"}
        </Button>
      </div>
    </div>
  );
};

export default WriteComment;
