const mongoose = require('mongoose');

const difficultySchema = new mongoose.Schema({
  level: { type: String, enum: ['Intermediate', 'Advanced'], required: true },
  description: String,
  complexityPrompt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Difficulty', difficultySchema);
