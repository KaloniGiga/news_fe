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

interface IInputField {
  name: string;
  label?: string;
  fullWidth?: boolean;
  control: any;
  error?: FieldError | undefined;
  id: string;
  type?: string;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  rules?: any;
  inputClass?: string;
}
const InputField: FunctionComponent<IInputField> = ({
  name,
  control,
  error,
  id,
  type,
  placeholder,
  autoFocus,
  required,
  rules,
  inputClass,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        return (
          <>
            <input
              className={inputClass}
              type={type}
              placeholder={placeholder}
              autoFocus={autoFocus}
              required={required}
              id={id}
              {...field}
            />
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        );
      }}
    />
  );
};

export default InputField;
