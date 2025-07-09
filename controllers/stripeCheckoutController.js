const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User");

const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure subscription object exists
    if (!user.subscription) {
      user.subscription = {};
    }

    // Create Stripe customer if not already created
    let customerId = user.subscription.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user._id.toString() },
      });

      customerId = customer.id;
      user.subscription.stripeCustomerId = customerId;
    }

    await user.save(); // Save customer ID before session creation

    // Create Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customerId,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Stripe recurring price ID
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.CLIENT_URL}/billing-success`,
      cancel_url: `${process.env.CLIENT_URL}/billing-cancel`,
    });

    // return res.status(200).json({ url: session.url });
    return res.status(200).json({ sessionId: session.id }); 

  } catch (err) {
    console.error("Stripe session error:", err);
    res.status(500).json({ message: "Stripe checkout error", error: err.message });
  }
};

module.exports = { createCheckoutSession };
