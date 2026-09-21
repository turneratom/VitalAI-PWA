import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { VaultGate } from "@/components/VaultGate";
import { site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.vaultTitle} — ${site.name}`,
    template: `%s — ${site.vaultTitle}`,
  },
  description: site.mission,
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <VaultGate>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </VaultGate>
      </body>
    </html>
  );
}
