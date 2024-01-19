import { TextField } from "@mui/material";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import MuiTextField from "../ui/MuiTextField/MuiTextField";
import MuiInputField from "../ui/MuiTextField/MuiInpuField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MuiCheck from "../ui/MuiCheck/MuiCheck";

const RegisterForm: FunctionComponent = () => {
  const registerSchema = z
    .object({
      username: z.string().min(3, { message: "Username is required." }),
      password: z.string().min(8, { message: "Password must be at least 6 characters" }),
      confirmPassword: z.string().min(8, { message: "Confirm password is required." }),
      terms: z.literal(true, { errorMap: () => ({ message: "You must accept terms and condition" }) }),
    })
    .refine(data => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Password don't match.",
    });

  type RegisterType = z.infer<typeof registerSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({ resolver: zodResolver(registerSchema) });

  return (
    <form>
      <MuiInputField
        fullWidth={true}
        control={control}
        error={errors.username}
        label="Username"
        name="username"
        type="text"
        margin="dense"
        size="medium"
      />
      <MuiInputField
        fullWidth={true}
        control={control}
        error={errors.password}
        label="Password"
        name="password"
        type="password"
        margin="dense"
        size="medium"
      />
      <MuiInputField
        fullWidth={true}
        control={control}
        error={errors.password}
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        margin="dense"
        size="medium"
      />
      <MuiCheck name={"terms"} control={control} label="I agree to terms and condition." />
    </form>
  );
};

export default RegisterForm;
