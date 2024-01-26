"use client";
import { useGetLinkPreviewQuery } from "@/redux/link-preview/link-preview.api";
import { LinkPreviewData } from "@/redux/post/type";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { FunctionComponent, useEffect, useState } from "react";

interface ILinkPreview {
  url: string;
}
const LinkPreview: FunctionComponent<ILinkPreview> = ({ url }) => {
  const [linkPreviewData, setLinkPreviewData] = useState<LinkPreviewData | null>(null);
  const { data, isLoading } = useGetLinkPreviewQuery(url);
  useEffect(() => {
    if (data && data.data) {
      setLinkPreviewData({
        title: data.data.title ? data.data.title : "",
        description: data.data.description ? data.data.description : "",
        image: data.data.image ? data.data.image : "",
      });
    } else {
      setLinkPreviewData(null);
    }
  }, [data]);

  const handleClick = () => {
    window.open(url, "_blank");
  };

  return url && isLoading ? (
    <div className="p-4 w-full flex justify-center items-center">
      <BeatLoader size={12} color="#36d7b7" />
    </div>
  ) : url ? (
    linkPreviewData ? (
      <div
        onClick={handleClick}
        className="w-full flex border-[1px] border-[rgba(0,0,0,0.1)] mt-2 rounded-xl cursor-pointer bg-[#fff5f5]"
      >
        <div className="w-[70%] p-2">
          <h3 className="text-[20px] font-semibold">{linkPreviewData?.title}</h3>
          <p className="text-[16px] font-regular mb-2">{linkPreviewData?.description}</p>
        </div>
        <div className="w-[25%] flex justify-center items-center">
          {linkPreviewData?.image && (
            <img
              width={1000}
              height={1000}
              src={linkPreviewData?.image}
              alt="Link Preview"
              className="w-full h-full object-cover object-center"
            />
          )}
        </div>
      </div>
    ) : (
      <div>{/* <BeatLoader size={12} color="#36d7b7" /> */}</div>
    )
  ) : (
    <div></div>
  );
};

export default LinkPreview;
