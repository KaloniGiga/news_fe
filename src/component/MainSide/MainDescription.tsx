import { Avatar } from "@mui/material";
import MuiAvatar from "../Avatar/MuiAvatar";
import Image from "next/image";
import { Button, Group } from "@mantine/core";

const MainDescription = () => {
  return (
    <div className="w-[70%] flex flex-col items-center mt-4 mb-2">
      <div className="h-[400px] w-full">
        <Image
          src={"/homeimage.avif"}
          alt=""
          width={2000}
          height={2000}
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* <div className="w-[80%] mx-auto flex flex-col mt-4 rounded-md bg-white">
      <div className="w-full flex gap-x-4 items-center px-4 py-4 mt-2">
        <div className="">
          <MuiAvatar src="/profileuser.jpg" />
        </div>
        <div className="w-full">
         <Button fullWidth variant="light" radius={"xl"} px={"xl"} size="md">Want to share news?</Button>
        </div>
      </div>
      
      <Button.Group>
         <Button fullWidth variant="default">Relevant</Button>
         <Button fullWidth variant="default">Trending</Button>
         <Button fullWidth variant="default">Top</Button>
      </Button.Group>
      </div> */}
    </div>
  );
};

export default MainDescription;
