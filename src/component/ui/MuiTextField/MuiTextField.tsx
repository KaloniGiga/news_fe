import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  InputProps,
  TextField,
  TextFieldVariants,
} from "@mui/material";
import { Truculenta } from "next/font/google";
import { FunctionComponent } from "react";
import { Controller, FieldError } from "react-hook-form";

interface IMuiTextField {
  name: string;
  label: string;
  fullWidth?: boolean;
  control: any;
  error: FieldError | undefined;
  id: string;
  type?: string;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  rules?: any;
}
const MuiTextField: FunctionComponent<IMuiTextField> = ({
  name,
  control,
  error,
  id,
  label,
  fullWidth,
  type,
  placeholder,
  autoFocus,
  required,
  rules,
}) => {
  return (
    <FormControl>
      <InputLabel error={!!error}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          return (
            <>
              <Input
                fullWidth={true}
                type={type}
                placeholder={placeholder}
                autoFocus={autoFocus}
                required={required}
                //    variant={"outlined"}
                id={id}
                {...field}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          );
        }}
      />
    </FormControl>
  );
};

export default MuiTextField;
