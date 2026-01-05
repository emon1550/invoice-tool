import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "完全無料の請求書作成ツール | 登録不要・PDFダウンロード",
  description: "【登録不要・完全無料】ブラウザだけで簡単に請求書・見積書を作成し、PDFダウンロードできます。インボイス制度対応。個人事業主やフリーランスに最適。データはサーバーに保存されないのでセキュリティも安心。",
  keywords: ["請求書", "作成", "無料", "登録不要", "PDF", "インボイス", "見積書", "ブラウザ", "フリーランス", "個人事業主"],
  openGraph: {
    title: "完全無料の請求書作成ツール | 登録不要・PDFダウンロード",
    description: "登録不要ですぐに使える請求書作成ツール。インボイス対応、PDF保存、ブラウザ完結で安心セキュリティ。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "完全無料の請求書作成ツール | 登録不要",
    description: "登録不要ですぐに使える請求書作成ツール。インボイス対応、PDF保存。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
