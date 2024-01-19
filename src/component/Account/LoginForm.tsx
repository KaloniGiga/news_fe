import { TextField } from "@mui/material";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import MuiTextField from "../ui/MuiTextField/MuiTextField";
import MuiInputField from "../ui/MuiTextField/MuiInpuField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import MuiCheck from "../ui/MuiCheck/MuiCheck";

const LoginForm = () => {
  const loginSchema = z.object({
    username: z.string().min(3, { message: "Username is required." }),
    password: z.string().min(8, { message: "Password must be at least 6 characters" }),
    rememberMe: z.boolean(),
  });

  type LoginType = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ resolver: zodResolver(loginSchema) });

  return (
    <div>
      <form>
        <MuiInputField
          fullWidth={true}
          control={control}
          error={errors.username}
          label="Username"
          name="username"
          type="text"
          margin="dense"
        />
        <MuiInputField
          fullWidth={true}
          control={control}
          error={errors.password}
          label="Password"
          name="password"
          type="password"
          margin="dense"
        />
        <div className="w-full flex justify-between items-center px-2 mt-2">
          <MuiCheck name="rememberMe" control={control} label="Remember Me" />
          <Link href={"/"}>Forget Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
