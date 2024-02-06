import AuthForm from "@/component/Account/AuthForm";
import UserLoginForm from "@/component/Account/UserAuthenticationForm";

const AuthPage = () => {
  return (
    <div className="w-full min-h-screen text-[var(--mantine-color-text)]">
      <UserLoginForm />
    </div>
  );
};

export default AuthPage;
