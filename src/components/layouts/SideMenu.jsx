import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import ProfilePic from "../../assets/images/profile-pic.jpeg";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
    } else {
      navigate(route);
    }
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-black/60 backdrop-blur-md border-r border-[#30D5C8]/30 shadow-2xl sticky top-[61px] z-20 rounded-tr-2xl rounded-br-2xl transition-all">
      <div className="flex flex-col items-center justify-center mb-8 pt-6">
        <div className="relative shadow-md rounded-full">
          <img
            src={user?.profileImageUrl || ProfilePic}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-[#30D5C8] shadow-lg"
          />
        </div>

        {user?.role === "admin" && (
          <div className="text-[10px] uppercase font-semibold text-black bg-[#30D5C8] px-3 py-0.5 rounded-full mt-2 shadow-md">
            Admin
          </div>
        )}

        <h5 className="text-white font-semibold mt-3 text-lg">{user?.name}</h5>
        <p className="text-[12px] text-white/70">{user?.email}</p>
      </div>

      <div className="px-4">
        {sideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            className={`w-full flex items-center gap-3 text-sm font-medium px-4 py-3 mb-3 rounded-xl transition-all duration-300 cursor-pointer
    ${
      activeMenu === item.label
        ? "bg-[#30D5C8]/20 backdrop-blur-md border border-white/10 shadow-md shadow-[#30D5C8]/40 text-white"
        : "text-white/80 hover:text-white bg-transparent hover:bg-white/5"
    }`}
          >
            <item.icon
              className={`text-xl ${
                activeMenu === item.label ? "text-[#30D5C8]" : "text-white/70"
              }`}
            />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
