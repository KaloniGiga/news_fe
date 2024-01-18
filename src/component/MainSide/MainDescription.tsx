import { Avatar } from "@mui/material";

const MainDescription = () => {
  return (
    <div className="w-full flex gap-x-4 pt-8 items-center">
      <div className="rounded-full">
        <Avatar
          sx={{ bgcolor: "#ff5722" }}
          alt="Remy Sharp"
          sizes="large"
          //   src="/broken-image.jpg"
        >
          D
        </Avatar>
      </div>
      <div className="w-[80%] flex flex-col">
        <h3 className="text-[30px] font-bold">Your feed is ready.</h3>
        <h6 className="text-[16px] text-[rgba(0,0,0,0.7)]">
          Now that the recommendations system is up and running, consider reading more articles over the first week to
          help the feed improve.
        </h6>
      </div>
    </div>
  );
};

export default MainDescription;
