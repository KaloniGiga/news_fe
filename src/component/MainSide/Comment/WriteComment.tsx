import { useCreateCommentReplyMutation, useUpdateCommentReplyMutation } from "@/redux/comment-reply/comment-reply.api";
import { useCreateCommentMutation, useUpdateCommentMutation } from "@/redux/comment/comment.api";
import { Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FunctionComponent, useEffect, useState } from "react";
import CommentWithMention from "./CommentWithMention/CommentWithMention";
import CommentEditor from "@/component/MyEditor/CommentEditor";

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
  // const [mentions, setMentions] = useState<string[]>([]);
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

  const parse = Range.prototype.createContextualFragment.bind(document.createRange());
  const extractMentions = () => {
    let mentions: string[] = [];
    const elements = parse(form.values.comment).querySelectorAll(".mention");
    if (elements) {
      elements.forEach(element => {
        const id = element.getAttribute("data-id");
        if (id) {
          mentions.push(id);
        }
      });
      mentions = Array.from(new Set(mentions));
    }
    return mentions;
  };

  const handleCommentSubmit = () => {
    if (isEdit) {
      if (isCommentReply && commentId) {
        const mentions = extractMentions();
        updateCommentReply({
          id: commentReplyId,
          message: form.values.comment,
          commentId: commentId,
          mentions: mentions,
        });
      } else if (postId && commentId) {
        const mentions = extractMentions();
        updateComment({
          message: form.values.comment,
          postId: postId,
          id: commentId,
          mentions: mentions,
        });
      }
    } else {
      if (isCommentReply && commentId) {
        const mentions = extractMentions();
        createCommentReply({
          message: form.values.comment,
          commentId: commentId,
          mentions: mentions,
        });
      } else if (postId) {
        const mentions = extractMentions();
        createComment({
          message: form.values.comment,
          postId: postId,
          mentions: mentions,
        });
      }
    }
  };
  return (
    <Stack gap={0} px={"md"}>
      <CommentEditor
        placeholder={placeholder ? placeholder : "Share your thoughts"}
        onChange={val => form.setFieldValue("comment", val)}
        value={form.values.comment}
      />
      {/* <CommentWithMention
        placeholder={placeholder ? placeholder : "Share your thoughts"}
        handleCommentChange={(_: any, newValue: any, newPlainTextValue: any) => {
          setRawComment(newValue);
          // const result = [...newValue.matchAll(/@\[(.*?)]\((\d+)\)/g)];
          // const res = result.map(res => parseInt(res[2]));
          // console.log(newValue, res, newPlainTextValue);
          form.setFieldValue("comment", newPlainTextValue);
        }}
        value={form.values.comment}
        handleMentionAdd={(id: any, display: string) => setMentions(prev => [...prev, id])}
      /> */}
      <div className="w-full flex gap-x-2 justify-end p-2 bg-mantineBody">
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
    </Stack>
  );
};

export default WriteComment;
