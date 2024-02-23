import Image from "next/image";
import Link from "next/link";

const NewsLogo = () => {
  return (
    <div className="lg:w-[20%] h-[10vh]">
      <Link href={"/"}>
        <Image
          src={"/newslogo.png"}
          alt=""
          width={2000}
          height={2000}
          className="w-full h-full object-contain object-center"
        />
      </Link>
    </div>
  );
};

export default NewsLogo;
