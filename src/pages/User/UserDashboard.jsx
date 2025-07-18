import React, { useContext } from "react";
import moment from "moment";
import { UserContext } from "../../context/UserContext";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
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

const UserDashboard = () => {
  const { user } = useContext(UserContext);

  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Generated Cases",
        data: [2, 4, 3, 5, 6, 1, 3],
        fill: true,
        borderColor: "#30D5C8",
        backgroundColor: "rgba(48, 213, 200, 0.15)",
        tension: 0.4,
      },
    ],
  };

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="text-white">
        <h2 className="text-3xl font-medium">Good Morning, {user?.name}</h2>
        <p className="text-sm text-gray-400 mt-1">
          {moment().format("dddd Do MMM YYYY")}
        </p>

        {/* Stat Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Cases Generated", value: 24, color: "#30D5C8" },
            { label: "Credits Used", value: 24, color: "#6E8EF9" },
            { label: "Remaining Credits", value: 76, color: "#F472B6" },
            { label: "Performance", value: "89%", color: "#C084FC" },
          ].map((card, index) => (
            <div
              key={index}
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

        {/* Chart Section */}
        <div className="mt-10 p-6 rounded-xl shadow-inner border border-white/10 backdrop-blur-md bg-white/5">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Case Generation Trends
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

export default UserDashboard;
