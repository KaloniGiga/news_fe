import { FunctionComponent, useState } from "react";
import InputField from "../ui/MuiTextField/InputField";
import { Autocomplete, Chip, Menu, MenuItem, TextField } from "@mui/material";
import { AccountBalance } from "@mui/icons-material";
import { Controller } from "react-hook-form";

interface ITagsInput {
  control: any;
  name: string;
}
const TagsInput: FunctionComponent<ITagsInput> = ({ control, name }) => {
  const top100Films = [
    { title: "#politics", year: 1994 },
    { title: "#entertainment", year: 1972 },
    { title: "#sports", year: 1974 },
    { title: "#business", year: 2008 },
    { title: "#science and technology", year: 1957 },
    { title: "#literature", year: 1993 },
    { title: "#geopolitics", year: 1994 },
    {
      title: "#religion",
      year: 2003,
    },
  ];

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ...props }, fieldState: { error } }) => {
          console.log(value);
          return (
            <Autocomplete
              {...props}
              multiple
              limitTags={4}
              forcePopupIcon={false}
              id="tags-standard"
              value={value ? value : []}
              options={top100Films}
              getOptionLabel={option => (option.title ? option?.title : "")}
              isOptionEqualToValue={(option, value) => option.title === value.title && option.year === value.year}
              renderOption={(props, option, index) => {
                return (
                  <li {...props} key={option.title}>
                    {option.title}
                  </li>
                );
              }}
              renderTags={(tagValue, getTagProps) => {
                return tagValue.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={index} label={option.title} />
                ));
              }}
              onChange={(e, data) => onChange(data)}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="standard"
                  error={!!error}
                  label=""
                  placeholder="Add up to 4 tags..."
                  InputProps={{ ...params.InputProps, disableUnderline: true }}
                  inputProps={{
                    ...params.inputProps,
                    sx: {
                      "&::placeholder": {
                        color: "#171717",
                        fontSize: "18px",
                      },
                    },
                  }}
                />
              )}
            />
          );
        }}
      />
    </>
  );
};

export default TagsInput;
