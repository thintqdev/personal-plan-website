import type React from "react";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});

const nunito = Nunito({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "ThinPlan - Kế hoạch cá nhân thông minh",
  description:
    "Ứng dụng lập kế hoạch cá nhân với giao diện thân thiện và động lực tích cực",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${nunito.variable} antialiased`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
