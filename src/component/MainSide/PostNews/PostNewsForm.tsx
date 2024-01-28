import MuiAvatar from "@/component/Avatar/MuiAvatar";
import { selectUser } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";
import { Button, Group, TagsInput, Text, TextInput, Textarea } from "@mantine/core";
import { FunctionComponent } from "react";
import PostNewsUserInfo from "./PostNewsUserInfo";
import { Controller } from "react-hook-form";
import { useForm } from "@mantine/form";
import DropzoneComp from "@/component/ui/FileUpload/DropzoneComp";

interface IPostNewsForm {
  isEdit: boolean;
  editData: any;
}
const PostNewsForm: FunctionComponent<IPostNewsForm> = ({ isEdit, editData }) => {
  const form = useForm({
    initialValues: {
      links: "",
      title: "",
      tags: null,
      description: "",
      coverImage: "",
    },
  });

  return (
    <div className="w-full h-full">
      <PostNewsUserInfo />
      <form>
        <div className="w-full flex flex-col gap-y-4 mt-4 px-2">
          <TextInput
            styles={{ input: { border: "none" } }}
            required
            placeholder="Share your link."
            size="lg"
            value={form.values.links}
            onChange={event => form.setFieldValue("links", event.currentTarget.value)}
            error={form.errors.links && "links must be seperated by comma"}
          />

          <TextInput
            styles={{ input: { border: "none" } }}
            required
            size="lg"
            placeholder="New post title here..."
            value={form.values.title}
            onChange={event => form.setFieldValue("title", event.currentTarget.value)}
            error={form.errors.title && "Invalid title"}
          />

          <TagsInput
            styles={{ input: { border: "none" } }}
            size="lg"
            placeholder="Add up to 4 tags"
            maxTags={4}
            limit={25}
            data={["React", "Angular", "Vue", "Svelte"]}
            maxDropdownHeight={200}
          />

          <Textarea
            styles={{ input: { border: "none" } }}
            placeholder="Write description..."
            autosize
            size="lg"
            minRows={2}
            value={form.values.description}
            onChange={event => form.setFieldValue("description", event.currentTarget.value)}
            error={form.errors.description && "Invalid description"}
          />

          <DropzoneComp
            isEdit={isEdit}
            onChange={value => form.setFieldValue("coverImage", value)}
            value={form.values.coverImage}
          />

          <Button loading={false} fullWidth type="submit" radius={"sm"}>
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostNewsForm;
