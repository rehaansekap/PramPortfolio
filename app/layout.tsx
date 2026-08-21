import type { Metadata } from "next";
import { spaceGrotesk, inter, jetbrainsMono } from "./fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Raihan Syeka Pramukastie — Backend Developer & Full-Stack Engineer",
  description:
    "Personal portfolio and case studies of Raihan Syeka Pramukastie, Backend Developer with full-stack foundation (Node.js, Laravel, Django) and UI/UX sensitivity.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col bg-bg-base text-text-primary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
