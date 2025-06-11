import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom"
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PracticeLaw from "./pages/LandingPages/PracticeLaw";
import Dashboard from "./pages/Admin/Dashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import UserDashboard from "./pages/User/UserDashboard";
import MyTasks from "./pages/User/MyTasks";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";
import PrivateRoute from "./routes/PrivateRoute";

import UserProvider, { UserContext } from "./context/UserContet";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PracticeLaw />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />}  />
              <Route path="/admin/users" element={<ManageUsers />}  />
            </Route>

            {/* User Routes */}
            <Route element={<PrivateRoute allowedRoles={["user"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />}  />
              <Route path="/user/tasks" element={<MyTasks />} />
              <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
            </Route>

            {/* For redirecting index route to login screen or to dashboard*/}
            {/* Default Route */}
            {/* <Route path="/" element={<Root />} /> */}

          </Routes>
        </Router>
      </div>
    </UserProvider>
    
  )
}

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