import MuiButton from "../ui/MuiButton/MuiButton";

const RightSide = () => {
  return (
    <div className="w-full px-2 py-4 rounded-xl bg-white flex flex-col gap-y-2">
      <div className="px-2 py-2 border-b-[1px] border-b-[rgba(0,0,0,0.1)]">
        <h3 className="text-bold text-[20px]">#popularnews</h3>
        <h5 className="text-[rgba(0,0,0,0.2)] text-[16px]">News threads targeting the whole community.</h5>
      </div>

      <div className="px-2 py-2 border-b-[1px] border-b-[rgba(0,0,0,0.1)]">
        <h3 className="text-[rgba(0,0,0,0.2)] text-[16px]">Meme Monday</h3>
        <h6 className="text-[rgba(0,0,0,0.2)] text-[16px]">97 comments</h6>
      </div>
    </div>
  );
};

export default RightSide;
