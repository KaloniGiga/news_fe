"use client";
import { useLinkPreviewQuery } from "@/redux/post/post.api";
import { LinkPreviewData } from "@/redux/post/type";
import Image from "next/image";
import { FunctionComponent, useEffect, useState } from "react";

interface ILinkPreview {
  url: string;
}
const LinkPreview: FunctionComponent<ILinkPreview> = ({ url }) => {
  const [linkPreviewData, setLinkPreviewData] = useState<LinkPreviewData | null>(null);
  const { data, isLoading } = useLinkPreviewQuery(url);
  useEffect(() => {
    if (data) {
      setLinkPreviewData({
        title: data.title ? data.title : "",
        description: data.description ? data.description : "",
        image: data.image ? data.image : "",
      });
    }
  }, [data]);

  const handleClick = () => {
    window.open(url, "_blank");
  };
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        <h3>{linkPreviewData?.title}</h3>
        <p>{linkPreviewData?.description}</p>
        <div className="w-[300px]">
          {linkPreviewData?.image && (
            <Image
              width={1000}
              height={1000}
              src={linkPreviewData?.image}
              alt="Link Preview"
              className="w-full h-full object-cover object-center"
            />
          )}
        </div>
      </div>
    );
  }
};

export default LinkPreview;
