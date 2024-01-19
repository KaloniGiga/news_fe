import { TextField } from "@mui/material";
import { FunctionComponent } from "react";

interface IAccountForm {
  isLogin?: boolean;
}
const AccountForm: FunctionComponent<IAccountForm> = ({ isLogin = true }) => {
  return (
    <div>
      <form>
        <TextField
          // autoFocus
          required
          margin="dense"
          id="name"
          name="username"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
        />
        <TextField
          margin="dense"
          id="name"
          name="link"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          multiline
        />
        {!isLogin && (
          <TextField
            margin="dense"
            id="name"
            name="link"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            multiline
          />
        )}
      </form>
    </div>
  );
};

export default AccountForm;
