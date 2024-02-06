import MuiAvatar from "@/component/Avatar/MuiAvatar";
import { selectUser } from "@/redux/auth/auth.selector";
import { useAppSelector } from "@/redux/hooks";
import { Button, Group, TagsInput, Text, TextInput, Textarea } from "@mantine/core";
import { FunctionComponent, useEffect, useState } from "react";
import PostNewsUserInfo from "./PostNewsUserInfo";
import { Controller, SubmitHandler } from "react-hook-form";
import { useForm } from "@mantine/form";
import DropzoneComp from "@/component/ui/FileUpload/DropzoneComp";
import NewEditor from "@/component/MyEditor/NewEditor";
import LinkPreview from "@/component/PostForm/LinkPreview";
import { useAddPostMutation, usePutPostMutation } from "@/redux/post/post.api";
import { PostData } from "@/redux/post/type";

interface IPostNewsForm {
  isEdit: boolean;
  editData: any;
  createPost: boolean;
}

const tagsData = ["React", "Svelte", "Angular", "Vue", "java"];
const PostNewsForm: FunctionComponent<IPostNewsForm> = ({ isEdit, editData, createPost }) => {
  const [addPost, { isLoading: postLoading, data: postData }] = useAddPostMutation();
  const [putPost, { isLoading: editLoading, data: editPostData }] = usePutPostMutation();

  const [showEditor, setShowEditor] = useState(false);
  const form = useForm<PostData>({
    initialValues: {
      links: "",
      title: "",
      tags: [],
      description: "",
      coverImage: "",
    },
  });

  const handleFormSubmit: SubmitHandler<PostData> = value => {
    const formData = new FormData();
    if (value.coverImage instanceof File) {
      formData.append("file", value.coverImage);
    }

    if (isEdit) {
      formData.append("id", editData.id);
    }
    formData.append("title", value.title);
    formData.append("description", value.description);
    formData.append("links", value.links);
    formData.append("tags", JSON.stringify(value.tags));

    if (isEdit) {
      putPost(formData);
    } else {
      addPost(formData);
    }
  };

  useEffect(() => {
    if (isEdit && editData) {
      console.log(editData);
      form.setFieldValue("title", editData.title);
      form.setFieldValue("description", editData.description);
      form.setFieldValue("links", editData.links);
      if (editData.tags && editData?.tags?.length > 0) {
        form.setFieldValue("tags", editData.tags);
      }
      form.setFieldValue("coverImage", editData.coverImage);
    }
  }, []);

  useEffect(() => {
    if (!showEditor) {
      setShowEditor(true);
    }
  }, []);

  return (
    <div className="w-full h-full">
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <div className="w-full flex flex-col gap-y-4 mt-4 px-2">
          {!createPost && (
            <>
              <TextInput
                styles={{ input: { border: "none" } }}
                required
                multiple={true}
                placeholder="Share your link."
                size="md"
                value={form.values.links}
                onChange={event => form.setFieldValue("links", event.currentTarget.value)}
                error={form.errors.links && "links must be seperated by comma"}
              />
              <div>
                <LinkPreview url={form.values.links} />
              </div>
            </>
          )}

          <TextInput
            styles={{ input: { border: "none" } }}
            required
            size="md"
            placeholder="New post title here..."
            value={form.values.title}
            onChange={event => form.setFieldValue("title", event.currentTarget.value)}
            error={form.errors.title && "Invalid title"}
          />

          <TagsInput
            styles={{ input: { border: "none" } }}
            required
            data={tagsData}
            size="md"
            placeholder="Add up to 4 tags"
            maxTags={4}
            maxDropdownHeight={300}
            onChange={value => form.setFieldValue("tags", value)}
            value={form.values.tags}
          />

          {/* <Textarea
            styles={{ input: { border: "none" } }}
            placeholder="Write description..."
            autosize
            size="lg"
            minRows={2}
            value={form.values.description}
            onChange={event => form.setFieldValue("description", event.currentTarget.value)}
            error={form.errors.description && "Invalid description"}
          /> */}

          {createPost && showEditor ? (
            <NewEditor
              placeholder="Write description"
              onChange={val => form.setFieldValue("description", val)}
              value={form.values.description}
            />
          ) : (
            <div></div>
          )}

          <DropzoneComp
            isEdit={isEdit}
            onChange={value => form.setFieldValue("coverImage", value)}
            value={form.values.coverImage}
          />

          <Button loading={editLoading || postLoading} fullWidth type="submit" radius={"sm"}>
            {!isEdit ? "Publish" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostNewsForm;
