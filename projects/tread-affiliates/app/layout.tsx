import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TREAD Marketing — Master Traffic Generation",
  description:
    "How to become a master at generating traffic, monetise it with affiliate offers, and escape the 9–5. Skills, vehicles, and monetisation — broken into three steps.",
  openGraph: {
    title: "TREAD Marketing — Master Traffic Generation",
    description:
      "From 9–5 to $30k/month by learning the most valuable skill of this era: generating traffic.",
    type: "article",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
