import createMiddleware from "next-intl/middleware";
import { defaultLocale, supportedLocales } from "./i18n";

export default createMiddleware({
  locales: supportedLocales,
  defaultLocale,
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
