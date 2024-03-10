import UserShareLink from "@/component/UserProfile/UserShareLInk";
import { unstable_setRequestLocale } from "next-intl/server";

export default function UserLink({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  return (
    <div className="pt-44 lg:pt-40 lg:w-[70%] w-[90%] mx-auto">
      <UserShareLink />
    </div>
  );
}
