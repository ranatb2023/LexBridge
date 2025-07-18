const mongoose = require('mongoose');

const adminLogSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminLog', adminLogSchema);
