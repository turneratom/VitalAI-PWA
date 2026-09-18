import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";
import { PwaRegister } from "@/components/PwaRegister";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const title = "One Win — close the day in under a minute";
const description =
  "Adult end-of-day habit app. Log exactly one win today and one move for tomorrow. Keep a streak. No pet. No kid game.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "One Win",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  keywords: [
    "habit tracker",
    "end of day",
    "streak",
    "adult productivity",
    "evening routine",
    "one win",
  ],
  appleWebApp: {
    capable: true,
    title: "One Win",
    statusBarStyle: "default",
  },
  openGraph: {
    title,
    description,
    siteName: "One Win",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1915",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
