import { getRequestConfig } from "next-intl/server";

export const supportedLocales = ["en-US", "np-NP"];
export const defaultLocale = "en-US";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./locales/${locale}.json`)).default,
}));
