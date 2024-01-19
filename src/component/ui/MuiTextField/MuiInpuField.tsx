import { FormControl, FormHelperText, TextField, TextFieldVariants } from "@mui/material";
import { FunctionComponent } from "react";
import { Controller, FieldError } from "react-hook-form";

interface IMuiInputField {
  name: string;
  label: string;
  fullWidth?: boolean;
  control: any;
  error: FieldError | undefined;
  type?: string;
  placeholder?: string;
  variant?: TextFieldVariants | undefined;
  autoFocus?: boolean;
  required?: boolean;
  margin?: "dense" | "normal" | "none" | undefined;
  rules?: any;
  size?: "small" | "medium";
}

const MuiInputField: FunctionComponent<IMuiInputField> = ({
  margin,
  name,
  control,
  error,
  label,
  fullWidth,
  type,
  autoFocus,
  required,
  variant,
  rules,
  size,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        return (
          <>
            <TextField
              {...field}
              autoFocus={autoFocus}
              required={required}
              margin={margin}
              name={name}
              label={label}
              type={type}
              fullWidth={fullWidth}
              variant={variant}
              error={!!error}
              size={size}
            />
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        );
      }}
    />
  );
};

export default MuiInputField;
