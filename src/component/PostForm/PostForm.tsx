import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MuiButton from "../ui/MuiButton/MuiButton";
import { Close } from "@mui/icons-material";
import MyEditor from "../MyEditor/MyEditor";
import { Divider, IconButton } from "@mui/material";
import MuiAvatar from "../Avatar/MuiAvatar";
import MuiInputField from "../ui/MuiTextField/MuiInpuField";
import InputField from "../ui/MuiTextField/InputField";
import MuiAutoComplete from "../ui/MuiTextField/MuiAutoComplete";
import TagsInput from "./TagsInput";
import ShareLink from "./ShareLink";

const PostForm = () => {
  const postSchema = z.object({
    title: z.string().min(3, { message: "Title is required." }).optional(),
    description: z.string().min(8, { message: "Description is required." }).optional(),
    coverImage: z.string().optional(),
    links: z.string().url().optional(),
  });

  type postType = z.infer<typeof postSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(postSchema) });
  return (
    <div className="w-full overflow-y-auto">
      {/* profile */}
      <div className="mt-2 flex gap-x-2">
        <div className="">
          <MuiAvatar />
        </div>
        <div>
          <h3 className="font-bold">Dipak kalauni</h3>
          <h5 className="">It&apos;s bio.</h5>
        </div>
      </div>

      {/* form */}
      <form>
        <div className="w-full my-4">
          <MuiButton label="Add a Cover Image" variant="outlined" />
        </div>

        <InputField
          name={"title"}
          id={"title"}
          control={control}
          placeholder="New post title here..."
          inputClass="w-full text-[40px] font-bold border-none outline-none my-2 placeholder:text-black"
        />
        <TagsInput control={control} />
        {/* <InputField name={"tags"} id="tags" control={control} placeholder="Add up to 4 tags..." inputClass="w-full text-[18px] font-medium border-none outline-none mb-2 placeholder:text-[rgba(0,0,0,0.8)]" /> */}
        <div className="my-4">
          <MyEditor placeholder="Write description here..." />
        </div>
        <Divider>OR</Divider>
        <div className="w-full flex flex-col my-4">
          <ShareLink />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
