import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { loadStripe } from "@stripe/stripe-js";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { LuCircleCheck, LuCircleX } from "react-icons/lu";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Billing = () => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const res = await axios.get(API_PATHS.AUTH.GET_PROFILE);
      setSubscription(res.data.subscription);
    } catch (error) {
      console.error("Error fetching subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      setButtonLoading(true);
      const res = await axios.post(API_PATHS.BILLING.CREATE_CHECKOUT_SESSION);
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setCancelLoading(true);
      await axios.post(API_PATHS.BILLING.CANCEL_SUBSCRIPTION);
      await fetchSubscription();
    } catch (error) {
      console.error("Cancel subscription error:", error);
    } finally {
      setCancelLoading(false);
    }
  };

  const renderSubscriptionInfo = () => {
    if (!subscription || subscription.status !== "active") {
      return (
        <div className="flex items-center gap-3 text-red-400 bg-red-950/30 border border-red-500/30 p-4 rounded-xl">
          <LuCircleX className="w-6 h-6" />
          <span>You don’t have an active subscription.</span>
        </div>
      );
    }

    return (
      <div className="bg-[#0c0c0c]/60 backdrop-blur border border-green-500/30 p-5 rounded-xl text-green-200 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <LuCircleCheck className="w-6 h-6 text-green-400" />
            Plan: {subscription.plan}
          </div>
          <span className="bg-green-600/10 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
            {subscription.status}
          </span>
        </div>
        <p className="text-sm text-green-300">
          <strong>Renews On:</strong>{" "}
          {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
        </p>
      </div>
    );
  };

  return (
    <DashboardLayout activeMenu="Billing">
      <div className="mt-5 mb-10">
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-xl font-medium text-white">Subscription Plan</h2>
        </div>

        <div className="max-w-full mx-auto p-8 mt-8 bg-black/60 backdrop-blur-md border border-[#30D5C8]/20 rounded-2xl shadow-lg shadow-[#30D5C8]/10">
          {loading ? (
            <div className="text-gray-300">Loading subscription details...</div>
          ) : (
            <>
              <section className="mb-6">{renderSubscriptionInfo()}</section>

              <section className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleSubscribe}
                  disabled={buttonLoading}
                  className="bg-[#30D5C8]/90 hover:bg-[#30D5C8] text-black font-semibold px-6 py-3 rounded-xl transition disabled:opacity-50 cursor-pointer"
                >
                  {buttonLoading
                    ? "Redirecting..."
                    : subscription?.status === "active"
                    ? "Manage Subscription"
                    : "Subscribe Now"}
                </button>

                {subscription?.status === "active" && (
                  <button
                    onClick={handleCancelSubscription}
                    disabled={cancelLoading}
                    className="bg-red-400/10 hover:bg-red-500/20 text-red-300 font-semibold px-6 py-3 rounded-xl transition disabled:opacity-50 cursor-pointer"
                  >
                    {cancelLoading ? "Cancelling..." : "Cancel Subscription"}
                  </button>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
