const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  role: { type: String, enum: ['guest', 'member', 'admin'], default: 'member' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  oauthProvider: String,
  oauthId: String,
  subscription: {
    status: {
        type: String,
        enum: ['active', 'canceled', 'past_due', 'incomplete', 'incomplete_expired', 'trialing', 'unpaid'],
        default: 'canceled'
    },
    plan: String,
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    currentPeriodEnd: Date,
  },
  usage: {
    casesGenerated: { type: Number, default: 0 },
    tokensUsed: { type: Number, default: 0 },
  }
});

module.exports = mongoose.model('User', userSchema);
