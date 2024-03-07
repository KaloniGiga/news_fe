import createMiddleware from "next-intl/middleware";
import { pathnames, locales, localePrefix } from "./config";

export default createMiddleware({
  locales,
  defaultLocale: "en",
  pathnames,
  localePrefix,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
