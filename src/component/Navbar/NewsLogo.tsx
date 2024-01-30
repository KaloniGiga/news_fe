import Image from "next/image";

const NewsLogo = () => {
  return (
    <div className="w-[20%] h-[10vh]">
      <Image
        src={"/newslogo.png"}
        alt=""
        width={2000}
        height={2000}
        className="w-full h-full object-contain object-center"
      />
    </div>
  );
};

export default NewsLogo;
