import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import moment from "moment";
import { jsPDF } from "jspdf";
import { LuDownload, LuArrowLeft } from "react-icons/lu";

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseDetails();
  }, []);

  const fetchCaseDetails = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.CASES.GET_BY_ID(id));
      setCaseData(res.data);
    } catch (err) {
      console.error("Failed to fetch case", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.CASES.GET_BY_ID(id));
      const {
        generatedContent,
        topicId,
        subtopicId,
        difficultyId,
        jurisdictionId,
      } = res.data;

      const doc = new jsPDF();
      doc.setFont("times", "normal");
      doc.setFontSize(12);

      doc.text(`Fictional Legal Case`, 10, 10);
      doc.setFontSize(10);
      doc.text(`Topic: ${topicId?.name || ""}`, 10, 20);
      doc.text(`Subtopic: ${subtopicId?.name || ""}`, 10, 28);
      doc.text(`Difficulty: ${difficultyId?.level || ""}`, 10, 36);
      doc.text(`Jurisdiction: ${jurisdictionId?.name || ""}`, 10, 44);

      doc.setFontSize(12);
      let y = 56;

      const addSection = (label, text) => {
        doc.text(`${label}:`, 10, y);
        y += 8;
        doc.setFontSize(10);
        const lines = doc.splitTextToSize(text || "N/A", 180);
        doc.text(lines, 10, y);
        y += lines.length * 6 + 10;
        doc.setFontSize(12);
      };

      addSection("Fact Pattern", generatedContent?.factPattern);
      addSection("Witness Statement", generatedContent?.witnessStatement);
      addSection("Supporting Document", generatedContent?.supportingDocument);
      addSection("Task Prompt", generatedContent?.taskPrompt);

      doc.save(`legal-case-${id}.pdf`);
    } catch (err) {
      console.error("Export failed", err);
      alert("Failed to export case.");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 text-white">Loading...</div>
      </DashboardLayout>
    );
  }

  if (!caseData) {
    return (
      <DashboardLayout>
        <div className="p-8 text-red-500">Case not found.</div>
      </DashboardLayout>
    );
  }

  const {
    createdAt,
    topicId,
    subtopicId,
    difficultyId,
    jurisdictionId,
    generatedContent,
  } = caseData;

  return (
    <DashboardLayout activeMenu="My Cases">
      <div className="p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Case Details</h1>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-[#30D5C8]/10 text-[#30D5C8] px-4 py-2 rounded hover:bg-[#30D5C8]/20 transition cursor-pointer"
            >
              <LuDownload className="text-lg" />
              Download PDF
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded border border-white/10 hover:bg-white/10 transition cursor-pointer"
            >
              <LuArrowLeft />
              Back
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-1 gap-4 text-sm text-gray-300">
          <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow">
            <p><strong>Date:</strong> {moment(createdAt).format("MMMM D, YYYY")}</p>
            <p><strong>Topic:</strong> {topicId?.name}</p>
            <p><strong>Subtopic:</strong> {subtopicId?.name}</p>
            <p><strong>Jurisdiction:</strong> {jurisdictionId?.name}</p>
            <p><strong>Difficulty:</strong> {difficultyId?.level}</p>
          </div>
        </div>

        <div className="space-y-6">
          {[
            { label: "Fact Pattern", content: generatedContent?.factPattern },
            { label: "Witness Statement", content: generatedContent?.witnessStatement },
            { label: "Supporting Document", content: generatedContent?.supportingDocument },
            { label: "Task Prompt", content: generatedContent?.taskPrompt },
          ].map((section, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow"
            >
              <h2 className="text-xl font-semibold text-[#30D5C8] mb-2">
                {section.label}
              </h2>
              <p className="text-gray-200 whitespace-pre-wrap">{section.content || "N/A"}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CaseDetails;
