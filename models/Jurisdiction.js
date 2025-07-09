const mongoose = require('mongoose');

const jurisdictionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  legalFrameworkPrompt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Jurisdiction', jurisdictionSchema);
