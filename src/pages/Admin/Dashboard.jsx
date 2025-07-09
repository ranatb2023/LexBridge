import React, { useContext, useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";

const Dashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.CASES.GET_ALL);
        setCases(res.data);
      } catch (error) {
        console.error("Failed to fetch cases:", error);
      }
    };

    fetchCases();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div className="col-span-3">
          <h2 className="text-xl md:text-2xl text-white">
            Good Morning! {user?.name}
          </h2>
          <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
            {moment().format("dddd Do MMM YYYY")}
          </p>
        </div>
      </div>

      <div className="mt-5 mb-10">
        <div className="flex md:flex-row md:items-center justify-between mb-5">
          <h2 className="text-xl md:text-xl font-medium text-white">
            All Generated Cases
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border border-gray-600">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-2 border border-gray-700">User</th>
                <th className="p-2 border border-gray-700">Topic</th>
                <th className="p-2 border border-gray-700">Subtopic</th>
                <th className="p-2 border border-gray-700">Jurisdiction</th>
                <th className="p-2 border border-gray-700">Difficulty</th>
                <th className="p-2 border border-gray-700">Created At</th>
                <th className="p-2 border border-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((item) => (
                <tr key={item._id} className="text-white border border-gray-700">
                  <td className="p-2 border border-gray-700">{item.userId?.name}</td>
                  <td className="p-2 border border-gray-700">{item.topicId?.name}</td>
                  <td className="p-2 border border-gray-700">{item.subtopicId?.name}</td>
                  <td className="p-2 border border-gray-700">{item.jurisdictionId?.name}</td>
                  <td className="p-2 border border-gray-700">{item.difficultyId?.level}</td>
                  <td className="p-2 border border-gray-700">{moment(item.createdAt).format("Do MMM, YYYY")}</td>
                  <td className="p-2 border border-gray-700">
                    <Link
                      to={`/admin/cases/${item._id}`}
                      className="text-primary cursor-pointer hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
