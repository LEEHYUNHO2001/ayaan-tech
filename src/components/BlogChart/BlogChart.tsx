"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useThemeContext } from "@/providers/theme-provider";

interface BlogChartProps {
  postDateList: string[]; // YYYY-MM 형태로 전달된다고 가정
}

export default function BlogChart({ postDateList }: BlogChartProps) {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const getCumulativeMonthlyPostCounts = (postDateList: string[]) => {
    const countMap = new Map<string, number>();

    postDateList.forEach((postDate: string) => {
      const month = postDate;
      countMap.set(month, (countMap.get(month) || 0) + 1);
    });

    const sortedEntries = Array.from(countMap.entries()).sort(([a], [b]) =>
      a.localeCompare(b)
    );

    let cumulative = 0;

    return sortedEntries.map(([month, count]) => {
      cumulative += count;
      return { month, count: cumulative };
    });
  };

  const monthlyPostData = getCumulativeMonthlyPostCounts(postDateList);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={monthlyPostData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="count"
          stroke={isDark ? "#999" : "#777"}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
