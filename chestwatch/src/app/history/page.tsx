import type { Metadata } from "next";
import { HistoryList } from "@/components/HistoryList";

export const metadata: Metadata = {
  title: "Answers",
};

export default function HistoryPage() {
  return <HistoryList />;
}
