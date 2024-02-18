"use client";
import { Button, Card, Modal, SimpleGrid, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import { BsShare } from "react-icons/bs";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  InstapaperShareButton,
  InstapaperIcon,
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

const ShareButton = () => {
  const theme = useMantineTheme();
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();
  const shareUrl = `http://localhost:3001/${pathname}`;

  return (
    <>
      <Button
        onClick={toggle}
        color="gray"
        variant="subtle"
        leftSection={<BsShare size={20} color={theme.colors.blue[6]} />}
      >
        Share
      </Button>

      <Modal
        radius={"md"}
        p={"md"}
        styles={{ title: { color: "var(--mantine-color-text)" } }}
        opened={opened}
        onClose={close}
        withCloseButton={true}
        title="Share this post"
        centered
      >
        {/* <Card p={"md"} withBorder> */}
        <SimpleGrid cols={4}>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={60} round={true} />
          </FacebookShareButton>

          <FacebookMessengerShareButton appId="" url={shareUrl}>
            <FacebookMessengerIcon size={60} round={true} />
          </FacebookMessengerShareButton>

          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={60} round={true} />
          </WhatsappShareButton>

          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={60} round={true} />
          </TwitterShareButton>

          <PinterestShareButton media={"name"} url={shareUrl}>
            <PinterestIcon size={60} round={true} />
          </PinterestShareButton>

          <EmailShareButton url={shareUrl}>
            <EmailIcon size={60} round={true} />
          </EmailShareButton>

          <TelegramShareButton url={shareUrl}>
            <TelegramIcon size={60} round={true} />
          </TelegramShareButton>

          <ViberShareButton url={shareUrl}>
            <ViberIcon size={60} round={true} />
          </ViberShareButton>
        </SimpleGrid>
        {/* </Card> */}
      </Modal>
    </>
  );
};

export default ShareButton;
