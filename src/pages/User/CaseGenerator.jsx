import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../../components/inputs/Input";

const CaseGenerator = () => {
  const [form, setForm] = useState({
    topic: "",
    subtopic: "",
    difficulty: "",
    jurisdiction: "",
  });

  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [jurisdictions, setJurisdictions] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [caseOutput, setCaseOutput] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [topicsRes, difficultiesRes, jurisdictionsRes] =
          await Promise.all([
            axiosInstance.get(API_PATHS.OPTIONS.GET_TOPICS),
            axiosInstance.get(API_PATHS.OPTIONS.GET_DIFFICULTIES),
            axiosInstance.get(API_PATHS.OPTIONS.GET_JURISDICTIONS),
          ]);

        setTopics(topicsRes.data);
        setDifficulties(difficultiesRes.data);
        setJurisdictions(jurisdictionsRes.data);
      } catch (err) {
        console.error("Failed to load form options", err);
      }
    };

    fetchOptions();
  }, []);

  // Fetch subtopics based on topic
  useEffect(() => {
    const fetchSubtopics = async () => {
      if (!form.topic) return setSubtopics([]);
      try {
        const res = await axiosInstance.get(
          API_PATHS.OPTIONS.GET_SUBTOPICS_BY_TOPIC(form.topic)
        );
        setSubtopics(res.data);
      } catch (err) {
        console.error("Failed to load subtopics", err);
      }
    };

    fetchSubtopics();
  }, [form.topic]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setCaseOutput(null);

    if (
      !form.topic ||
      !form.subtopic ||
      !form.difficulty ||
      !form.jurisdiction
    ) {
      return setError("All fields are required.");
    }

    setGenerating(true);
    try {
      const payload = {
        topicId: form.topic,
        subtopicId: form.subtopic,
        difficultyId: form.difficulty,
        jurisdictionId: form.jurisdiction,
      };
      const res = await axiosInstance.post(API_PATHS.CASES.GENERATE, payload);
      // console.log(res);
      setCaseOutput(res.data.generatedContent);
      setSuccess("Case generated successfully!");
    } catch (err) {
      console.error("Case generation failed", err);
      setError("Something went wrong while generating the case.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Generate Case">
      <div className="mt-5 mb-10">
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-xl md:text-xl font-medium text-white">
            Generate Cases
          </h2>
        </div>
        <div className="max-w-full mx-auto bg-black p-8 rounded-md shadow-xl mt-2">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {/* Topic Dropdown */}
                <label className="block text-sm text-white font-medium mb-2">
                  Select Topic
                </label>
                <select
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  className="w-full mb-4 px-4 py-2.5 text-sm rounded-md bg-[#1F1F1F] border border-[#30D5C8] text-white focus:outline-none focus:ring-2 focus:ring-[#30D5C8] transition"
                >
                  <option value="">-- Select Topic --</option>
                  {topics.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                {/* Subtopic Dropdown */}
                <label className="block text-sm text-white font-medium mb-2">
                  Select Subtopic
                </label>
                <select
                  name="subtopic"
                  value={form.subtopic}
                  onChange={handleChange}
                  className="w-full mb-4 px-4 py-2.5 text-sm rounded-md bg-[#1F1F1F] border border-[#30D5C8] text-white focus:outline-none focus:ring-2 focus:ring-[#30D5C8] transition"
                >
                  <option value="">-- Select Subtopic --</option>
                  {subtopics.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                {/* Difficulty Dropdown */}
                <label className="block text-sm text-white font-medium mb-2">
                  Select Difficulty
                </label>
                <select
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                  className="w-full mb-4 px-4 py-2.5 text-sm rounded-md bg-[#1F1F1F] border border-[#30D5C8] text-white focus:outline-none focus:ring-2 focus:ring-[#30D5C8] transition"
                >
                  <option value="">-- Select Difficulty --</option>
                  {difficulties.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.level}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                {/* Jurisdiction Dropdown */}
                <label className="block text-sm text-white font-medium mb-2">
                  Select Jurisdiction
                </label>
                <select
                  name="jurisdiction"
                  value={form.jurisdiction}
                  onChange={handleChange}
                  className="w-full mb-4 px-4 py-2.5 text-sm rounded-md bg-[#1F1F1F] border border-[#30D5C8] text-white focus:outline-none focus:ring-2 focus:ring-[#30D5C8] transition"
                >
                  <option value="">-- Select Jurisdiction --</option>
                  {jurisdictions.map((j) => (
                    <option key={j._id} value={j._id}>
                      {j.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button type="submit" disabled={generating} className="btn-primary">
              {generating ? "Generating..." : "Generate Case"}
            </button>
          </form>

          {caseOutput && (
            <div className="mt-8 p-6 bg-gray-900 rounded-2xl text-white space-y-6">
              <h3 className="text-xl font-semibold text-[#30D5C8]">
                Generated Case
              </h3>

              <div>
                <h4 className="font-bold text-lg mb-1">Fact Pattern</h4>
                <p className="text-gray-300 whitespace-pre-line">
                  {caseOutput.factPattern}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Witness Statement</h4>
                <p className="text-gray-300 whitespace-pre-line">
                  {caseOutput.witnessStatement}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Supporting Document</h4>
                <p className="text-gray-300 whitespace-pre-line">
                  {caseOutput.supportingDocument}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CaseGenerator;
