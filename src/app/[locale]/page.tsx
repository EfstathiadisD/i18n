import type { PropsWithChildren } from "react";

import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["en", "el"] as const;

type LocalePageProps = PropsWithChildren<{
  params: {
    locale: (typeof locales)[number];
  };
}>;

function LocalePage({ params: { locale } }: LocalePageProps) {
  if (!locales.includes(locale as any)) notFound();
  unstable_setRequestLocale(locale);

  const t = useTranslations("LOCALE");
  return <h1>{t("METADATA.TITLE")}</h1>;
}

export default LocalePage;
