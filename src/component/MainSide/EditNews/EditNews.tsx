"use client";
import { FunctionComponent } from "react";
// import PostEditNewsDialog from "../PostNews/PostEditNewsDialog";
import { GetPostData } from "@/redux/post/type";

interface IEditNews {
  editData: GetPostData;
}
const EditNews: FunctionComponent<IEditNews> = ({ editData }) => {
  // const [opened, { open, close }] = useDisclosure(false);
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      <div className="flex">Edit</div>
      {/* <PostNewsModel editData={editData} isEdit={false} open={open} close={close} opened={opened} /> */}
      {/* <PostEditNewsDialog editData={editData} isEdit={true} handleClose={handleClose} open={open} /> */}
    </>
  );
};

export default EditNews;
