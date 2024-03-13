import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DefaultLayout from "@/ui/layout/DefaultLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "todak-sun.github.io",
  description: "todak-sun.github.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}
