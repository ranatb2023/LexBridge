const User = require("../models/User");
const Subscription = require("../models/Subscription");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Utility function to safely convert UNIX timestamp to Date
const toDateOrNull = (timestamp) => {
  if (!timestamp || isNaN(timestamp)) return null;
  const date = new Date(timestamp * 1000);
  return isNaN(date.getTime()) ? null : date;
};

const handleStripeWebhook = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("❌ Stripe webhook signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const data = event.data.object;
    const eventType = event.type;

    console.log("📬 Webhook event received:", eventType);

    // ✅ Checkout completed
    if (eventType === "checkout.session.completed") {
      const session = data;

      const customerEmail = session.customer_details?.email;
      const stripeCustomerId = session.customer;
      const stripeSubscriptionId = session.subscription;

      if (!customerEmail || !stripeSubscriptionId) {
        console.warn("⚠️ Missing customer email or subscription ID");
        return res.status(400).send("Missing Stripe session fields.");
      }

      const user = await User.findOne({ email: customerEmail });
      if (!user) {
        console.warn("⚠️ User not found for email:", customerEmail);
        return res.status(404).json({ message: "User not found" });
      }

      const now = new Date();
      const oneMonthLater = new Date();
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

      user.subscription = {
        status: "active",
        plan: "unknown",
        stripeCustomerId,
        stripeSubscriptionId,
        currentPeriodEnd: oneMonthLater, // fallback for now; Stripe will send real date in next event
      };
      await user.save();

      await Subscription.findOneAndUpdate(
        { stripeSubscriptionId },
        {
          userId: user._id,
          stripeCustomerId,
          stripeSubscriptionId,
          plan: "unknown",
          status: "active",
          currentPeriodStart: now,
          currentPeriodEnd: oneMonthLater,
          cancelAtPeriodEnd: false,
          updatedAt: new Date(),
        },
        { upsert: true }
      );

      console.log("✅ Subscription recorded for:", user.email);
    }

    // ✅ Subscription created/updated/cancelled
    if (eventType.startsWith("customer.subscription")) {
      const user = await User.findOne({
        "subscription.stripeCustomerId": data.customer,
      });

      if (!user) {
        console.warn("⚠️ User not found for Stripe customer:", data.customer);
        return res.status(404).json({ message: "User not found" });
      }

      const planId = data.items?.data[0]?.price?.id || "unknown";

      const periodStart = toDateOrNull(data.current_period_start);
      const periodEnd = toDateOrNull(data.current_period_end);

      user.subscription.status = data.status;
      user.subscription.plan = planId;
      user.subscription.stripeSubscriptionId = data.id;
      user.subscription.currentPeriodEnd = periodEnd;
      await user.save();

      await Subscription.findOneAndUpdate(
        { stripeSubscriptionId: data.id },
        {
          userId: user._id,
          stripeCustomerId: data.customer,
          stripeSubscriptionId: data.id,
          plan: planId,
          status: data.status,
          currentPeriodStart: periodStart,
          currentPeriodEnd: periodEnd,
          cancelAtPeriodEnd: data.cancel_at_period_end,
          updatedAt: new Date(),
        },
        { upsert: true }
      );

      console.log("🔁 Subscription updated for:", user.email);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("❌ Webhook handler error:", error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

module.exports = { handleStripeWebhook };
