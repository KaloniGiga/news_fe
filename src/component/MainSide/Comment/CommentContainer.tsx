import MuiAvatar from "@/component/Avatar/MuiAvatar";

const CommentContainer = () => {
  return (
    <div className="w-full px-2 py-2 flex flex-col">
      <div className="w-full flex gap-x-2">
        <div>
          <MuiAvatar src="/profileuser.jpg" />
        </div>
        <div className="flex flex-col gap-y-2 px-4 py-4 rounded-md bg-[#F1F1F1]">
          <h2 className="flex gap-x-2 items-center">
            <span className="font-semibold">Brain G.</span>
            <span className="font-regular text-sm">4 hours ago</span>
          </h2>
          <h4 className="text-sm line-clamp-3">
            Hiring managers and interview panelists don&apos;t spend more than a couple minutes looking at a portfolio.
            Two reasons: 1) They don&apos;t have much time to evaluate you or your projects, and 2) most portfolios look
            the same (short bio, a few stock photos, links to some clone sites).
          </h4>
          <h6 className="text-md font-semibold cursor-pointer text-sm">See more</h6>
        </div>
      </div>
      <div className="w-full my-2 ml-[10%]">
        <h3 className="font-semibold text-sm cursor-pointer">See All Comment</h3>
      </div>
    </div>
  );
};

export default CommentContainer;
