import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import { Link } from "react-router-dom";
import { LuEye, LuDownload } from "react-icons/lu";

const AdminCaseDashboard = () => {
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
      const res = await axiosInstance.get(
        `${API_PATHS.CASES.GET_ALL}?page=${page}&limit=${limit}`
      );
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
      <div className="p-6 text-white">
        <h2 className="text-2xl font-semibold mb-6">Generated Cases</h2>

        {loading ? (
          <p className="text-gray-400">Loading cases...</p>
        ) : (
          <>
            <div className="grid gap-5">
              {cases.map((c) => (
                <div
                  key={c._id}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex justify-between items-center hover:bg-white/10 transition"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[#30D5C8]">
                      {c.topicId?.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {c.subtopicId?.name} • {c.jurisdictionId?.name} •{" "}
                      {c.difficultyId?.level}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {moment(c.createdAt).format("MMMM D, YYYY")}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-[#30D5C8]">
                    <Link
                      to={`/admin/cases/${c._id}`}
                      title="View Case"
                      className="hover:text-white transition"
                    >
                      <LuEye className="text-2xl" />
                    </Link>

                    {/* <button
                      title="Export Case"
                      onClick={() => handleExport(c._id)}
                      className="hover:text-white transition cursor-pointer"
                    >
                      <LuDownload className="text-2xl" />
                    </button> */}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 text-sm">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="bg-gray-800 text-white px-4 py-1.5 rounded disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>
              <span className="text-gray-400">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="bg-gray-800 text-white px-4 py-1.5 rounded disabled:opacity-50 cursor-pointer"
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

export default AdminCaseDashboard;
