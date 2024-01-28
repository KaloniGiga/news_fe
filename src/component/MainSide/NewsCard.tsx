"use client";
import Image from "next/image";
import { FunctionComponent } from "react";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NewsCardDescription from "./NewsCardDescription/NewsCardDescription";
import { Button } from "@mui/material";
import { ThumbUpAltOutlined } from "@mui/icons-material";
import MuiAvatar from "../Avatar/MuiAvatar";
import CommentContainer from "./Comment/CommentContainer";

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
    <div className="w-full flex flex-col gap-y-4 py-4 bg-[#ffffff] rounded-lg border-[1px]">
      {/* post user */}
      <NewsCardDescription editData={{ id, title, description, coverImage, tags, links }} />
      {/* post description */}
      <div className="w-full flex flex-col px-2">
        <h3 className="text-[30px] font-bold line-clamp-2 hover:text-blue-500 cursor-pointer">{title}</h3>
        {/* <h4 className="text-[16px] font-regular line-clamp-2">{description}</h4> */}
      </div>
      <div className="w-full px-2 flex gap-x-2">
        {tags &&
          tags.length > 0 &&
          tags.map((item, index) => {
            return <p key={index} className="text-[rgba(0,0,0,0.5)] hover:text-blue-400 cursor-pointer">{`${item}`}</p>;
          })}
      </div>
      {/* post image */}
      <div className="h-[300px] overflow-hidden">
        <Image
          src={`${coverImage}`}
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="px-2 flex justify-around">
        <Button variant="text" fullWidth startIcon={<ThumbUpAltOutlined sx={{ color: "rgba(0,0,0,0.6)" }} />}>
          2 upvote
        </Button>
        <Button
          variant="text"
          fullWidth
          startIcon={<ChatBubbleOutlineOutlinedIcon sx={{ color: "rgba(0,0,0,0.6)" }} />}
        >
          4 Comment
        </Button>
      </div>
      <CommentContainer />
    </div>
  );
};

export default NewsCard;
