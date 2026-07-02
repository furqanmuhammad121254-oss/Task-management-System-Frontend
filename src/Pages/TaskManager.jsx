

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios"; // Added missing import
import api from "../service/api.js";

const PROJECT_API = "/api/projects";
const MEMBER_API = "/api/members";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // States needed for your task editing feature
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [taskForm, setTaskForm] = useState({ name: "", description: "", skill: "" });

  // Dummy placeholder helper if you don't have it somewhere else
  const resetForm = () => setTaskForm({ name: "", description: "", skill: "" });

  // ---------------- FETCH DATA ----------------
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [projectRes, memberRes] = await Promise.all([
        api.get(PROJECT_API),
        api.get(MEMBER_API),
      ]);

      const projectsData = projectRes.data || [];
      setProjects(projectsData);
      setMembers(memberRes.data || []);

      // Flatten tasks from all projects into a single state array
      const allTasks = projectsData.flatMap((project) =>
        (project.tasks || []).map((task) => ({
          ...task,
          projectId: project._id,
          projectName: project.projectName || "Unassigned Project",
        }))
      );

      setTasks(allTasks);
    } catch (err) {
      console.error("Error fetching task manager data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ---------------- UPDATE TASK FORM DETAILS ----------------
  const updateTask = async () => {
    if (!selectedProject?._id || !editTask?._id) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/api/projects/${selectedProject._id}/tasks/${editTask._id}`,
        taskForm
      );

      const updatedProject = res.data;

      // 1. Update projects array list
      setProjects((prev) =>
        prev.map((p) => (p._id === updatedProject._id ? updatedProject : p))
      );

      // 2. Update active selection
      setSelectedProject(updatedProject);

      // FIX: Also update the flattened "tasks" list layout instantly!
      setTasks((prevTasks) =>
        prevTasks.map((t) => {
          if (String(t._id) === String(editTask._id)) {
            return {
              ...t,
              ...taskForm, // Apply updated name, description, skills, etc.
            };
          }
          return t;
        })
      );

      setEditTask(null);
      resetForm();
    } catch (error) {
      console.error("Error updating task form:", error);
    }
  };

  // ---------------- COMPLETE TASK ----------------
  const handleCompleteTask = async (task) => {
    if (!task || !task.projectId || !task._id) {
      alert("Missing project or task identifiers.");
      return;
    }

    try {
      const response = await api.put(
        `/api/projects/${task.projectId}/tasks/${task._id}`,
        { status: "Completed" }
      );

      console.log("Updated Complete status:", response.data);
      
      // Update state locally instantly
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          String(t._id) === String(task._id) 
            ? { ...t, status: "Completed" } 
            : t
        )
      );

    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status");
    }
  };

  // ---------------- MEMBER NAME ----------------
  const getMemberName = (memberId) => {
    if (!memberId) return "Unassigned";
    const member = members.find((m) => String(m._id) === String(memberId));
    return member?.name || "Unassigned";
  };

  // ---------------- STATUS STYLE ----------------
  const getStatusStyle = (status) => {
    const normalized = status?.toLowerCase() || "pending";

    if (normalized === "completed" || normalized === "done") {
      return "bg-green-50 text-green-700 border-green-200";
    }
    if (normalized === "in progress" || normalized === "active") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  // ---------------- WARNING LOGIC ----------------
  const getTaskWarning = (task) => {
    if (!task.endDate) return null;
    if (task.status?.toLowerCase() === "completed") return null;

    const today = new Date();
    const endDate = new Date(task.endDate);

    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const diffDays = (endDate - today) / (1000 * 60 * 60 * 24);

    if (diffDays < 0) {
      return { type: "overdue", message: "⚠ Overdue Task!" };
    }
    if (diffDays <= 0) {
      return { type: "warning", message: "⚠ Due Soon" };
    }

    return null;
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-500 font-medium">
        <div className="animate-pulse">Loading Tasks...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50/50 min-h-screen">
      {/* HEADER */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Employee Task Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track all project tasks.
          </p>
        </div>
      </div>

      {/* TASK GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task, index) => {
          const warning = getTaskWarning(task);
          const currentKey = task._id || `task-${index}`;
          const isCompleted = task.status?.toLowerCase() === "completed";

          return (
            <div
              key={currentKey}
              className={`flex flex-col justify-between bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border
                ${warning?.type === "overdue" ? "border-red-300" : "border-gray-100"}
              `}
            >
              {/* TOP */}
              <div>
                {/* WARNING */}
                {warning && (
                  <div
                    className={`mb-2 text-xs font-semibold px-3 py-1 rounded-md ${
                      warning.type === "overdue"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {warning.message}
                  </div>
                )}

                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs font-semibold uppercase text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md truncate max-w-[150px]">
                    {task?.projectName}
                  </span>

                  <span
                    className={`text-xs font-medium px-2 py-0.5 border rounded-full ${getStatusStyle(
                      task.status
                    )}`}
                  >
                    {task.status || "Pending"}
                  </span>
                </div>

                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {task.name}
                </h3>

                <p className="text-gray-500 text-sm mb-5 line-clamp-2">
                  {task.description || "No description provided."}
                </p>

                {/* INFO */}
                <div className="grid grid-cols-2 gap-4 border-t pt-4 text-xs">
                  <div>
                    <span className="block text-gray-400 mb-1">Assignee</span>
                    <span className="font-medium text-gray-700 block truncate">
                      {task.member?.name || getMemberName(task.member)}
                    </span>
                  </div>

                  <div>
                    <span className="block text-gray-400 mb-1">
                      Required Skill
                    </span>
                    <span className="font-medium text-gray-700 block truncate">
                      {task.skill || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="mt-5 pt-4 border-t flex flex-col gap-3">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>📅 {task.startDate ? task.startDate.slice(0, 10) : "N/A"}</span>
                  <span>🏁 {task.endDate ? task.endDate.slice(0, 10) : "N/A"}</span>
                </div>

                {/* MARK AS COMPLETED BUTTON */}
                {!isCompleted && (
                  <button
                    onClick={() => handleCompleteTask(task)} // FIXED: Passed the exact 'task' object context instead of an unreferenced task_id
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-2 rounded-xl transition-colors"
                  >
                    ✓ Mark as Completed
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskManager;