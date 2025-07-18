const User = require("../../models/User");
const Case = require("../../models/Case");
const Subscription = require("../../models/Subscription");
const moment = require("moment");

const getAdminStats = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();

    // Total cases
    const totalCases = await Case.countDocuments();

    // Active subscriptions
    const activeSubscriptions = await Subscription.countDocuments({
      status: "active",
    });

    // Today’s cases
    const startOfToday = moment().startOf("day").toDate();
    const endOfToday = moment().endOf("day").toDate();
    const todaysCases = await Case.countDocuments({
      createdAt: { $gte: startOfToday, $lte: endOfToday },
    });

    // Case generation trend - past 4 weeks
    const trend = [];
    for (let i = 3; i >= 0; i--) {
      const start = moment().subtract(i, "weeks").startOf("week").toDate();
      const end = moment().subtract(i, "weeks").endOf("week").toDate();

      const count = await Case.countDocuments({
        createdAt: { $gte: start, $lte: end },
      });

      trend.push({
        week: `Week ${4 - i}`,
        count,
      });
    }

    return res.status(200).json({
      overview: {
        totalUsers,
        totalCases,
        activeSubscriptions,
        todaysCases,
      },
      caseTrend: trend,
    });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAdminStats,
};
