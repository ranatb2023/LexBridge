import React, { useContext } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import moment from "moment";

const Dashboard = () => {
    useUserAuth();

    const { user } = useContext(UserContext);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="card my-5">
                <div>
                    <div className="col-span-3">
                        <h2 className="text-xl md:text-2xl">
                            Good Morning! {user?.name}
                        </h2>
                        <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
                            {moment().format("dddd Do MMM YYYY")}
                        </p>
                    </div>
                </div>
            </div>
            Dashboard
        </DashboardLayout>
    )
}

export default Dashboard;