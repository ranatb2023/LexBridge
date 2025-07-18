import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import Input from "../../components/inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const tabs = ["topic", "subtopic", "jurisdiction", "difficulty"];

const CaseRequirements = () => {
  const [activeTab, setActiveTab] = useState("topic");

  const [topicName, setTopicName] = useState("");
  const [basePrompt, setBasePrompt] = useState("");
  const [subtopicName, setSubtopicName] = useState("");
  const [promptModifier, setPromptModifier] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [taskPrompt, setTaskPrompt] = useState("");
  const [jurisdictionName, setJurisdictionName] = useState("");
  const [legalFrameworkPrompt, setLegalFrameworkPrompt] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [complexityPrompt, setComplexityPrompt] = useState("");
  const [difficultyDescription, setDifficultyDescription] = useState("");

  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [jurisdictions, setJurisdictions] = useState([]);
  const [difficulties, setDifficulties] = useState([]);

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
      const res = await axiosInstance.get(API_PATHS.ADMIN.JURISDICTIONS.GET_ALL);
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
        if (!topicName || !basePrompt) return setError("All fields are required.");
        await axiosInstance.post(API_PATHS.ADMIN.TOPICS.CREATE, { name: topicName, basePrompt });
        setTopicName(""); setBasePrompt(""); fetchTopics(); setSuccess("Topic added.");
      } else if (activeTab === "subtopic") {
        if (!selectedTopicId || !subtopicName || !promptModifier)
          return setError("All fields are required.");
        await axiosInstance.post(API_PATHS.ADMIN.SUBTOPICS.CREATE, {
          topicId: selectedTopicId, name: subtopicName, promptModifier, taskPrompt
        });
        setSubtopicName(""); setPromptModifier(""); setTaskPrompt(""); fetchSubtopics(); setSuccess("Subtopic added.");
      } else if (activeTab === "jurisdiction") {
        if (!jurisdictionName || !legalFrameworkPrompt) return setError("All fields are required.");
        await axiosInstance.post(API_PATHS.ADMIN.JURISDICTIONS.CREATE, {
          name: jurisdictionName, legalFrameworkPrompt
        });
        setJurisdictionName(""); setLegalFrameworkPrompt(""); fetchJurisdictions(); setSuccess("Jurisdiction added.");
      } else if (activeTab === "difficulty") {
        if (!difficultyLevel || !complexityPrompt) return setError("Level and prompt required.");
        await axiosInstance.post(API_PATHS.ADMIN.DIFFICULTIES.CREATE, {
          level: difficultyLevel, description: difficultyDescription, complexityPrompt
        });
        setDifficultyLevel(""); setComplexityPrompt(""); setDifficultyDescription("");
        fetchDifficulties(); setSuccess("Difficulty added.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  const renderFormFields = () => {
    switch (activeTab) {
      case "topic":
        return (
          <>
            <Input label="Topic Name" value={topicName} onChange={(e) => setTopicName(e.target.value)} />
            <Input label="Base Prompt" value={basePrompt} onChange={(e) => setBasePrompt(e.target.value)} />
          </>
        );
      case "subtopic":
        return (
          <>
            <label className="text-sm text-white mb-1">Select Topic</label>
            <select
              className="w-full px-4 py-2 rounded-xl bg-[#1F1F1F] border border-[#30D5C8] text-white focus:outline-none mb-4"
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
            >
              <option value="">-- Select Topic --</option>
              {topics.map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
            </select>
            <Input label="Subtopic Name" value={subtopicName} onChange={(e) => setSubtopicName(e.target.value)} />
            <Input label="Prompt Modifier" value={promptModifier} onChange={(e) => setPromptModifier(e.target.value)} />
            <Input label="Task Prompt" value={taskPrompt} onChange={(e) => setTaskPrompt(e.target.value)} />
          </>
        );
      case "jurisdiction":
        return (
          <>
            <Input label="Jurisdiction Name" value={jurisdictionName} onChange={(e) => setJurisdictionName(e.target.value)} />
            <Input label="Legal Framework Prompt" value={legalFrameworkPrompt} onChange={(e) => setLegalFrameworkPrompt(e.target.value)} />
          </>
        );
      case "difficulty":
        return (
          <>
            <label className="text-sm text-white mb-1">Select Difficulty Level</label>
            <select
              className="w-full px-4 py-2 rounded-xl bg-[#1F1F1F] border border-[#30D5C8] text-white focus:outline-none mb-4"
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
            >
              <option value="">-- Select Level --</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <Input label="Description" value={difficultyDescription} onChange={(e) => setDifficultyDescription(e.target.value)} />
            <Input label="Complexity Prompt" value={complexityPrompt} onChange={(e) => setComplexityPrompt(e.target.value)} />
          </>
        );
      default:
        return null;
    }
  };

  const renderTable = () => {
    const rowClass = "py-2 px-4 border-t border-gray-700";
    switch (activeTab) {
      case "topic":
        return (
          <table className="w-full text-white mt-6">
            <thead><tr><th className={rowClass}>Name</th><th className={rowClass}>Base Prompt</th></tr></thead>
            <tbody>{topics.map((t) => <tr key={t._id}><td className={rowClass}>{t.name}</td><td className={rowClass}>{t.basePrompt}</td></tr>)}</tbody>
          </table>
        );
      case "subtopic":
        return (
          <table className="w-full text-white mt-6">
            <thead>
              <tr>
                <th className={rowClass}>Subtopic</th>
                <th className={rowClass}>Prompt Modifier</th>
                <th className={rowClass}>Task Prompt</th>
                <th className={rowClass}>Topic</th>
              </tr>
            </thead>
            <tbody>{subtopics.map((s) => (
              <tr key={s._id}>
                <td className={rowClass}>{s.name}</td>
                <td className={rowClass}>{s.promptModifier}</td>
                <td className={rowClass}>{s.taskPrompt}</td>
                <td className={rowClass}>{s.topicId?.name}</td>
              </tr>
            ))}</tbody>
          </table>
        );
      case "jurisdiction":
        return (
          <table className="w-full text-white mt-6">
            <thead><tr><th className={rowClass}>Name</th><th className={rowClass}>Legal Framework</th></tr></thead>
            <tbody>{jurisdictions.map((j) => <tr key={j._id}><td className={rowClass}>{j.name}</td><td className={rowClass}>{j.legalFrameworkPrompt}</td></tr>)}</tbody>
          </table>
        );
      case "difficulty":
        return (
          <table className="w-full text-white mt-6">
            <thead><tr><th className={rowClass}>Level</th><th className={rowClass}>Description</th><th className={rowClass}>Prompt</th></tr></thead>
            <tbody>{difficulties.map((d) => <tr key={d._id}><td className={rowClass}>{d.level}</td><td className={rowClass}>{d.description}</td><td className={rowClass}>{d.complexityPrompt}</td></tr>)}</tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout activeMenu="Case Requirements">
      <div className="text-white mt-5 mb-10">
        <h2 className="text-2xl font-semibold mb-6">Case Requirement Management</h2>

        <div className="flex flex-wrap gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#30D5C8] to-[#1ED6A0] text-black shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFormFields()}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button type="submit" className="btn-primary">Add</button>
        </form>

        {renderTable()}
      </div>
    </DashboardLayout>
  );
};

export default CaseRequirements;
