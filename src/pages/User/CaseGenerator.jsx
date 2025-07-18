import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

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

  // Fetch dropdown data
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
      <div className="mt-6 mb-10">
        <h2 className="text-2xl font-semibold text-white">Generate Case</h2>

        <div className="mt-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Select Topic", name: "topic", options: topics },
              { label: "Select Subtopic", name: "subtopic", options: subtopics },
              { label: "Select Difficulty", name: "difficulty", options: difficulties, key: "level" },
              { label: "Select Jurisdiction", name: "jurisdiction", options: jurisdictions },
            ].map(({ label, name, options, key = "name" }, i) => (
              <div key={i}>
                <label className="block text-sm text-white font-medium mb-1">
                  {label}
                </label>
                <select
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm rounded-lg bg-[#1F1F1F]/60 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#30D5C8] transition backdrop-blur-sm"
                >
                  <option value="">-- {label} --</option>
                  {options.map((opt) => (
                    <option key={opt._id} value={opt._id}>
                      {opt[key]}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div className="md:col-span-2">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <button
                type="submit"
                disabled={generating}
                className="mt-4 w-full py-2.5 bg-[#30D5C8] hover:bg-[#2ac9be] text-black font-medium rounded-lg shadow-md transition cursor-pointer"
              >
                {generating ? "Generating..." : "Generate Case"}
              </button>
            </div>
          </form>

          {caseOutput && (
            <div className="mt-10 p-6 rounded-2xl bg-[#1A1A1A]/80 backdrop-blur-md border border-white/10 text-white space-y-6 shadow-lg">
              <h3 className="text-xl font-semibold text-[#30D5C8]">
                Generated Case
              </h3>

              {[
                { label: "Fact Pattern", value: caseOutput.factPattern },
                { label: "Witness Statement", value: caseOutput.witnessStatement },
                { label: "Supporting Document", value: caseOutput.supportingDocument },
                { label: "Student Task", value: caseOutput.taskPrompt },
              ].map(
                (section, idx) =>
                  section.value && (
                    <div key={idx}>
                      <h4 className="font-bold text-lg mb-1">{section.label}</h4>
                      <p className="text-gray-300 whitespace-pre-line">{section.value}</p>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CaseGenerator;
