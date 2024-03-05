import AuthForm from "@/component/Account/AuthForm";
import UserLoginForm from "@/component/Account/UserAuthenticationForm";

const LoginPage = () => {
  return (
    <div className="w-full h-screen pt-8 justify-center items-center overflow-x-hidden overflow-y-auto bg-[var(--mantine-color-body)]">
      <AuthForm />
    </div>
  );
};

export default LoginPage;
