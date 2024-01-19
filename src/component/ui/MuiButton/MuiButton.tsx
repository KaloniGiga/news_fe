import { Button, SxProps } from "@mui/material";
import { FunctionComponent } from "react";

interface IButton {
  label: string;
  variant: "outlined" | "text" | "contained";
  sx?: SxProps;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  onClick?: () => void;
}
const MuiButton: FunctionComponent<IButton> = ({ label, variant, sx, size, fullWidth, onClick }) => {
  return (
    <Button fullWidth={fullWidth ? fullWidth : false} sx={sx} variant={variant} onClick={onClick} size={size}>
      {label}
    </Button>
  );
};

export default MuiButton;
