import { Noto_Sans_JP } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "xross-stars",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
