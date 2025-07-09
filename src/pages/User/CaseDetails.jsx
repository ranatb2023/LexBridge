import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import moment from "moment";
import { jsPDF } from "jspdf";


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
    const res = await axiosInstance.get(API_PATHS.CASES.GET_BY_ID(id)); // get full case data

    const { generatedContent, topicId, subtopicId, difficultyId, jurisdictionId } = res.data;

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

    doc.text(`Fact Pattern:`, 10, y);
    y += 8;
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(generatedContent.factPattern || "N/A", 180), 10, y);

    y += (doc.splitTextToSize(generatedContent.factPattern || "", 180).length * 6) + 10;
    doc.setFontSize(12);
    doc.text(`Witness Statement:`, 10, y);
    y += 8;
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(generatedContent.witnessStatement || "N/A", 180), 10, y);

    y += (doc.splitTextToSize(generatedContent.witnessStatement || "", 180).length * 6) + 10;
    doc.setFontSize(12);
    doc.text(`Supporting Document:`, 10, y);
    y += 8;
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(generatedContent.supportingDocument || "N/A", 180), 10, y);

    doc.save(`legal-case-${id}.pdf`);
  } catch (err) {
    console.error("Export failed", err);
    alert("Failed to export case.");
  }
};


  if (loading)
    return (
      <DashboardLayout>
        <div className="p-8 text-white">Loading...</div>
      </DashboardLayout>
    );
  if (!caseData)
    return (
      <DashboardLayout>
        <div className="p-8 text-red-500">Case not found.</div>
      </DashboardLayout>
    );

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
      <div className="p-8 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Case Details</h1>
          <div className="flex gap-4">
            <button onClick={handleExport} className="download-btn">
              Download as PDF
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-800 border border-[#30D5C8] px-4 py-1.5 rounded hover:bg-[#30D5C8] hover:text-black cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>

        <div className="mb-6 space-y-1 text-sm text-gray-300">
          <p>
            <strong>Date:</strong> {moment(createdAt).format("MMMM D, YYYY")}
          </p>
          <p>
            <strong>Topic:</strong> {topicId?.name}
          </p>
          <p>
            <strong>Subtopic:</strong> {subtopicId?.name}
          </p>
          <p>
            <strong>Jurisdiction:</strong> {jurisdictionId?.name}
          </p>
          <p>
            <strong>Difficulty:</strong> {difficultyId?.level}
          </p>
        </div>

        <div className="space-y-6 text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-[#30D5C8] mb-2">
              Fact Pattern
            </h2>
            <p className="text-gray-200 whitespace-pre-wrap">
              {generatedContent?.factPattern || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#30D5C8] mb-2">
              Witness Statement
            </h2>
            <p className="text-gray-200 whitespace-pre-wrap">
              {generatedContent?.witnessStatement || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#30D5C8] mb-2">
              Supporting Document
            </h2>
            <p className="text-gray-200 whitespace-pre-wrap">
              {generatedContent?.supportingDocument || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CaseDetails;
