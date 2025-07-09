const requireSubscription = (req, res, next) => {
  const user = req.user;

  if (!user.subscription || user.subscription.status !== "active") {
    return res.status(403).json({
      message: "You need an active subscription to generate cases.",
    });
  }

  next();
};

module.exports = { requireSubscription };
