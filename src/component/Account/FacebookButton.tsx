import { Button, ButtonProps } from "@mantine/core";
import FacebookIcon from "@mui/icons-material/Facebook";

export function FacebookButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return <Button leftSection={<FacebookIcon sx={{ color: "#1976D2" }} />} variant="default" {...props} />;
}
