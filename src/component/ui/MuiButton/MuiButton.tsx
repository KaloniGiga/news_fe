import { Button, SxProps } from "@mui/material";
import { FunctionComponent } from "react";

interface IButton {
  label: string;
  variant: "outlined" | "text" | "contained";
  sx?: SxProps;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}
const MuiButton: FunctionComponent<IButton> = ({ type, label, variant, sx, size, fullWidth, onClick }) => {
  return (
    <Button
      type={type}
      fullWidth={fullWidth ? fullWidth : false}
      sx={sx}
      variant={variant}
      onClick={onClick}
      size={size}
    >
      {label}
    </Button>
  );
};

export default MuiButton;
