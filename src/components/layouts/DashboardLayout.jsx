import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#101010] text-white">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          {/* Sidebar */}
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main Content */}
          <div className="grow mx-5 my-5 bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-lg shadow-[#30D5C8]/10 border border-white/10">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
