import React, { useContext } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContet";

const UserDashboard = () => {
    useUserAuth();

    const { user } = useContext(UserContext);
    return (
        <div>
            User Dashboard

            {JSON.stringify(user)}
        </div>
    )
}

export default UserDashboard;