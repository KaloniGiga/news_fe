"use client";
import Image from "next/image";
import { FunctionComponent } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ReplyIcon from "@mui/icons-material/Reply";
import { Button } from "@mui/material";
import MuiAvatar from "../Avatar/MuiAvatar";
import NewsCardDescription from "./NewsCardDescription/NewsCardDescription";

interface INewsCard {
  id?: number;
  title: string;
  description: string;
  tags: any[];
  coverImage: string;
  links: string;
}

const NewsCard: FunctionComponent<INewsCard> = ({ id, title, description, coverImage, tags, links }) => {
  return (
    <div className="w-[80%] h-[400px] flex flex-col gap-y-4 px-4 py-4 bg-[#ffffff] rounded-xl border-[1px]">
      {/* post user */}
      <NewsCardDescription editData={{ id, title, description, coverImage, tags, links }} />
      {/* post description */}
      <div className="w-full flex flex-col gap-y-2">
        <h3 className="text-[30px] font-semibold">{title}</h3>
        <h4 className="text-[16px] font-regular">{description}</h4>
      </div>
      {/* post image */}
      <div className="h-[80%] rounded-lg overflow-hidden">
        {/* <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/coverImage/${coverImage}`}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full object-cover object-center"
        /> */}
      </div>
      <div className="px-2 py-1 flex justify-around">
        <Button startIcon={<ThumbUpIcon fontSize="medium" />}>2</Button>
        <Button startIcon={<CommentIcon fontSize="medium" />}>4</Button>
        <Button startIcon={<ReplyIcon fontSize="medium" />}></Button>
      </div>
    </div>
  );
};

export default NewsCard;
