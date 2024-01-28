import LeftSide from "@/component/LeftSide/LeftSide";
import MainSide from "@/component/MainSide/MainSide";
import Header from "@/component/Navbar/Header";
import Navbar from "@/component/Navbar/Navbar";
import Sidebar from "@/component/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="w-screen h-full bg-[#F5F5F5]">
      {/* <Navbar /> */}
      <Header />
      <div className="w-full flex justify-around px-4 gap-x-4">
        <div className="w-[25%]">
          {/* <LeftSide /> */}
          <Sidebar />
        </div>
        <div className="w-[70%]">
          <MainSide />
        </div>
        {/* <div className="w-[25%]"></div> */}
      </div>
    </div>
  );
}
