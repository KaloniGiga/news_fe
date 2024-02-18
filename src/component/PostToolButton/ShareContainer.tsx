"use client";
import { SimpleGrid } from "@mantine/core";
import { usePathname } from "next/navigation";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  ViberShareButton,
  ViberIcon,
  TelegramIcon,
  TelegramShareButton,
  PinterestShareButton,
  PinterestIcon,
  EmailIcon,
  EmailShareButton,
  FacebookShareCount,
} from "react-share";

const ShareContainer = () => {
  const pathname = usePathname();
  const shareUrl = `http://localhostL3001/${pathname}`;
  return (
    <div className="w-full flex justify-center">
      <SimpleGrid>
        <FacebookShareCount url={shareUrl} />
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        {/* <FacebookMessengerShareButton appId="" url={shareUrl}>
            <FacebookMessengerIcon size={40} round={true} />
          </FacebookMessengerShareButton> */}

        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <PinterestShareButton media={"name"} url={shareUrl}>
          <PinterestIcon size={40} round={true} />
        </PinterestShareButton>

        <EmailShareButton url={shareUrl}>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>

        <TelegramShareButton url={shareUrl}>
          <TelegramIcon size={40} round={true} />
        </TelegramShareButton>

        <ViberShareButton url={shareUrl}>
          <ViberIcon size={40} round={true} />
        </ViberShareButton>
      </SimpleGrid>
    </div>
  );
};

export default ShareContainer;
