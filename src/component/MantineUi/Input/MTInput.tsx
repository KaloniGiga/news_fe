"use client";
import { Input, TextInput } from "@mantine/core";
import { FunctionComponent } from "react";

interface IMTInput {
  label: string;
  placeholder: string;
  error: string;
  onChange: (e: any) => void;
  value: string;
}
const MTInput: FunctionComponent<IMTInput> = ({ label, placeholder, error, onChange, value }) => {
  return <TextInput label={label} placeholder={placeholder} error={error} onChange={onChange} value={value} />;
};

export default MTInput;
