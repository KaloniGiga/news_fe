import { Avatar } from "@mui/material";
import MuiAvatar from "../Avatar/MuiAvatar";
import Image from "next/image";

const MainDescription = () => {
  return (
    <div className="w-[80%] flex flex-col items-center mt-8 mb-4">
      <div className="h-[400px] w-full">
        <Image
          src={"/dailv.webp"}
          alt=""
          width={2000}
          height={2000}
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* <div className="flex gap-x-4 pt-8 items-start">
      <div className="rounded-full">
        <MuiAvatar src="/profileuser1.jpg" />
      </div>
      <div className="w-[80%] flex flex-col">
        <h3 className="text-[30px] font-bold">Your feed is ready.</h3>
        <h6 className="text-[16px] text-[rgba(0,0,0,0.7)]">
          Now that the recommendations system is up and running, consider reading more articles over the first week to
          help the feed improve.
        </h6>
      </div>
      </div> */}
    </div>
  );
};

export default MainDescription;
