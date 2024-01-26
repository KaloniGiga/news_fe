import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FunctionComponent } from "react";

interface IPostFormTitle {
  handleClose: () => void;
  isEdit: boolean;
}
const PostFormTitle: FunctionComponent<IPostFormTitle> = ({ handleClose, isEdit }) => {
  return (
    <div className="w-full flex py-4 border-b-[1px] border-[rgba(0,0,0,0.2)] relative">
      <div className="w-full flex justify-center items-center">
        <h2 className="text-[20px] font-bold">{isEdit ? "Edit post" : "Create post"}</h2>
      </div>
      <div className=" absolute right-2 top-2" onClick={handleClose}>
        <IconButton sx={{ fontSize: "39px" }} fontSize="large" component={Close} />
      </div>
    </div>
  );
};

export default PostFormTitle;
