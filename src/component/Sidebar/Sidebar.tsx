"use client";
import { useDisclosure } from "@mantine/hooks";
import { Button, Code, Group } from "@mantine/core";
import { useState } from "react";
import NewsLogo from "../Navbar/NewsLogo";
import { ContactSupportOutlined, Home, PersonOffOutlined, Settings, TagOutlined } from "@mui/icons-material";
import MuiAvatar from "../Avatar/MuiAvatar";
import PostEditNewsDialog from "../MainSide/PostNews/PostEditNewsDialog";
import PostNewsModel from "../MainSide/PostNews/PostNewsModel";

const data = [
  { link: "", label: "Home", icon: Home },
  { link: "", label: "About us", icon: PersonOffOutlined },
  { link: "", label: "Tags", icon: TagOutlined },
  { link: "", label: "Contact", icon: ContactSupportOutlined },
  { link: "", label: "Settings", icon: Settings },
];

const Sidebar = () => {
  const [active, setActive] = useState<string>("Home");
  const [opened, { open, close }] = useDisclosure(false);
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const links = data.map(item => (
    <a
      className={`flex items-center gap-2 my-2 text-md font-medium p-3 rounded-sm no-underline ${item.label == active ? "bg-white hover:bg-white" : "bg-transparent hover:bg-white"}`}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={event => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon />
      <span>{item.label}</span>
    </a>
  ));
  return (
    <nav className="h-screen w-full p-4 flex flex-col border-b-[1px] border-r-[1px] border-[rgba(0,0,0,0.1)]">
      <div className="flex-1">
        <Group className={"pb-2"} justify="space-between">
          <div className="w-full flex gap-x-4 items-center px-4 py-4 mt-2">
            <div className="">
              <MuiAvatar src="/profileuser.jpg" />
            </div>
            <div className="w-full">
              <Button onClick={open} fullWidth variant="light" radius={"xl"} px={"xl"} size="md">
                Want to share news?
              </Button>
              <PostNewsModel isEdit={false} open={open} close={close} opened={opened} />
              {/* <PostEditNewsDialog isEdit={false} handleClose={handleClose} open={open} /> */}
            </div>
          </div>
        </Group>
        {links}
      </div>
    </nav>
  );
};

export default Sidebar;
