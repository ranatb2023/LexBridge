const User = require("../models/User");
const Subscription = require("../models/Subscription");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handleStripeWebhook = async (req, res) => {
  try {
    console.log("📬 Received webhook:", req.headers["stripe-signature"]);

    const sig = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    const data = event.data.object;
    console.log("📦 Event type:", event.type);
    console.log("📊 Event data:", data);


    // Subscription events
    if (event.type.includes("customer.subscription")) {
      const user = await User.findOne({ "subscription.stripeCustomerId": data.customer });

      if (!user) {
        return res.status(404).json({ message: "User not found for Stripe customer" });
      }

      // Update User subscription status
      user.subscription.status = data.status;
      user.subscription.plan = data.items?.data[0]?.price?.id || "unknown";
      user.subscription.stripeSubscriptionId = data.id;
      user.subscription.currentPeriodEnd = new Date(data.current_period_end * 1000);
      await user.save();

      // Log in Subscription model
      await Subscription.findOneAndUpdate(
        { stripeSubscriptionId: data.id },
        {
          userId: user._id,
          stripeCustomerId: data.customer,
          stripeSubscriptionId: data.id,
          plan: data.items?.data[0]?.price?.id || "unknown",
          status: data.status,
          currentPeriodStart: new Date(data.current_period_start * 1000),
          currentPeriodEnd: new Date(data.current_period_end * 1000),
          cancelAtPeriodEnd: data.cancel_at_period_end,
          updatedAt: new Date(),
        },
        { upsert: true }
      );

      return res.status(200).json({ received: true });
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

module.exports = { handleStripeWebhook };
