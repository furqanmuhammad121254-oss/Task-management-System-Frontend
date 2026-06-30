import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const AdminWarningPanel = () => {
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  // Track dismissed members locally so they disappear when you hit "Dismiss"
  const [dismissedMemberIds, setDismissedMemberIds] = useState(new Set());

  const fetchData = async () => {
    try {
      setLoading(true);

      const [memberRes, projectRes] = await Promise.all([
        axios.get("http://localhost:5000/api/members"),
        axios.get("http://localhost:5000/api/projects"),
      ]);

      setMembers(memberRes.data || []);
      setProjects(projectRes.data || []);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allTasks = useMemo(() => {
    return projects.flatMap((project) =>
      (project.tasks || []).map((task) => ({
        ...task,
        projectId: project._id,
      }))
    );
  }, [projects]);

  const warningMembers = useMemo(() => {
    return members.map((member) => {
      // Fixed logic: Changed default warning from 1 back to 0 so clean members start at zero base
      let warning = 0;
      let overdue = 0;

      allTasks.forEach((task) => {
        const assignedId =
          typeof task.member === "object"
            ? task.member._id
            : task.member;

        if (String(assignedId) === String(member._id)) {
          const status = (task.status || "").toLowerCase();
          if (status === "completed" || status === "done") return;

          const today = new Date();
          const end = new Date(task.endDate);

          today.setHours(0, 0, 0, 0);
          end.setHours(0, 0, 0, 0);

          const diff = (end - today) / (1000 * 60 * 60 * 24);

          if (diff < 0) overdue++;
          else if (diff <= 2) warning++;
        }
      });

      return { ...member, warning, overdue };
    });
  }, [members, allTasks]);

  // Filter out members who don't have issues OR have been explicitly dismissed by the admin
  const flaggedMembers = useMemo(() => {
    return warningMembers.filter(
      (m) => (m.warning > 0 || m.overdue > 0) && !dismissedMemberIds.has(m._id)
    );
  }, [warningMembers, dismissedMemberIds]);

  // Dynamic Metrics for Dashboard Header
  const totalOverdueTasks = flaggedMembers.reduce((acc, curr) => acc + curr.overdue, 0);
  const totalWarnings = flaggedMembers.reduce((acc, curr) => acc + curr.warning, 0);

  const handleDismissWarning = (memberId) => {
    setDismissedMemberIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(memberId);
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium animate-pulse">Loading admin control panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Warning Panel</h1>
            <p className="text-slate-500 mt-1">Monitor project delays, due dates, and manage team alerts.</p>
          </div>
          
          {/* Quick Overview Badges */}
          <div className="flex gap-3">
            <div className="bg-red-50 border border-red-200 px-4 py-2 rounded-xl text-center shadow-sm">
              <span className="block text-xs font-semibold text-red-500 uppercase tracking-wider">Total Overdue</span>
              <span className="text-xl font-bold text-red-700">{totalOverdueTasks}</span>
            </div>
            <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-xl text-center shadow-sm">
              <span className="block text-xs font-semibold text-amber-500 uppercase tracking-wider">Active Warnings</span>
              <span className="text-xl font-bold text-amber-700">{totalWarnings}</span>
            </div>
          </div>
        </div>

        {/* Main Content View */}
        {flaggedMembers.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm max-w-xl mx-auto mt-12">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">
              ✓
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">System is Clear</h3>
            <p className="text-slate-500">No members currently have overdue assignments or upcoming warnings. Everyone is on track! 🎉</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {flaggedMembers.map((m) => (
              <div
                key={m._id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Member Profile */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 border border-slate-200">
                    {m.name ? m.name.charAt(0).toUpperCase() : "?"}
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg">{m.name}</h2>
                    <p className="text-xs font-medium text-indigo-600 bg-indigo-50 inline-block px-2 py-0.5 rounded-md mt-0.5">
                      {m.role || "Team Member"}
                    </p>
                  </div>
                </div>

                {/* Counter Elements & Controls */}
                <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-none pt-4 sm:pt-0">
                  <div className="flex gap-4 text-sm font-semibold">
                    {m.overdue > 0 && (
                      <div className="bg-red-50 border border-red-100 text-red-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Overdue: {m.overdue}
                      </div>
                    )}
                    {m.warning > 0 && (
                      <div className="bg-amber-50 border border-amber-100 text-amber-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        Warning: {m.warning}
                      </div>
                    )}
                  </div>

                  {/* Dismiss/Clear Alert Button */}
                  <button
                    onClick={() => handleDismissWarning(m._id)}
                    className="group flex items-center justify-center bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 hover:border-red-200 px-3 py-2 rounded-xl transition-all duration-150 text-sm font-medium shadow-sm active:scale-95"
                    title="Dismiss alert for this session"
                  >
                    Clear Alert
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWarningPanel;