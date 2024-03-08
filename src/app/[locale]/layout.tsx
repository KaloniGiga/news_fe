import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "../globals.css";
import { PersistGates } from "@/redux/persistGate";
import { Providers } from "@/redux/provider";
import MantineRegistry from "@/utils/MantineProvider";
import ThemeRegistry from "@/utils/ThemeRegistry";
import NextIntlProvider from "@/utils/NextIntlProvider";
import { unstable_setRequestLocale } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL!),
  title: "News Portal",
  description:
    "Embark on a journey with The Doorway Technology, a revolutionary IT company born from a vision to transform the neglected realm of travel, tourism, and hospitality. Our deep teal and subtle gold logo symbolizes balance, endless possibilities, and decades of technological expertise. Discover the essence of our binary code foundation, offering hope and monumental achievements. Join us in navigating the path of technological evolution for travelers, small businesses, and innovators in the hospitality sector. Welcome to The Doorway Technology — a symbol of hope, a door to undiscover hidden possibilities in the world of travel and tourism.",
  openGraph: {
    title: "The Doorway Technology: Pioneering Innovation in Travel, Tourism & Hospitality",
    description:
      "Embark on a journey with The Doorway Technology, a revolutionary IT company born from a vision to transform the neglected realm of travel, tourism, and hospitality. Our deep teal and subtle gold logo symbolizes balance, endless possibilities, and decades of technological expertise. Discover the essence of our binary code foundation, offering hope and monumental achievements. Join us in navigating the path of technological evolution for travelers, small businesses, and innovators in the hospitality sector. Welcome to The Doorway Technology — a symbol of hope, a door to undiscover hidden possibilities in the world of travel and tourism.",
    images: "/opengraph-image.jpg",
  },
  twitter: {
    title: "The Doorway Technology: Pioneering Innovation in Travel, Tourism & Hospitality",
    description:
      "Embark on a journey with The Doorway Technology, a revolutionary IT company born from a vision to transform the neglected realm of travel, tourism, and hospitality. Our deep teal and subtle gold logo symbolizes balance, endless possibilities, and decades of technological expertise. Discover the essence of our binary code foundation, offering hope and monumental achievements. Join us in navigating the path of technological evolution for travelers, small businesses, and innovators in the hospitality sector. Welcome to The Doorway Technology — a symbol of hope, a door to undiscover hidden possibilities in the world of travel and tourism.",
    images: "/twitter-image.jpg",
  },
};

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "np" }];
}

export default function RootLayout(props: Props) {
  const { children, params } = props;
  unstable_setRequestLocale(params.locale);
  return (
    <html lang={params.locale || "en"}>
      <body className={inter.className}>
        <Providers>
          <PersistGates>
            <ThemeRegistry options={{ key: "mui" }}>
              <MantineRegistry>
                <NextIntlProvider params={params}>{children}</NextIntlProvider>
              </MantineRegistry>
            </ThemeRegistry>
          </PersistGates>
        </Providers>
      </body>
    </html>
  );
}
