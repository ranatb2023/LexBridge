import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PracticeLaw from "./pages/LandingPages/PracticeLaw";
import Dashboard from "./pages/Admin/Dashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import UserDashboard from "./pages/User/UserDashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Billing from "./pages/Billing/Billing";
import SubscriptionRoute from "./routes/SubscriptionRoute";
import CaseGenerator from "./pages/User/CaseGenerator";
import CaseDashboard from "./pages/User/CaseDashboard";
import BillingSuccess from "./pages/Billing/Success";
import BillingCancel from "./pages/Billing/Cancel";

import UserProvider, { UserContext } from "./context/UserContext";
import CaseRequirements from "./pages/Admin/CaseRequirements";
import CaseDetails from "./pages/User/CaseDetails";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PracticeLaw />} />

            {/* Billing Pages */}
            <Route path="user/billing" element={<Billing />} />
            <Route path="user/billing-success" element={<BillingSuccess />} />
            <Route path="user/billing-cancel" element={<BillingCancel />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/case-requirements" element={<CaseRequirements />} />
            </Route>

            {/* User Routes */}
            <Route element={<PrivateRoute allowedRoles={["user"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/admin/cases/:id" element={<CaseDetails />} />


              {/* New Subscription-Protected Routes */}
              <Route
                path="/user/generate-case"
                element={
                  <SubscriptionRoute>
                    <CaseGenerator />
                  </SubscriptionRoute>
                }
              />
              <Route
                path="/user/cases"
                element={
                  <SubscriptionRoute>
                    <CaseDashboard />
                  </SubscriptionRoute>
                }
              />
            </Route>

            {/* For redirecting index route to login screen or to dashboard*/}
            {/* Default Route */}
            {/* <Route path="/" element={<Root />} /> */}
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;

// const Root = () => {
//   const { user, loading } = useContext(UserContext);

//   if(loading) return <Outlet />

//   if(!user) {
//     return <Navigate to="/login" />;
//   }

//   return user.role === "admin" ? (
//     <Navigate to="/admin/dashboard" />
//   ) : (
//     <Navigate to="/user/dashboard" />
//   );
// };
