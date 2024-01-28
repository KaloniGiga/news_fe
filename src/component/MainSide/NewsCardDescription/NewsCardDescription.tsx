import MuiAvatar from "@/component/Avatar/MuiAvatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import NewsCardOption from "./NewsCardOption";
import { FunctionComponent } from "react";
import { EditPostData, PostData } from "@/redux/post/type";

interface INewsCardDesc {
  editData: PostData;
}
const NewsCardDescription: FunctionComponent<INewsCardDesc> = ({ editData }) => {
  return (
    <div className="w-full flex justify-between px-2">
      <div className="w-full flex gap-x-2 items-center">
        <div className="">
          <MuiAvatar src="/profileuser.jpg" />
        </div>
        <div>
          <h3 className="font-medium">Dipak kalauni</h3>
          <h6 className="text-[13px] font-regular">Jan 24( 1 day ago)</h6>
        </div>
      </div>
      <NewsCardOption editData={editData} />
    </div>
  );
};

export default NewsCardDescription;
