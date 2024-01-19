import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { FunctionComponent } from "react";
import { Controller } from "react-hook-form";

interface IMuiCheck {
  name: string;
  control: any;
  label: string;
}
const MuiCheck: FunctionComponent<IMuiCheck> = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return <FormControlLabel {...field} label={label} control={<Checkbox />} />;
      }}
    />
  );
};

export default MuiCheck;
