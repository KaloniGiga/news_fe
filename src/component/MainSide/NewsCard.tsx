import Image from "next/image";
import { FunctionComponent } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ReplyIcon from "@mui/icons-material/Reply";
import { Button } from "@mui/material";

interface INewsCard {
  title: string;
  image: string;
}

const NewsCard: FunctionComponent<INewsCard> = ({ title, image }) => {
  return (
    <div className="w-[30%] flex flex-col gap-y-4 px-4 py-4 bg-[#ffffff] rounded-xl border-[1px]">
      <h3 className="text-[18px] font-semibold">{title}</h3>
      <div className="h-[50%] rounded-lg overflow-hidden">
        <Image src={image} alt="" width={1000} height={1000} className="w-full h-full object-cover object-center" />
      </div>
      <div className="px-2 py-3 flex justify-around">
        <Button startIcon={<ThumbUpIcon fontSize="medium" />}>2</Button>
        <Button startIcon={<CommentIcon fontSize="medium" />}>4</Button>
        <Button startIcon={<ReplyIcon fontSize="medium" />}></Button>
      </div>
    </div>
  );
};

export default NewsCard;
