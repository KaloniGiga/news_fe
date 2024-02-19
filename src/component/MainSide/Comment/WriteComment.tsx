import CommentEditor from "@/component/MyEditor/CommentEditor";
import { useCreateCommentMutation } from "@/redux/comment/comment.api";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FunctionComponent, useEffect } from "react";

interface IWriteComment {
  postId: number;
}
const WriteComment: FunctionComponent<IWriteComment> = ({ postId }) => {
  const form = useForm({
    initialValues: {
      comment: "",
    },
  });

  const [createComment, { isLoading, data: commentData, error }] = useCreateCommentMutation();

  useEffect(() => {
    if (commentData) {
      console.log(commentData);
    }
  }, [commentData]);

  const handleCommentSubmit = () => {
    createComment({
      message: form.values.comment,
      postId: postId,
    });
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
