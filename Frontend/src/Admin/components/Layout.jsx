
// import React from "react";
// import { Outlet, Link, useNavigate } from "react-router-dom";
// import api from "../../service/api.js";
// import {LogOut} from "lucide-react";

// const Layout = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await api.post("/user/logout");

//       // clear all auth data
//       localStorage.removeItem("user");
//       localStorage.removeItem("token"); // if you store token separately

//       // optional: full reset (safe)
//       sessionStorage.clear();

//       navigate("/login", { replace: true });

//     } catch (error) {
//       console.log("Logout error:", error);

//       // fallback logout (if backend fails)
//       localStorage.clear();
//       navigate("/login", { replace: true });
//     }
//   };

//   return (
//     <div className="flex h-screen">

//       {/* SIDEBAR */}
//       <div className="w-64 bg-sky-950 text-white p-4">
//         <h2 className="text-2xl font-bold mb-6">Menu</h2>

//         <ul className="space-y-1.5">

//           <li>
//             <Link
//               to="/admin/dashboard"
//               className="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-sky-200 hover:bg-sky-900 hover:text-white"
//             >
//               Dashboard
//             </Link>
//           </li>

//           <li>
//             <Link
//               to="/admin/users"
//               className="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-sky-900"
//             >
//               Users
//             </Link>
//           </li>

//            <li>
//             <Link
//               to="/admin/project"
//               className="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-sky-900"
//             >
//               Projects
//             </Link>
//           </li>

//            <li>
//             <Link
//               to="/admin/members"
//               className="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-sky-900"
//             >
//               Members
//             </Link>
//           </li>

//            <li>
//             <Link
//               to="/admin/attendance"
//               className="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-sky-900"
//             >
//               Attendance
//             </Link>
//           </li>
          
//            <li>
//             <Link
//               to="/admin/memberwarning"
//               className="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-sky-200 hover:bg-sky-900 hover:text-white"
//             >
//               Member Warning
//             </Link>
//           </li>


//           <li>
//             <Link
//               to="/admin/profile"
//               className="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-sky-200 hover:bg-sky-900 hover:text-white"
//             >
//               Profile
//             </Link>
//           </li>

         
//         </ul>
//       </div>

//       {/* MAIN AREA */}
//       <div className="flex-1 flex flex-col">

//         {/* NAVBAR */}
//         <div className="bg-sky-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
//           <h1 className="text-xl font-bold">Admin Panel</h1>

//           <button
//             onClick={handleLogout}
//             className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/60 px-3.5 py-2 rounded-xl transition-all active:scale-95 shadow-sm shadow-rose-100"
//           >
//             <LogOut size={14} />
//             <span>Sign Out</span>
//           </button>
//         </div>

//         {/* CONTENT */}
//         <div className="flex-1">
//           <Outlet />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Layout;


import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import api from "../../service/api.js";
import { 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  UserSquare2, 
  CalendarCheck, 
  AlertTriangle, 
  User 
} from "lucide-react";

const Layout = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/user/logout");

      // clear all auth data
      localStorage.removeItem("user");
      localStorage.removeItem("token"); 

      // optional: full reset (safe)
      sessionStorage.clear();
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Logout error:", error);

      // fallback logout (if backend fails)
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  // Modern Navigation Link Styling with Active State indicator
  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
      isActive
        ? "bg-sky-600 text-white shadow-lg shadow-sky-900/40 font-semibold"
        : "text-sky-200 hover:bg-sky-900/60 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 antialiased relative">

      {/* ================= MOBILE MENU OVERLAY ================= */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside className={`
        w-64 bg-sky-950 border-r border-sky-900 flex flex-col fixed h-full z-50 text-white
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

        {/* BRANDING / LOGO */}
        <div className="p-6 border-b border-sky-900 flex items-center justify-between lg:justify-start gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="bg-sky-600 p-2 rounded-xl text-white shadow-md shadow-sky-500/20">
              <UserSquare2 size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-white leading-none">Admin</h2>
              <p className="text-[10px] text-sky-400 font-medium mt-1 tracking-wider uppercase">Management</p>
            </div>
          </div>
          
          {/* Mobile Close Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-sky-300 hover:bg-sky-900 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* SIDEBAR NAVIGATION LINKS */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className="px-4 text-[11px] font-semibold text-sky-400 uppercase tracking-widest mb-3">Control Deck</p>
          <ul className="space-y-1.5">

            {/* 1. Dashboard */}
            <li>
              <NavLink to="/admin/dashboard" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <LayoutDashboard size={18} className="transition-transform group-hover:scale-105" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            {/* 2. Users */}
            <li>
              <NavLink to="/admin/users" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <Users size={18} className="transition-transform group-hover:scale-105" />
                <span>Users</span>
              </NavLink>
            </li>

            {/* 3. Projects */}
            <li>
              <NavLink to="/admin/project" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <FolderKanban size={18} className="transition-transform group-hover:scale-105" />
                <span>Projects</span>
              </NavLink>
            </li>

            {/* 4. Members */}
            <li>
              <NavLink to="/admin/members" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <Users size={18} className="transition-transform group-hover:scale-105" />
                <span>Members</span>
              </NavLink>
            </li>

            {/* 5. Attendance */}
            <li>
              <NavLink to="/admin/attendance" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <CalendarCheck size={18} className="transition-transform group-hover:scale-105" />
                <span>Attendance</span>
              </NavLink>
            </li>
            
            {/* 6. Member Warning */}
            <li>
              <NavLink to="/admin/memberwarning" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <AlertTriangle size={18} className="transition-transform group-hover:scale-105" />
                <span>Member Warning</span>
              </NavLink>
            </li>

            {/* 7. Profile */}
            <li>
              <NavLink to="/admin/profile" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <User size={18} className="transition-transform group-hover:scale-105" />
                <span>Profile</span>
              </NavLink>
            </li>

          </ul>
        </nav>

        {/* SIDEBAR FOOTER METRIC */}
        <div className="p-4 border-t border-sky-900 bg-sky-950/40 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-900 border border-sky-800 flex items-center justify-center font-bold text-sm text-sky-300">
            AM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-sky-100 truncate">System Root Admin</p>
          </div>
        </div>

      </aside>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">

        {/* TOP NAVBAR */}
        <header className="bg-sky-900 text-white h-16 px-4 sm:px-6 flex justify-between items-center sticky top-0 z-20 shadow-md">

          {/* LEFT SECTION: HAMBURGER & TITLE */}
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Hamburger Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-sky-200 hover:bg-sky-800 rounded-xl lg:hidden transition-colors"
            >
              <Menu size={20} />
            </button>

            <h1 className="text-base sm:text-lg font-bold tracking-tight">Admin Panel</h1>
            <span className="hidden sm:inline-block h-4 w-px bg-sky-800" />
            <span className="hidden sm:inline-block text-[10px] bg-sky-950 px-2.5 py-1 rounded-md font-semibold text-sky-300 uppercase tracking-wider">
              Secure Core
            </span>
          </div>

          {/* RIGHT ACTION CONTROLS */}
          <div className="flex items-center gap-4">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/60 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all active:scale-95 shadow-sm shadow-rose-900/20"
            >
              <LogOut size={14} />
              <span className="hidden xs:inline">Sign Out</span>
            </button>
          </div>

        </header>

        {/* WORKSPACE CONTENT LAYOUT INJECTION */}
        <main className="p-4 sm:p-6 bg-slate-50 min-h-[calc(100vh-4rem)] flex-grow">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Layout;