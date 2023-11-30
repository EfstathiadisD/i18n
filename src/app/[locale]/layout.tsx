import type { PropsWithChildren } from "react";

import { notFound } from "next/navigation";
import { Inter } from "next/font/google";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

const locales = ["en", "el"] as const;

const inter = Inter({ subsets: ["latin"] });

type LocaleLayoutProps = PropsWithChildren<{
  params: {
    locale: (typeof locales)[number];
  };
}>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<LocaleLayoutProps, "children">) {
  const t = await getTranslations({ locale, namespace: "LOCALE" });

  return {
    title: t("METADATA.TITLE"),
    description: t("METADATA.DESCRIPTION"),
  };
}

function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  if (!locales.includes(locale as any)) notFound();

  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export default LocaleLayout;
