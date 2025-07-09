const Case = require("../models/Case");
const Topic = require("../models/Topic");
const Subtopic = require("../models/Subtopic");
const Difficulty = require("../models/Difficulty");
const Jurisdiction = require("../models/Jurisdiction");
const User = require("../models/User");

const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// @desc Generate a new fictional legal case
// @route POST /api/cases/generate
// @access Private
const generateCase = async (req, res) => {
  try {
    const userId = req.user.id;
    const { topicId, subtopicId, difficultyId, jurisdictionId, customTopic } = req.body;

    // Validate all inputs
    if (!topicId || !subtopicId || !difficultyId || !jurisdictionId || !customTopic) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [topic, subtopic, difficulty, jurisdiction, user] = await Promise.all([
      Topic.findById(topicId),
      Subtopic.findById(subtopicId),
      Difficulty.findById(difficultyId),
      Jurisdiction.findById(jurisdictionId),
      User.findById(userId),
    ]);

    if (!topic || !subtopic || !difficulty || !jurisdiction || !user) {
      return res.status(404).json({ message: "Invalid data provided" });
    }

    // Combine prompt parts
    const fullPrompt = `
${topic.basePrompt}

Focus: ${subtopic.promptModifier}
Complexity: ${difficulty.complexityPrompt}
Jurisdiction: ${jurisdiction.legalFrameworkPrompt}

Custom Topic: ${customTopic}

Generate a fictional legal case including:
1. Fact Pattern
2. Witness Statement
3. Supporting Document (e.g., police report, contract, legal memo)
Use a realistic legal tone and clearly label each section.
    `.trim();

    // Send to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: fullPrompt }],
      temperature: 0.8,
    });

    const content = response.choices[0].message.content;

    // Optional: extract sections (basic method)
    const factPattern = content.match(/Fact Pattern[:\n](.*?)(?=Witness Statement|$)/s)?.[1]?.trim() || "";
    const witnessStatement = content.match(/Witness Statement[:\n](.*?)(?=Supporting Document|$)/s)?.[1]?.trim() || "";
    const supportingDocument = content.match(/Supporting Document[:\n](.*)/s)?.[1]?.trim() || "";

    // Save to DB
    const newCase = await Case.create({
      userId,
      topicId,
      subtopicId,
      difficultyId,
      jurisdictionId,
      fullPrompt,
      generatedContent: {
        factPattern,
        witnessStatement,
        supportingDocument,
      },
    });

    // Update user usage
    user.usage.casesGenerated += 1;
    await user.save();

    res.status(201).json(newCase);

  } catch (error) {
    console.error("Case generation error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get all cases by logged-in user (paginated)
// @route GET /api/cases
// @access Private
const getUserCases = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Case.countDocuments({ userId });
    const cases = await Case.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("topicId subtopicId difficultyId jurisdictionId", "name level");

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: cases,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get single case by ID
// @route GET /api/cases/:id
// @access Private
const getSingleCase = async (req, res) => {
  try {
    const singleCase = await Case.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).populate("topicId subtopicId difficultyId jurisdictionId", "name level");

    if (!singleCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.status(200).json(singleCase);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Export case content as plain text
// @route GET /api/cases/:id/export
// @access Private
const exportCaseAsText = async (req, res) => {
  try {
    const singleCase = await Case.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!singleCase) {
      return res.status(404).json({ message: "Case not found" });
    }

    const { factPattern, witnessStatement, supportingDocument } = singleCase.generatedContent;
    const textOutput = `--- Fictional Legal Case Export ---\n\nFact Pattern:\n${factPattern}\n\nWitness Statement:\n${witnessStatement}\n\nSupporting Document:\n${supportingDocument}`;

    res.setHeader("Content-Disposition", `attachment; filename=legal-case-${singleCase._id}.txt`);
    res.setHeader("Content-Type", "text/plain");
    res.send(textOutput);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


module.exports = {
  generateCase,
  getUserCases,
  getSingleCase,
  exportCaseAsText,
};

