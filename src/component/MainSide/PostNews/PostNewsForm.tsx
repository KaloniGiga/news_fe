import { Button, TagsInput, TextInput } from "@mantine/core";
import { FunctionComponent, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useForm } from "@mantine/form";
import DropzoneComp from "@/component/ui/FileUpload/DropzoneComp";
import NewEditor from "@/component/MyEditor/NewEditor";
import LinkPreview from "@/component/PostForm/LinkPreview";
import { useAddPostMutation, usePutPostMutation } from "@/redux/post/post.api";
import { PostData, PostTypeEnum } from "@/redux/post/type";
import { useGetCategoryQuery } from "../../../redux/category/category.api";
import { useTranslations } from "next-intl";

interface IPostNewsForm {
  isEdit: boolean;
  editData: any;
  createPost: boolean;
  close: () => void;
}

const tagsData = [
  "React",
  "Svelte",
  "Angular",
  "Vue",
  "java",
  "politics",
  "entertainment",
  "journalism",
  "geopolitics",
  "category",
  "sports",
];
const PostNewsForm: FunctionComponent<IPostNewsForm> = ({ close, isEdit, editData, createPost }) => {
  const [addPost, { isLoading: postLoading, data: postData }] = useAddPostMutation();
  const [putPost, { isLoading: editLoading, data: editPostData }] = usePutPostMutation();
  const { data: categoryData } = useGetCategoryQuery();
  const t = useTranslations("PostNewsModel");
  const [showEditor, setShowEditor] = useState(false);
  const form = useForm<PostData>({
    initialValues: {
      links: "",
      title: "",
      tags: [],
      category: [],
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
    formData.append("category", JSON.stringify(value.category));
    if (createPost) {
      formData.append("type", PostTypeEnum.CREATEPOST);
    } else {
      formData.append("type", PostTypeEnum.SHARELINK);
    }

    if (isEdit) {
      putPost(formData);
    } else {
      addPost(formData);
    }
  };

  useEffect(() => {
    if (isEdit && editData) {
      form.setFieldValue("title", editData.title);
      form.setFieldValue("description", editData.description);
      form.setFieldValue("links", editData.links);
      if (editData.tags && editData?.tags?.length > 0) {
        form.setFieldValue("tags", editData.tags);
      }
      if (editData.category && editData?.category?.length > 0) {
        form.setFieldValue("category", editData.category);
      }
      form.setFieldValue("coverImage", editData.coverImage);
    }
  }, []);

  useEffect(() => {
    if (!showEditor) {
      setShowEditor(true);
    }
  }, []);

  useEffect(() => {
    if (postData) {
      close();
    }

    if (editPostData) {
      close();
    }
  }, [postData, editPostData, close]);

  return (
    <div className="w-full h-full">
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <div className="w-full flex flex-col gap-y-4 mt-4 px-2 relative">
          {!createPost && (
            <>
              <TextInput
                styles={{ input: { border: "none" } }}
                required
                multiple={true}
                placeholder={t("placeholder.shareLink")}
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
            placeholder={t("placeholder.postTitle")}
            value={form.values.title}
            onChange={event => form.setFieldValue("title", event.currentTarget.value)}
            error={form.errors.title && "Invalid title"}
          />

          <TagsInput
            styles={{ input: { border: "none" } }}
            required
            data={tagsData}
            size="md"
            placeholder={t("placeholder.tags")}
            maxTags={4}
            // maxDropdownHeight={500}
            withScrollArea={true}
            onChange={value => form.setFieldValue("tags", value)}
            value={form.values.tags}
            comboboxProps={{ withinPortal: false }}
          />

          <TagsInput
            styles={{ input: { border: "none" } }}
            required
            data={categoryData ? categoryData.data.map(item => item.title) : []}
            size="md"
            placeholder={t("placeholder.category")}
            maxTags={1}
            // maxDropdownHeight={300}
            onChange={value => form.setFieldValue("category", value)}
            value={form.values.category}
            comboboxProps={{ withinPortal: false }}
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
              placeholder={t("placeholder.description")}
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
            title={t("placeholder.addCoverImage")}
            description={t("placeholder.coverImageDescription")}
          />

          <Button variant="filled" loading={editLoading || postLoading} fullWidth type="submit" radius={"sm"}>
            {!isEdit ? t("button.publish") : t("button.save")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostNewsForm;
