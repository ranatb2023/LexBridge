import React from "react";
import { LuMail, LuUserCog, LuCircleCheck } from "react-icons/lu";
import ProfilePic from "../../assets/images/profile-pic.jpeg";

const UserCard = ({ userInfo }) => {
  const isSubscribed = userInfo?.subscription?.status === "active";

  return (
    <div className="user-card p-4 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={userInfo?.profileImageUrl || ProfilePic}
          alt={`Avatar`}
          className="w-14 h-14 rounded-full border-2 border-[#30D5C8]"
        />
        <div>
          <p className="text-sm font-semibold text-white">{userInfo?.name}</p>
          <p className="text-xs text-gray-300">{userInfo?.email}</p>
        </div>
      </div>

      <div className="flex items-center text-xs text-gray-400 gap-2 mb-2">
        <LuMail className="text-[#30D5C8]" />
        <span>{userInfo?.email}</span>
      </div>

      <div className="flex items-center text-xs text-gray-400 gap-2 mb-2">
        <LuUserCog className="text-[#30D5C8]" />
        <span className="capitalize">{userInfo?.role || "User"}</span>
      </div>

      <div className="mt-3">
        {isSubscribed ? (
          <span className="flex items-center text-green-400 text-xs font-medium gap-1">
            <LuCircleCheck className="w-4 h-4" />
            Active Subscription
          </span>
        ) : (
          <span className="text-xs text-red-400">No active subscription</span>
        )}
      </div>
    </div>
  );
};

export default UserCard;
