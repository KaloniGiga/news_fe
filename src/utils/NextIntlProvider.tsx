// "use client";
import { NextIntlClientProvider, useMessages } from "next-intl";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: { locale: string };
}
export default function NextIntlProvider(props: Props) {
  const { children, params } = props;
  const message = useMessages();
  return (
    <NextIntlClientProvider locale={params.locale} messages={message}>
      {children}
    </NextIntlClientProvider>
  );
}
