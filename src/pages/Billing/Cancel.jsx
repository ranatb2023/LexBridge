import React from "react";
import { Link } from "react-router-dom";
import { LuCircleX } from "react-icons/lu";

const Cancel = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <LuCircleX className="text-red-500 w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-red-400 mb-2">Subscription Cancelled</h1>
        <p className="mb-6 text-gray-300 text-sm">
          You cancelled the checkout process. Your subscription has not been activated.
        </p>
        <Link
          to="/billing"
          className="inline-block bg-[#30D5C8] text-black font-semibold py-2 px-6 rounded-xl hover:bg-teal-400 transition"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
