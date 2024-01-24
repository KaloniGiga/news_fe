import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FunctionComponent } from "react";

interface IPostFormTitle {
  handleClose: () => void;
}
const PostFormTitle: FunctionComponent<IPostFormTitle> = ({ handleClose }) => {
  return (
    <div className="w-full flex py-2 border-b-[1px] border-[rgba(0,0,0,0.2)] relative">
      <div className="w-full flex justify-center items-center">
        <h2 className="text-[20px] font-bold">Create Post</h2>
      </div>
      <div className=" absolute right-2 top-0" onClick={handleClose}>
        <IconButton sx={{ fontSize: "39px", backgroundColor: "#E4E6EB" }} fontSize="large" component={Close} />
      </div>
    </div>
  );
};

export default PostFormTitle;
