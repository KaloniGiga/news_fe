import MuiButton from "../ui/MuiButton/MuiButton";
import PostNews from "./PostNews";

const MainTabs = () => {
  return (
    <div className="w-[90%] flex justify-between">
      <div className="w-full flex gap-x-4">
        <MuiButton sx={{ "&:hover": { backgroundColor: "#ffffff" } }} label="Relevent" variant="text" />
        <MuiButton sx={{ "&:hover": { backgroundColor: "#ffffff" } }} label="Latest" variant="text" />
        <MuiButton sx={{ "&:hover": { backgroundColor: "#ffffff" } }} label="Top" variant="text" />
      </div>
      <PostNews />
    </div>
  );
};

export default MainTabs;
