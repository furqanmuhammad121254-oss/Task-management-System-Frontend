
import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  User,
  FolderKanban,
  Settings,
  LogOut,
  ShieldAlert,
  Bell,
  Menu,
  X
} from "lucide-react";

const Layout = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    console.log("Logged out successfully");
    navigate("/login", { replace: true });
  };

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30 font-semibold"
      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 antialiased relative">

      {/* ================= MOBILE OVERLAY ================= */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside className={`
        w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full z-50 text-white
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

        {/* BRANDING/LOGO */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between lg:justify-start gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md shadow-blue-500/20">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-white leading-none">Employee</h2>
              <p className="text-[10px] text-slate-500 font-medium mt-1 tracking-wider uppercase">Management</p>
            </div>
          </div>
          
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* SIDEBAR NAVIGATION ITEMS */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-3">Main Menu</p>
          <ul className="space-y-1.5">

            {/* 1. Dashboard */}
            <li>
              <NavLink to="/layout/desboards" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <LayoutDashboard size={18} className="transition-transform group-hover:scale-105" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            {/* 2. Users */}
            <li>
              <NavLink to="/layout/member" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <Users size={18} className="transition-transform group-hover:scale-105" />
                <span>Members Team</span>
              </NavLink>
            </li>

            {/* Attendance */}
            <li>
              <NavLink to="/layout/attendace" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <FolderKanban size={18} className="transition-transform group-hover:scale-105" />
                <span>Attendance </span>
              </NavLink>
            </li>

            {/* Task Employees */}
            <li>
              <NavLink to="/layout/taskmanager" className={navLinkStyle} onClick={() => setIsMobileMenuOpen(false)}>
                <User size={18} className="transition-transform group-hover:scale-105" />
                <span>Task Employees</span>
              </NavLink>
            </li>

          </ul>
        </nav>

        
        

      </aside>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">

        {/* TOP NAVBAR */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 h-16 px-4 sm:px-6 flex justify-between items-center sticky top-0 z-20 shadow-sm">

          {/* LEFT CONTEXT TITLE & HAMBURGER */}
          <div className="flex items-center gap-3">
            {/* Hamburger Trigger for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl lg:hidden transition-colors"
            >
              <Menu size={20} />
            </button>

            
            
           
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-4">

         

            <div className="h-5 w-px bg-slate-200" />

            {/* Logout Trigger */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/60 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all active:scale-95 shadow-sm shadow-rose-100"
            >
              <LogOut size={14} />
              <span className="hidden xs:inline">Sign Out</span>
            </button>
          </div>

        </header>

        {/* WORKSPACE INJECTED CONTENT PAGE */}
        <main className="p-4 sm:p-6 bg-slate-50 min-h-[calc(100vh-4rem)] flex-grow animate-fade-in">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Layout;