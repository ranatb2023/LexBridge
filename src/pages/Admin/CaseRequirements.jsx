import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import Input from "../../components/inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CaseRequirements = () => {
  const [activeTab, setActiveTab] = useState("topic");

  const [topicName, setTopicName] = useState("");
  const [basePrompt, setBasePrompt] = useState("");

  //   const [topics, setTopics] = useState([]);
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [jurisdictions, setJurisdictions] = useState([]);
  const [difficulties, setDifficulties] = useState([]);

  const [subtopicName, setSubtopicName] = useState("");
  const [promptModifier, setPromptModifier] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState("");

  const [jurisdictionName, setJurisdictionName] = useState("");
  const [legalFrameworkPrompt, setLegalFrameworkPrompt] = useState("");

  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [complexityPrompt, setComplexityPrompt] = useState("");
  const [difficultyDescription, setDifficultyDescription] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchTopics();
    fetchSubtopics();
    fetchJurisdictions();
    fetchDifficulties();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.ADMIN.TOPICS.GET_ALL);
      setTopics(res.data);
    } catch (err) {
      console.error("Failed to fetch topics", err);
    }
  };

  const fetchSubtopics = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.ADMIN.SUBTOPICS.GET_ALL);
      setSubtopics(res.data);
    } catch (err) {
      console.error("Failed to fetch subtopics", err);
    }
  };

  const fetchJurisdictions = async () => {
    try {
      const res = await axiosInstance.get(
        API_PATHS.ADMIN.JURISDICTIONS.GET_ALL
      );
      setJurisdictions(res.data);
    } catch (err) {
      console.error("Failed to fetch jurisdictions", err);
    }
  };

  const fetchDifficulties = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.ADMIN.DIFFICULTIES.GET_ALL);
      setDifficulties(res.data);
    } catch (err) {
      console.error("Failed to fetch difficulties", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (activeTab === "topic") {
        if (!topicName || !basePrompt)
          return setError("All fields are required.");
        await axiosInstance.post(API_PATHS.ADMIN.TOPICS.CREATE, {
          name: topicName,
          basePrompt,
        });
        setSuccess("Topic added successfully.");
        setTopicName("");
        setBasePrompt("");
        fetchTopics();
      } else if (activeTab === "subtopic") {
        if (!selectedTopicId || !subtopicName || !promptModifier)
          return setError("All fields are required.");
        await axiosInstance.post(API_PATHS.ADMIN.SUBTOPICS.CREATE, {
          topicId: selectedTopicId,
          name: subtopicName,
          promptModifier,
        });
        setSuccess("Subtopic added successfully.");
        setSubtopicName("");
        setPromptModifier("");
      } else if (activeTab === "jurisdiction") {
        if (!jurisdictionName || !legalFrameworkPrompt)
          return setError("All fields are required.");
        await axiosInstance.post(API_PATHS.ADMIN.JURISDICTIONS.CREATE, {
          name: jurisdictionName,
          legalFrameworkPrompt,
        });
        setSuccess("Jurisdiction added successfully.");
        setJurisdictionName("");
        setLegalFrameworkPrompt("");
      } else if (activeTab === "difficulty") {
        if (!difficultyLevel || !complexityPrompt)
          return setError("Level and complexity prompt required.");
        await axiosInstance.post(API_PATHS.ADMIN.DIFFICULTIES.CREATE, {
          level: difficultyLevel,
          description: difficultyDescription,
          complexityPrompt,
        });
        setSuccess("Difficulty added successfully.");
        setDifficultyLevel("");
        setComplexityPrompt("");
        setDifficultyDescription("");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case "topic":
        return (
          <>
            <Input
              type="text"
              label="Topic Name"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
            />
            <Input
              type="text"
              label="Base Prompt"
              value={basePrompt}
              onChange={(e) => setBasePrompt(e.target.value)}
            />
          </>
        );
      case "subtopic":
        return (
          <>
            <label className="block text-sm text-white font-medium mb-1">
              Select Topic
            </label>
            <select
              className="w-full mb-4 px-4 py-2.5 text-sm rounded-xl bg-[#1F1F1F] border border-[#30D5C8] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30D5C8] transition duration-200"
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
            >
              <option value="">-- Select Topic --</option>
              {topics.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>

            <Input
              type="text"
              label="Subtopic Name"
              value={subtopicName}
              onChange={(e) => setSubtopicName(e.target.value)}
            />
            <Input
              type="text"
              label="Prompt Modifier"
              value={promptModifier}
              onChange={(e) => setPromptModifier(e.target.value)}
            />
          </>
        );
      case "jurisdiction":
        return (
          <>
            <Input
              type="text"
              label="Jurisdiction Name"
              value={jurisdictionName}
              onChange={(e) => setJurisdictionName(e.target.value)}
            />
            <Input
              type="text"
              label="Legal Framework Prompt"
              value={legalFrameworkPrompt}
              onChange={(e) => setLegalFrameworkPrompt(e.target.value)}
            />
          </>
        );
      case "difficulty":
        return (
          <>
            <label className="block text-sm text-white font-medium mb-1">
              Select Difficulty Level
            </label>
            <select
              className="w-full mb-4 px-4 py-2.5 text-sm rounded-xl bg-[#1F1F1F] border border-[#30D5C8] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#30D5C8] transition duration-200"
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
            >
              <option value="">-- Select Level --</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <Input
              type="text"
              label="Description (optional)"
              value={difficultyDescription}
              onChange={(e) => setDifficultyDescription(e.target.value)}
            />
            <Input
              type="text"
              label="Complexity Prompt"
              value={complexityPrompt}
              onChange={(e) => setComplexityPrompt(e.target.value)}
            />
          </>
        );
      default:
        return null;
    }
  };

  const renderTable = () => {
    switch (activeTab) {
      case "topic":
        return (
          <table className="w-full text-white mt-6 table-fixed border-separate border-spacing-x-4">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 w-1/2">Name</th>
                <th className="text-left py-2 px-4 w-1/2">Base Prompt</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((t) => (
                <tr key={t._id} className="border-t border-gray-700">
                  <td className="py-2 px-4">{t.name}</td>
                  <td className="py-2 px-4">{t.basePrompt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "subtopic":
        return (
          <table className="w-full text-white mt-6 table-fixed border-separate border-spacing-x-4">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 w-1/3">Subtopic</th>
                <th className="text-left py-2 px-4 w-1/3">Prompt Modifier</th>
                <th className="text-left py-2 px-4 w-1/3">Topic</th>
              </tr>
            </thead>
            <tbody>
              {subtopics.map((s) => (
                <tr key={s._id} className="border-t border-gray-700">
                  <td className="py-2 px-4">{s.name}</td>
                  <td className="py-2 px-4">{s.promptModifier}</td>
                  <td className="py-2 px-4">{s.topicId?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "jurisdiction":
        return (
          <table className="w-full text-white mt-6 table-fixed border-separate border-spacing-x-4">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 w-1/2">Name</th>
                <th className="text-left py-2 px-4 w-1/2">
                  Legal Framework Prompt
                </th>
              </tr>
            </thead>
            <tbody>
              {jurisdictions.map((j) => (
                <tr key={j._id} className="border-t border-gray-700">
                  <td className="py-2 px-4">{j.name}</td>
                  <td className="py-2 px-4">{j.legalFrameworkPrompt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "difficulty":
        return (
          <table className="w-full text-white mt-6 table-fixed border-separate border-spacing-x-4">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 w-1/3">Level</th>
                <th className="text-left py-2 px-4 w-1/3">Description</th>
                <th className="text-left py-2 px-4 w-1/3">Complexity Prompt</th>
              </tr>
            </thead>
            <tbody>
              {difficulties.map((d) => (
                <tr key={d._id} className="border-t border-gray-700">
                  <td className="py-2 px-4">{d.level}</td>
                  <td className="py-2 px-4">{d.description}</td>
                  <td className="py-2 px-4">{d.complexityPrompt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout activeMenu="Case Requirements">
      <div className="mt-5 mb-10">
        <div className="flex md:flex-row md:items-center justify-between mb-5">
          <h2 className="text-xl md:text-xl font-medium text-white">
            All Users
          </h2>
          {/* <button className="flex md:flex download-btn" onClick={handleDownloadReport}>
                        <LuFileSpreadsheet className="text-lg" />
                        Download Report
                    </button> */}
        </div>

        <div className="flex gap-4 mb-6">
          {["topic", "subtopic", "jurisdiction", "difficulty"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${
                activeTab === tab
                  ? "bg-[#30D5C8] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderForm()}

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button type="submit" className="btn-primary">
            Add
          </button>
        </form>

        {renderTable()}
      </div>
    </DashboardLayout>
  );
};

export default CaseRequirements;
