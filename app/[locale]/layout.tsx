import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { SmoothScrollProvider } from "@/components/common/smooth-scroll";
import { SpaceCosmos } from "@/components/3d/space-cosmos";
import { ScrollOrb3D } from "@/components/3d/scroll-orb-3d";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "id" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <SmoothScrollProvider>
        <SpaceCosmos />
        <ScrollOrb3D />
        <Navbar />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </NextIntlClientProvider>
  );
}
