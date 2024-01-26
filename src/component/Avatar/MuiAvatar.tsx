import { Avatar } from "@mui/material";
import { FunctionComponent } from "react";

interface IAvatar {
  src?: string;
}
const MuiAvatar: FunctionComponent<IAvatar> = ({ src }) => {
  return (
    <Avatar sx={{ bgcolor: "#ff5722" }} alt="Remy Sharp" sizes="large" src={src}>
      D
    </Avatar>
  );
};

export default MuiAvatar;
