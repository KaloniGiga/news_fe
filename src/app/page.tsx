import LeftSide from "@/component/LeftSide/LeftSide";
import MainSide from "@/component/MainSide/MainSide";
import Navbar from "@/component/Navbar/Navbar";

export default function Home() {
  return (
    <div className="w-screen h-full bg-[#F5F5F5]">
      <Navbar />
      <div className="w-full flex px-4 py-4 gap-x-4">
        <div className="w-[25%]">
          <LeftSide />
        </div>
        <div className="w-[50%]">
          <MainSide />
        </div>
        <div className="w-[25%]"></div>
      </div>
    </div>
  );
}
