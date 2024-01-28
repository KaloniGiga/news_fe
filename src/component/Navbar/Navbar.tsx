"use client";
import Image from "next/image";
import MuiButton from "../ui/MuiButton/MuiButton";
import LoginButton from "../Account/LoginButton";
import RegisterButton from "../Account/RegisterButton";
import MuiAvatar from "../Avatar/MuiAvatar";

const Navbar = () => {
  return (
    <div className="w-full h-[10vh] overflow-hidden bg-white border-b-[1px] border-[rgba(0,0,0,0.2)]">
      <div className="w-[80%] mx-auto h-full flex justify-between py-2">
        <div className="w-[20%] h-[10vh]">
          <Image
            src={"/Portal-logo.jpg"}
            alt=""
            width={2000}
            height={2000}
            className="w-full h-full object-contain object-center"
          />
        </div>
        <div className="w-[80%] justify-end flex gap-x-4 items-center">
          {/* <MuiButton label="Login" variant="text" /> */}
          {/* <MuiButton label="Create Account" variant="outlined" /> */}
          <LoginButton />
          <RegisterButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
