import React, { useEffect, useState } from "react";
import moment from "moment";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCases: 0,
    activeSubscriptions: 0,
    todaysCases: 0,
  });

  const [caseTrend, setCaseTrend] = useState([]);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.ADMIN.STATS);
      console.log(res)
      setStats(res.data.overview);
      setCaseTrend(res.data.caseTrend);
    } catch (error) {
      console.error("Failed to fetch admin stats:", error);
    }
  };

  const lineChartData = {
    labels: caseTrend.map((c) => c.week),
    datasets: [
      {
        label: "Cases Created",
        data: caseTrend.map((c) => c.count),
        fill: true,
        borderColor: "#60A5FA",
        backgroundColor: "rgba(96, 165, 250, 0.15)",
        tension: 0.4,
      },
    ],
  };

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="text-white">
        <h2 className="text-3xl font-medium">Welcome Admin</h2>
        <p className="text-sm text-gray-400 mt-1">
          {moment().format("dddd Do MMM YYYY")}
        </p>

        {/* Stat Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Users", value: stats.totalUsers, color: "#6EE7B7" },
            { label: "Total Cases", value: stats.totalCases, color: "#93C5FD" },
            {
              label: "Active Subscriptions",
              value: stats.activeSubscriptions,
              color: "#FBBF24",
            },
            {
              label: "Today's Cases",
              value: stats.todaysCases,
              color: "#F472B6",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="rounded-xl p-5 shadow-inner border border-white/10 backdrop-blur-md"
              style={{
                background: `linear-gradient(to bottom right, ${card.color}33, ${card.color}11)`,
              }}
            >
              <p className="text-sm text-gray-300">{card.label}</p>
              <h3 className="text-2xl font-bold">{card.value}</h3>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="mt-10 p-6 rounded-xl shadow-inner border border-white/10 backdrop-blur-md bg-white/5">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Weekly Case Generation
          </h3>
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  labels: {
                    color: "#ffffff",
                  },
                },
              },
              scales: {
                x: {
                  ticks: { color: "#aaa" },
                  grid: { color: "#444" },
                },
                y: {
                  ticks: { color: "#aaa" },
                  grid: { color: "#444" },
                },
              },
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
