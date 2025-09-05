import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Card from "@/components/ui/Card";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard/summary");
        const data = await res.json();
        console.log(" Dashboard API response:", data);
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats)
    return (
      <p className="text-center p-4 text-gray-900 dark:text-white">
        Loading dashboard...
      </p>
    );

  const {
    totalStudents,
    activeStudents,
    inactiveStudents,
    lastSyncedAt,
    ratingDistribution,
    submissionsPerDay,
  } = stats;

  const barData = Object.entries(ratingDistribution).map(([bucket, count]) => ({
    bucket,
    count,
  }));
  const lineData = Object.entries(submissionsPerDay).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Overall Analytics
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Students">{totalStudents}</Card>
        <Card title="Active Students" className="text-green-400 text-3xl font-semibold">{activeStudents}</Card>
        <Card title="Inactive Students">{inactiveStudents}</Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg border border-gray-200 dark:border-green-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Rating Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis
                dataKey="bucket"
                tick={{ fill: "currentColor" }}
                className="text-gray-600 dark:text-gray-300"
              />
              <YAxis
                tick={{ fill: "currentColor" }}
                className="text-gray-600 dark:text-gray-300"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg)",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="count"
                fill="#23AF56"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg border border-gray-200 dark:border-green-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Submissions per Day
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis
                dataKey="date"
                tick={{ fill: "currentColor" }}
                className="text-gray-600 dark:text-gray-300"
              />
              <YAxis
                tick={{ fill: "currentColor" }}
                className="text-gray-600 dark:text-gray-300"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg)",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
              
              <Line
                type="monotone"
                dataKey="count"
                stroke="#23AF56"
                strokeWidth={3}
                dot={{ fill: "#0C3C1D", strokeWidth: 2, r: 4 }}
               
              />
            </LineChart>
            
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
