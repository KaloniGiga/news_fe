/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetLinkPreviewQuery } from "@/redux/link-preview/link-preview.api";
import { LinkPreviewData } from "@/redux/post/type";
import { CircularProgress } from "@mui/material";
import { BeatLoader } from "react-spinners";
import { FunctionComponent, useEffect, useState } from "react";
import { Card, Group, Image } from "@mantine/core";

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
    <div className="px-4 w-full flex justify-center items-center">
      <BeatLoader size={12} color="#36d7b7" />
    </div>
  ) : url ? (
    linkPreviewData ? (
      <Card withBorder onClick={handleClick} className="w-full flex">
        <Group justify="space-between">
          <div className="w-[70%] p-2">
            <h3 className="text-[20px] font-semibold">{linkPreviewData?.title}</h3>
            <p className="text-[16px] font-regular mb-2">{linkPreviewData?.description}</p>
          </div>
          <div className="w-[25%] flex justify-center items-center">
            {linkPreviewData?.image && (
              <Image
                width={1000}
                height={1000}
                src={linkPreviewData?.image}
                alt="Link Preview"
                fallbackSrc="/loginnewspaper.jpg"
                fit="cover"
              />
            )}
          </div>
        </Group>
      </Card>
    ) : (
      <div>{/* <BeatLoader size={12} color="#36d7b7" /> */}</div>
    )
  ) : (
    <div></div>
  );
};

export default LinkPreview;
