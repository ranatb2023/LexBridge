import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import { Link } from "react-router-dom";

const CaseDashboard = () => {
  const [cases, setCases] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    fetchCases();
  }, [page]);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`${API_PATHS.CASES.GET_ALL_BY_USER}?page=${page}&limit=${limit}`);
      setCases(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch cases", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (id) => {
    try {
      const res = await axiosInstance.get(API_PATHS.CASES.EXPORT_BY_ID(id), {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `case-${id}.txt`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to export case", err);
    }
  };

  return (
    <DashboardLayout activeMenu="My Cases">
      <div className="p-8 text-white">
        <h2 className="text-2xl font-semibold mb-6">Generated Cases</h2>

        {loading ? (
          <p>Loading cases...</p>
        ) : (
          <>
            <table className="w-full text-white mt-6 border border-gray-500">
  <thead className="bg-[#1F1F1F]">
    <tr>
      <th className="text-left py-2 px-4 border border-gray-500">Topic</th>
      <th className="text-left py-2 px-4 border border-gray-500">Subtopic</th>
      <th className="text-left py-2 px-4 border border-gray-500">Jurisdiction</th>
      <th className="text-left py-2 px-4 border border-gray-500">Difficulty</th>
      <th className="text-left py-2 px-4 border border-gray-500">Date</th>
      <th className="text-left py-2 px-4 border border-gray-500">Actions</th>
    </tr>
  </thead>
  <tbody>
    {cases.map((c) => (
      <tr key={c._id} className="border border-gray-500">
        <td className="py-2 px-4 border border-gray-500">{c.topicId?.name}</td>
        <td className="py-2 px-4 border border-gray-500">{c.subtopicId?.name}</td>
        <td className="py-2 px-4 border border-gray-500">{c.jurisdictionId?.name}</td>
        <td className="py-2 px-4 border border-gray-500">{c.difficultyId?.level}</td>
        <td className="py-2 px-4 border border-gray-500">
          {moment(c.createdAt).format("MMMM D, YYYY")}
        </td>
        <td className="py-2 px-4 border border-gray-500">
          <Link
            to={`/admin/cases/${c._id}`}
            className="text-[#30D5C8] hover:underline"
          >
            View
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>


            <div className="flex justify-between items-center mt-6 text-sm">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="bg-gray-800 text-white px-4 py-1.5 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="bg-gray-800 text-white px-4 py-1.5 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CaseDashboard;
