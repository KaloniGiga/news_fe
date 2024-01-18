import { Button, SxProps } from "@mui/material";
import { FunctionComponent } from "react";

interface IButton {
  label: string;
  variant: "outlined" | "text" | "contained";
  sx?: SxProps;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}
const MuiButton: FunctionComponent<IButton> = ({ label, variant, sx, size, fullWidth }) => {
  return (
    <Button fullWidth={fullWidth ? fullWidth : false} sx={sx} variant={variant} size={size}>
      {label}
    </Button>
  );
};

export default MuiButton;
