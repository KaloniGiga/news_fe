import MuiButton from "../ui/MuiButton/MuiButton";

const MainTabs = () => {
  return (
    <div className="w-full flex gap-x-4">
      <MuiButton label="Relevent" variant="text" />
      <MuiButton label="Latest" variant="text" />
      <MuiButton label="Top" variant="text" />
    </div>
  );
};

export default MainTabs;
