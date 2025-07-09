import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const SubscriptionRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        const subStatus = res.data?.subscription?.status;
        setHasSubscription(subStatus === "active");
      } catch (error) {
        console.error("Subscription check failed:", error);
        setHasSubscription(false);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!hasSubscription) return <Navigate to="/user/billing" replace />;
  return children;
};

export default SubscriptionRoute;
