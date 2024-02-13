import CommentEditor from "@/component/MyEditor/CommentEditor";
import { useForm } from "@mantine/form";

const WriteComment = () => {
  const form = useForm({
    initialValues: {
      comment: "",
    },
  });

  return (
    <div>
      <CommentEditor
        placeholder="Share your thoughts"
        onChange={val => form.setFieldValue("comment", val)}
        value={form.values.comment}
      />
    </div>
  );
};

export default WriteComment;
