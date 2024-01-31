import { GetPostData } from "@/redux/post/type";
import { ActionIcon, Button, Group, Text } from "@mantine/core";
import { Share, ThumbUpAltOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FeedPostDescription from "@/component/FeedContainer/FeedPostDesc";
import { FaShare } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";

interface IFeedCard {
  feedData: GetPostData;
}

const FeedPost: FunctionComponent<IFeedCard> = ({ feedData }) => {
  return (
    <div className="group text-mantineText flex flex-col gap-y-4 p-4 rounded-lg border-[rgba(0,0,0,0.1)] border-[1px] hover:border-[1px] hover:border-[rgba(0,0,0,0.2)]">
      {/* post description */}
      <FeedPostDescription feedData={feedData} />
      <Link target="blank" href={feedData.links}>
        <div className="w-full flex flex-col px-2">
          <h3 className="text-[20px] font-bold line-clamp-2 cursor-pointer">{feedData.title}</h3>
          <h4 className="text-[14px] font-medium mt-2">{`Jan 24(1 day ago)`}</h4>
        </div>
      </Link>
      {/* post image */}
      <div className="h-[170px] overflow-hidden rounded-lg">
        <Image
          src={
            feedData.coverImage && feedData.coverImage.includes("https")
              ? feedData.coverImage
              : `${process.env.NEXT_PUBLIC_SERVER_URL}/coverImage/${feedData.coverImage}`
          }
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="px-2 flex justify-around">
        <Group>
          <ActionIcon styles={{ root: { border: "none" } }} variant="outline">
            <BiUpvote color="var(--mantine-color-text)" size={22} />
          </ActionIcon>
          <Text fw={700}>20</Text>
        </Group>
        <Group>
          <ActionIcon styles={{ root: { border: "none" } }} variant="outline">
            <FaRegComment color="var(--mantine-color-text)" size={22} />
          </ActionIcon>
          <Text fw={700}>8</Text>
        </Group>
        <Group>
          <ActionIcon styles={{ root: { border: "none" } }} variant="outline">
            <PiShareFatLight color="var(--mantine-color-text)" size={24} />
          </ActionIcon>
          <Text fw={700}>2</Text>
        </Group>
      </div>
    </div>
  );
};

export default FeedPost;
