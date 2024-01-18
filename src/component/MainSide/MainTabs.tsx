import MuiButton from "../ui/MuiButton/MuiButton";

const MainTabs = () => {
  return (
    <div className="w-[90%] flex justify-between">
      <div className="w-full flex gap-x-4">
        <MuiButton label="Relevent" variant="text" />
        <MuiButton label="Latest" variant="text" />
        <MuiButton label="Top" variant="text" />
      </div>
      <div className="w-full flex justify-end">
        <MuiButton label="Post News" variant="outlined" />
      </div>
    </div>
  );
};

export default MainTabs;
