

import React, { useState, useEffect, useMemo } from "react";
import api from "../service/api.js"

const EmployeeDashboard = () => {
  const [showWarningMembers, setShowWarningMembers] = useState(false);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH DATA FROM API ----------------
  const fetchData = async () => {
    try {
      setLoading(true);

      const [memberRes, projectRes] = await Promise.all([
        api.get("/api/members"),
        api.get("/api/projects"),
      ]);

      setMembers(memberRes.data || []);
      setProjects(projectRes.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------- EXTRACT ALL NESTED TASKS ----------------
  const allTasks = useMemo(() => {
    return projects.flatMap((project) =>
      (project.tasks || []).map((task) => ({
        ...task,
        projectName: project.name,
        projectId: project._id,
      }))
    );
  }, [projects]);

  // ---------------- STRICT WARNING CALCULATION ----------------
  const warningMembers = useMemo(() => {
    return members.map((member) => {
      let warning = 0;
      let overdue = 0;

      allTasks.forEach((task) => {
        // Handle both object populated IDs and plain String IDs safely
        const assignedId =
          task.member && typeof task.member === "object"
            ? task.member._id
            : task.member;

        if (assignedId && String(assignedId) === String(member._id)) {
          
          // --- STALEMATE PREVENTION: SANITIZE STATUS CODES ---
          const currentStatus = (task.status || "").toString().trim().toLowerCase();

          // If the task matches completed or done descriptors, drop out completely
          if (currentStatus === "completed" || currentStatus === "done") {
            return; 
          }

          const today = new Date();
          const end = new Date(task.endDate);

          today.setHours(0, 0, 0, 0);
          end.setHours(0, 0, 0, 0);

          const diff = (end - today) / (1000 * 60 * 60 * 24);

          if (diff < 0) {
            overdue++;
          } else if (diff <= 0) {
            warning++;
          }
        }
      });

      return { ...member, warning, overdue };
    });
  }, [members, allTasks]);

  // Dynamic list containing ONLY members with actual pending flags
  const flaggedMembers = useMemo(() => {
    return warningMembers.filter((m) => m.warning > 0 || m.overdue > 0);
  }, [warningMembers]);

  // ---------------- ACTION: TASK UPDATE TRIGGER ----------------
  const handleCompleteTask = async (projectId, taskId) => {
    try {
      await api.put(
        `/api/projects/${projectId}/tasks/${taskId}`,
        { status: "Completed" }
      );

      // Instantly sync layout architecture metrics
      fetchData(); 
    } catch (err) {
      console.error("Task status sync failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-medium text-slate-500 bg-slate-50">
        Syncing workspace dashboards...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">

        {/* TOP COMPONENT HEADER */}
        <header className="mb-10 pb-6 border-b border-slate-200">
          <h1 className="text-3xl font-bold text-slate-800">
            Employee Dashboard
          </h1>
        </header>

        {/* MAIN METRIC ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Active Members</h2>
            <div className="text-3xl font-bold text-slate-800 mt-2">{members.length}</div>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Total Projects</h2>
            <div className="text-3xl font-bold text-slate-800 mt-2">{projects.length}</div>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Total Tasks</h2>
            <div className="text-3xl font-bold text-slate-800 mt-2">{allTasks.length}</div>
          </div>

          <div
            onClick={() => setShowWarningMembers(true)}
            className="bg-white p-6 rounded-xl border shadow-sm cursor-pointer hover:border-red-400 hover:shadow-md transition duration-200"
          >
            <h2 className="text-xs uppercase font-semibold text-red-500 tracking-wider">⚠ Warning Members</h2>
            <div className="text-3xl font-bold text-red-600 mt-2">{flaggedMembers.length}</div>
          </div>
        </div>

        {/* MODAL SYSTEM CONTAINER */}
        {showWarningMembers && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-xl flex flex-col max-h-[85vh]">

              {/* MODAL TOPBAR */}
              <div className="flex justify-between items-center mb-6 pb-2 border-b">
                <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
                  ⚠ Warning Members List
                </h2>
                <button 
                  onClick={() => setShowWarningMembers(false)}
                  className="text-gray-400 hover:text-gray-700 text-lg p-1 transition"
                >
                  ✖
                </button>
              </div>

              {/* ITERATED SCROLL BOX */}
              <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                {flaggedMembers.length === 0 ? (
                  <p className="text-center text-gray-500 py-8 font-medium">No active warning members 🎉</p>
                ) : (
                  flaggedMembers.map((m) => (
                    <div
                      key={m._id}
                      className="p-4 border border-slate-100 rounded-xl bg-slate-50/50 flex justify-between items-center hover:bg-slate-50 transition"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">{m.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {m.role || "Team Member"}
                        </p>
                      </div>

                      <div className="text-right text-xs font-semibold space-y-1">
                        <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 inline-block mr-2">
                          Overdue: {m.overdue}
                        </span>
                        <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 inline-block">
                          Warning: {m.warning}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* BACKOUT INTERACTION ACTION BAR */}
              <div className="mt-6 pt-4 border-t text-right">
                <button
                  onClick={() => setShowWarningMembers(false)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-lg text-sm shadow-sm transition"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EmployeeDashboard;

