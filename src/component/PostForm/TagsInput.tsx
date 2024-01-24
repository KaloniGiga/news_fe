import { FunctionComponent, useState } from "react";
import InputField from "../ui/MuiTextField/InputField";
import { Autocomplete, Menu, MenuItem, TextField } from "@mui/material";
import { AccountBalance } from "@mui/icons-material";

interface ITagsInput {
  control: any;
}
const TagsInput: FunctionComponent<ITagsInput> = ({ control }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      {/* <div className="w-full relative" onClick={handleClick}>
        <InputField name={"title"} id={"title"} control={control} placeholder="Add up to 4 Tags..." inputClass="w-full text-[18px] font-regular border-none outline-none my-4 placeholder:text-[rgba(0,0,0,0.6)]" />   
       </div>
        <Menu
        sx={{maxWidth: "45vw"}}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
         <div className="w-[95%] mx-auto border-b-[1px] border-[rgba(0,0,0,0.1)]">
            <h2 className="w-full py-4 text-[20px] font-bold">Top Tags</h2>
         </div>
        <MenuItem onClick={handleClose}>
           <div>
             <h2>#webdev</h2> 
             <h2>Because the internet...</h2>
           </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <div>
             <h2 className="font-semibold">#javascript</h2> 
             <h2 className="break-words">Once relegated to the browser as one of the 3 core technologies of the web. Javascript can be found almost anywhere you find code.</h2>
           </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <div>
             <h2>#javascript</h2> 
             <h2>Once relegated to the browser as one of the 3 core technologies of the web. Javascript can be found almost anywhere you find code.</h2>
           </div>
        </MenuItem>
      </Menu> */}

      <Autocomplete
        multiple
        id="tags-standard"
        options={top100Films}
        getOptionLabel={option => option?.title}
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            label=""
            placeholder="Add tags"
            sx={{
              outline: "none",
              "& fieldset": { border: "none" },
            }}
            // InputProps={{
            // //   disableUnderline: false,
            // }}
          />
        )}
      />
    </>
  );
};

export default TagsInput;
