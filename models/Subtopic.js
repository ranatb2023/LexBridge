const mongoose = require('mongoose');

const subtopicSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  name: { type: String, required: true },
  promptModifier: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subtopic', subtopicSchema);
