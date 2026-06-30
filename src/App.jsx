import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Layouts from "./components/employeesidebar/Layouts";
import Desboards from "./Pages/Desboards";
import Member from "./Pages/Member"
import TaskManager from "./Pages/TaskManager";

// Empolyee 

import Layout from "./Admin/components/Layout";
import Desboard from "./Admin/pages/Desboard";
import Users from "./Admin/pages/Users";
import Profile from "./Admin/pages/Profile";
import ProjectManagment from "./Pages/ProjectManagment"
import Attendace from "./Pages/Attenddance"
{/* ADMIN LAYOUT */}

import PrivateRoutes from "./Admin/components/PrivateRoutes";
import PublicRoutes from "./Admin/components/EmployeeRoutes";
import EmployeeRoutes from "./Admin/components/EmployeeRoutes";
import Project from "./Admin/pages/Project";
import Members from "./Admin/pages/Members";
import AdminAttendance from "./Admin/pages/AdminAttenddance"
import MemberWarning from "./Admin/pages/MemberWarning";
// Auth 

import AdminSignup from "./Admin/pages/AdminSignup";
import AdminLogin from "./Admin/pages/AdminLogin";




const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<EmployeeRoutes />}>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* <Route element={<PublicRoutes />}> */}
        <Route path="/layout" element={<Layouts />}>
          <Route path="desboards" element={<Desboards />} />
          <Route path="member" element={<Member />} />
          <Route path="taskmanager" element={<TaskManager />} />
          <Route path="projectmanagment" element={<ProjectManagment />} />
          <Route path="attendace" element={<Attendace />} />
        </Route>
        {/* </Route> */}


        {/* ADMIN LAYOUT */}
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<Layout />}>
            <Route path="dashboard" element={<Desboard />} />
            <Route path="users" element={<Users />} />
            <Route path="project" element={<Project />} />
            <Route path="members" element={<Members />} />
            <Route path="profile" element={<Profile />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="memberwarning" element={<MemberWarning />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;