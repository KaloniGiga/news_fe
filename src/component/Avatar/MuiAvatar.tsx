import { Avatar, SxProps, Theme } from "@mui/material";
import { FunctionComponent } from "react";

interface IAvatar {
  src?: string;
  name?: string;
  size?: string;
  sx?: SxProps<Theme>;
}
const MuiAvatar: FunctionComponent<IAvatar> = ({ sx, src, name, size }) => {
  return (
    <Avatar sx={sx} alt="Remy Sharp" sizes={size ? size : "large"} src={src}>
      {name}
    </Avatar>
  );
};

export default MuiAvatar;
