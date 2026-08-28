import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "List Your Mobile Home Park Free — No Fees Ever | Mobile Home Parks",
  description:
    "Sell your mobile home park with zero listing fees and zero success fees. Reach 2,400+ qualified buyers, analysts, and lenders on Mobile Home Parks.",
  openGraph: {
    title: "List Your Mobile Home Park — $0 Fees",
    description:
      "Traditional brokers charge 6%. We charge nothing. List your park free and reach qualified buyers today.",
    type: "website",
    siteName: siteConfig.name,
    url: "/list-your-park",
  },
  twitter: {
    card: "summary_large_image",
    title: "List Your Mobile Home Park — $0 Fees",
    description: "No listing fees. No success fees. Ever.",
  },
};

export default function ListYourParkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
