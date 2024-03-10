import AuthForm from "@/component/Account/AuthForm";
import { unstable_setRequestLocale } from "next-intl/server";

const LoginPage = ({ params }: { params: { locale: string } }) => {
  unstable_setRequestLocale(params.locale);
  return (
    <div className="w-full h-screen pt-8 justify-center items-center overflow-x-hidden overflow-y-auto bg-[var(--mantine-color-body)]">
      <AuthForm />
    </div>
  );
};

export default LoginPage;
