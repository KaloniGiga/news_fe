"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import ThemeRegistry from "@/utils/ThemeRegistry";
import theme from "@/utils/theme";
import { Providers } from "@/redux/provider";
import { PersistGates } from "@/redux/persistGate";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/tiptap/styles.css";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   // metadataBase: new URL(process.env.NEXT_PUBLIC_S3_URL!),
//   title: "The Doorway Technology: Pioneering Innovation in Travel, Tourism & Hospitality",
//   description:
//     "Embark on a journey with The Doorway Technology, a revolutionary IT company born from a vision to transform the neglected realm of travel, tourism, and hospitality. Our deep teal and subtle gold logo symbolizes balance, endless possibilities, and decades of technological expertise. Discover the essence of our binary code foundation, offering hope and monumental achievements. Join us in navigating the path of technological evolution for travelers, small businesses, and innovators in the hospitality sector. Welcome to The Doorway Technology — a symbol of hope, a door to undiscover hidden possibilities in the world of travel and tourism.",
//   openGraph: {
//     title: "The Doorway Technology: Pioneering Innovation in Travel, Tourism & Hospitality",
//     description:
//       "Embark on a journey with The Doorway Technology, a revolutionary IT company born from a vision to transform the neglected realm of travel, tourism, and hospitality. Our deep teal and subtle gold logo symbolizes balance, endless possibilities, and decades of technological expertise. Discover the essence of our binary code foundation, offering hope and monumental achievements. Join us in navigating the path of technological evolution for travelers, small businesses, and innovators in the hospitality sector. Welcome to The Doorway Technology — a symbol of hope, a door to undiscover hidden possibilities in the world of travel and tourism.",
//     images: "/opengraph-image.jpg",
//   },
//   twitter: {
//     title: "The Doorway Technology: Pioneering Innovation in Travel, Tourism & Hospitality",
//     description:
//       "Embark on a journey with The Doorway Technology, a revolutionary IT company born from a vision to transform the neglected realm of travel, tourism, and hospitality. Our deep teal and subtle gold logo symbolizes balance, endless possibilities, and decades of technological expertise. Discover the essence of our binary code foundation, offering hope and monumental achievements. Join us in navigating the path of technological evolution for travelers, small businesses, and innovators in the hospitality sector. Welcome to The Doorway Technology — a symbol of hope, a door to undiscover hidden possibilities in the world of travel and tourism.",
//     images: "/twitter-image.jpg",
//   },
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <Providers>
          <PersistGates>
            <ThemeRegistry options={{ key: "mui" }}>
              <MantineProvider>
                <Notifications />
                {children}
              </MantineProvider>
            </ThemeRegistry>
          </PersistGates>
        </Providers>
      </body>
    </html>
  );
}
