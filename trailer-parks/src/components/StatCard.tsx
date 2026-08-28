import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  subtext?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
};

export function StatCard({ label, value, subtext, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("bg-card rounded-xl p-5 card-shadow border border-border", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted uppercase tracking-wider">{label}</p>
          <p className="mt-1 text-2xl font-bold text-navy">{value}</p>
          {subtext && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                trend === "up" && "text-success",
                trend === "down" && "text-red-600",
                !trend && "text-muted"
              )}
            >
              {subtext}
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
