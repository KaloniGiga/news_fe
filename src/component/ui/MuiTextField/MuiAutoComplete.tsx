import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import InputField from "./InputField";

interface IAutoComplete {
  control: any;
}
const MuiAutoComplete: React.FunctionComponent<IAutoComplete> = ({ control }) => {
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={top100Films}
      getOptionLabel={option => option.title}
      //   defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
      renderInput={params => (
        <InputField
          {...params}
          name={"tags"}
          id="tags"
          control={control}
          placeholder="Add up to 4 tags..."
          inputClass="w-full text-[16px] font-regular border-none outline-none my-4 placeholder:text-[rgba(0,0,0,0.6)]"
        />
        // <TextField {...params} label="limitTags" placeholder="Favorites" />
      )}
      sx={{ width: "500px" }}
    />
  );
};

export default MuiAutoComplete;
