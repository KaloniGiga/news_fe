import createMiddleware from "next-intl/middleware";
import { defaultLocale, supportedLocales } from "./src/utils/i18n";

export default createMiddleware({
  locales: supportedLocales,
  defaultLocale,
});

export const config = {
  matcher: ["/", "/(en-US|ne-NP)/:path*"],
};
