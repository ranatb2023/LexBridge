const mongoose = require('mongoose');

const billingLogSchema = new mongoose.Schema({
  event: String,
  rawPayload: mongoose.Schema.Types.Mixed,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BillingLog', billingLogSchema);
