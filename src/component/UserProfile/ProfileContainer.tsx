import { Card } from "@mantine/core";
import ProfileHeader from "./ProfileHeader";

const ProfileContainer = () => {
  return (
    <div className="w-full relative toggleBodyColor">
      <div className="w-full bg-[url('/homeimage.avif')] bg-cover bg-center h-[30vh]"></div>
      <div className="lg:w-[70%] w-[90%] absolute top-[10vh] left-[5%] lg:left-[15%] z-40">
        <ProfileHeader />
      </div>
    </div>
  );
};

export default ProfileContainer;
