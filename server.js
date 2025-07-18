require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")
// const userRoutes = require("./routes/userRoutes")
const landingPageRoutes = require("./routes/landingPageRoutes")
const topicRoutes = require("./routes/admin/topicRoutes");
const subtopicRoutes = require("./routes/admin/subtopicRoutes");
const difficultyRoutes = require("./routes/admin/difficultyRoutes");
const jurisdictionRoutes = require("./routes/admin/jurisdictionRoutes");
const caseRoutes = require("./routes/caseRoutes");
const caseAdminRoutes = require("./routes/admin/caseAdminRoutes");
const adminRoutes = require("./routes/admin/adminRoutes");
const stripeWebhookRoutes = require("./routes/stripeWebhookRoutes");
const stripeCheckoutRoutes = require("./routes/stripeCheckoutRoutes");
const optionRoutes = require("./routes/public/optionRoutes");

const app = express();

// Middleware to Handle CORS
app.use(
    cors({
        // origin: ["http://lexbridge.co"],
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

// Connect Database
connectDB();

app.use("/api/stripe/webhook", stripeWebhookRoutes); // early so body not parsed
app.use("/api/stripe", stripeCheckoutRoutes); // NOT /webhook — just /stripe
// Middleware
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes);

// Serve the uploads folder publicly
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use("/api/landing-page", landingPageRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/reports", reportRoutes);

app.use("/api/admin/topics", topicRoutes);
app.use("/api/admin/subtopics", subtopicRoutes);
app.use("/api/admin/difficulties", difficultyRoutes);
app.use("/api/admin/jurisdictions", jurisdictionRoutes);

app.use("/api/cases", caseRoutes);
app.use("/api/admin/cases", caseAdminRoutes);
app.use("/api/options", optionRoutes);
app.use("/api/admin", adminRoutes);

// app.use("/api/stripe", stripeWebhookRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));