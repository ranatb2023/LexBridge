import React from "react";
import { Link } from "react-router-dom";
import { LuCircleCheck } from "react-icons/lu";

const Success = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <LuCircleCheck className="text-[#30D5C8] w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-[#30D5C8] mb-2">
          Subscription Active
        </h1>
        <p className="mb-6 text-gray-300 text-sm">
          Thank you! Your subscription is now active. You can now generate unlimited legal cases.
        </p>
        <Link
          to="/user/dashboard"
          className="inline-block bg-[#30D5C8] text-black font-semibold py-2 px-6 rounded-xl hover:bg-teal-400 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Success;
