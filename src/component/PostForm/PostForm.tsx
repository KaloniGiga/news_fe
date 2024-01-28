"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import MyEditor from "../MyEditor/MyEditor";
import { Button, CircularProgress, DialogActions, DialogContent, DialogTitle, FormHelperText } from "@mui/material";
import MuiAvatar from "../Avatar/MuiAvatar";
import InputField from "../ui/MuiTextField/InputField";
import TagsInput from "./TagsInput";
import ShareLink from "./ShareLink";
import PostFormTitle from "./PostFormTitle";
import { FunctionComponent, useEffect } from "react";
import DropzoneComponent from "../ui/FileUpload/MyDropzone";
import { useAddPostMutation, usePutPostMutation } from "@/redux/post/post.api";
import DropzoneComp from "../ui/FileUpload/DropzoneComp";

interface IPostForm {
  handleClose: () => void;
  isEdit: boolean;
  editData: any;
}
const PostForm: FunctionComponent<IPostForm> = ({ isEdit, handleClose, editData }) => {
  const [addPost, { isLoading: postLoading, data: postData }] = useAddPostMutation();
  const [putPost, { isLoading: editLoading, data: editPostData }] = usePutPostMutation();
  const tagArraySchema = z.string();
  const postSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    coverImage: z.any().optional(),
    links: z.string().optional(),
    tags: z.any().optional(),
  });

  type postType = z.infer<typeof postSchema>;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      coverImage: "",
      links: "",
      tags: [],
    },
  });

  const onSubmit: SubmitHandler<postType> = value => {
    console.log(value);
    const formData = new FormData();
    formData.append("file", value.coverImage as string);
    formData.append("title", value.title as string);
    formData.append("description", value.description as string);
    formData.append("links", value.links as string);
    formData.append("tags", JSON.stringify(value.tags));
    if (isEdit) {
      putPost({ postDetails: formData, id: editData.id });
    } else {
      addPost(formData);
    }
  };

  useEffect(() => {
    if (isEdit && editData) {
      setValue("title", editData.title);
      setValue("description", editData.description);
      setValue("links", editData.links);
      setValue(
        "tags",
        editData.tags.map((tag: any) => JSON.parse(tag))
      );
      setValue("coverImage", editData.coverImage);
    }
  }, []);

  return (
    <>
      <DialogTitle sx={{ padding: "0px" }}>
        <PostFormTitle isEdit={isEdit} handleClose={handleClose} />
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ padding: "0px" }}>
          <div className="w-full overflow-y-auto overflow-x-hidden">
            {/* profile */}
            <div className="mt-3 flex gap-x-2 px-4">
              <div className="">
                <MuiAvatar src="/profileuser.jpg" />
              </div>
              <div>
                <h3 className="font-semibold">Dipak kalauni</h3>
                <h5 className="text-[16px]">It&apos;s bio.</h5>
              </div>
            </div>

            <div className="w-full flex flex-col mt-4 px-4">
              <Controller
                name="links"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  return (
                    <>
                      <ShareLink onChange={onChange} value={value} />
                      {error && <FormHelperText error>{error.message}</FormHelperText>}
                    </>
                  );
                }}
              />
            </div>

            <InputField
              name={"title"}
              id={"title"}
              control={control}
              placeholder="New post title here..."
              inputClass="w-full text-[40px] font-bold border-none outline-none mb-4 placeholder:text-[#503c3c] openSans px-4"
            />

            <div className="mb-8 openSans px-4">
              <TagsInput control={control} name="tags" />
            </div>

            <div className="my-4">
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  return (
                    <>
                      <MyEditor onChange={onChange} value={value} placeholder="Write description here..." />
                      {error && <FormHelperText error>{error.message}</FormHelperText>}
                    </>
                  );
                }}
              />
            </div>

            <Controller
              name="coverImage"
              control={control}
              rules={{
                required: "Image is required",
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <DropzoneComp isEdit={isEdit} onChange={onChange} value={value} />
                    {/* <DropzoneComponent isEdit={isEdit} onChange={onChange} value={value} /> */}
                    <FormHelperText error={!!errors["coverImage"]}>{errors["coverImage"]?.message}</FormHelperText>
                  </>
                );
              }}
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ padding: "0px" }}>
          <div className="w-[90%] mx-auto mb-4">
            <Button
              fullWidth
              sx={{ backgroundColor: "#0f0f0f", textTransform: "capitalize", borderRadius: "none" }}
              variant="contained"
              type="submit"
            >
              {(postLoading || editLoading) && <CircularProgress size={18} />}
              {isEdit ? "Save" : "Publish"}
            </Button>
          </div>
        </DialogActions>
      </form>
    </>
  );
};

export default PostForm;
