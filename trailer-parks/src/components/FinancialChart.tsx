"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import type { MonthlyFinancial } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

type FinancialChartProps = {
  data: MonthlyFinancial[];
  type?: "noi" | "revenue-expenses";
};

export function FinancialChart({ data, type = "noi" }: FinancialChartProps) {
  if (type === "revenue-expenses") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#6c757d" }}
            tickFormatter={(v: string) => v.split(" ")[0]}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#6c757d" }}
            tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value) => formatCurrency(Number(value))}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "13px",
            }}
          />
          <Legend />
          <Bar dataKey="revenue" name="Revenue" fill="#2d6a4f" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" name="Expenses" fill="#d4a853" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="noiGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#6c757d" }}
          tickFormatter={(v: string) => v.split(" ")[0]}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#6c757d" }}
          tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(value, name) => [
            name === "occupancy" ? `${value}%` : formatCurrency(Number(value)),
            name === "occupancy" ? "Occupancy" : name === "noi" ? "NOI" : String(name),
          ]}
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            fontSize: "13px",
          }}
        />
        <Area
          type="monotone"
          dataKey="noi"
          name="noi"
          stroke="#2d6a4f"
          strokeWidth={2}
          fill="url(#noiGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
