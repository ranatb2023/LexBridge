import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-[#30D5C8] mb-4">Subscription Active</h1>
        <p className="mb-6 text-gray-300">
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
