
import React, { useState, useEffect } from "react";
import api from "../../service/api.js"

const API_BASE_URL = "http://localhost:5000/api/projects";

const Project = () => {
  // ---------------- STATES ----------------
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [showPop, setShowPop] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentTab, setCurrentTab] = useState("Overview");
  const [editTask, setEditTask] = useState(null);
  const [members, setMembers] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);


  // ---------------- FORM DATA ----------------
  const initialFormState = {
    projectName: "",
    description: "",
    status: "",
    skill: "",
    client: "",
    startDate: "",
    endDate: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // ---------------- TASK FORM ----------------
  const [taskForm, setTaskForm] = useState({
    name: "",
    description: "",
    status: "",
    client: "",
    skill: "",
    member: "",
    startDate: "",
    endDate: "",
  });

  // ---------------- FETCH PROJECTS ----------------
  useEffect(() => {
    if (editTask) {
      setTaskForm({
        name: editTask.name || "",
        description: editTask.description || "",
        status: editTask.status || "",
        member: editTask.member || "",
        skill: editTask.skill || "",
        startDate: editTask.startDate || "",
        endDate: editTask.endDate || "",
      });
    }
    const fetchProjects = async () => {
      try {
        const res = await api.get(API_BASE_URL);
        setProjects(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchProjects();
  }, [editTask], []);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await api.get(
        "http://localhost:5000/api/members"
      );

      setMembers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- FORM CHANGE ----------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- TASK CHANGE ----------------
  const handleTaskChange = (e) => {
    setTaskForm({
      ...taskForm,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- CREATE / UPDATE PROJECT ----------------
  const handleSubmit = async () => {
    try {
      if (editingId) {
        const res = await api.put(
          `${API_BASE_URL}/${editingId}`,
          formData
        );

        setProjects((prev) =>
          prev.map((p) => (p._id === editingId ? res.data : p))
        );

        setEditingId(null);
      } else {
        const res = await api.post(API_BASE_URL, formData);
        setProjects((prev) => [...prev, res.data]);
      }

      setFormData(initialFormState);
      setShowForm(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  // ---------------- EDIT ----------------
  const handleEdit = (project) => {
    setFormData(project);
    setEditingId(project._id);
    setShowForm(true);
  };
  const handleEditTask = (task) => {

    setFormData({
      title: task.title,
      description: task.description,

      ...task
    });
    setEditingId(task._id);
    setShowForm(true);
  };


  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete project?")) return;

    try {
      await api.delete(`${API_BASE_URL}/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // ---------------- POPUP ----------------
  const openPopup = (project) => {
    setSelectedProject(project);
    setShowPop(true);
    setCurrentTab("Overview");
  };

  const closePopup = () => {
    setShowPop(false);
    setSelectedProject(null);
  };

  // ---------------- ADD TASK ----------------
  const addTask = async () => {
    try {
      const res = await api.post(
        `${API_BASE_URL}/${selectedProject._id}/tasks`,
        taskForm
      );

      setSelectedProject(res.data);

      setTaskForm({
        name: "",
        description: "",
        status: "",
        client: "",
        skill: "",
        member: "",
        startDate: "",
        endDate: "",
      });
    } catch (err) {
      console.error(err.message);
    }
  };



  // task update 
  const updateTask = async () => {
    try {
      const res = await api.put(
        `http://localhost:5000/api/projects/${selectedProject._id}/tasks/${editTask._id}`,
        taskForm
      );

      const updatedProject = res.data;



      setProjects((prev) =>
        prev.map((p) =>
          p._id === updatedProject._id ? updatedProject : p
        )
      );

      setSelectedProject(updatedProject);

      setEditTask(null);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  // task delete 
  const deleteTask = async (taskId) => {
    try {
      const res = await api.delete(
        `http://localhost:5000/api/projects/${selectedProject._id}/tasks/${taskId}`
      );

      const updatedProject = res.data;

      // 🔥 update UI instantly
      setProjects((prev) =>
        prev.map((p) =>
          p._id === updatedProject._id ? updatedProject : p
        )
      );

      setSelectedProject(updatedProject);
    } catch (error) {
      console.log(error);
    }
  };


  // ---------------- UPLOAD FILE ----------------
  const uploadFile = async (file) => {
    try {
      const formData = new FormData();

      formData.append("file", file);

      const res = await api.post(
        `http://localhost:5000/api/projects/${selectedProject._id}/documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSelectedProject(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Helper helper function to parse camelCase labels nicely for form inputs
  const formatLabel = (str) => {
    const result = str.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };


  //image remove
  const handleRemoveDocument = async (documentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/projects/${selectedProject._id}/documents/${documentId}`
      );

      setSelectedProject((prev) => ({
        ...prev,
        documents: prev.documents.filter(
          (doc) => doc._id !== documentId
        ),
      }));
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };




  // ---------------- UI ----------------
  return (
    <div className="h-1 bg-slate-50 p-6 md:p-10 text-slate-800 antialiased">
      <div className="max-w-7xl mx-auto">

        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Project Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Manage and track your operational company projects seamlessly.</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData(initialFormState);
            }}
            className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm transition duration-200 ease-in-out text-sm self-start sm:self-auto"
          >
            <span className="mr-1.5 font-bold text-base">+</span> Create Project
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Backdrop click closer */}
            <div className="absolute inset-0 -z-10" onClick={() => setShowForm(false)} />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200/60 rounded-xl overflow-hidden animate-in zoom-in-95 duration-200"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-white">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {editingId ? "Edit Project Details" : "Create New Project"}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {editingId ? "Update your project's properties and timeline." : "Get started by filling out the project metadata below."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100/80 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* FORM BODY */}
              <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)] bg-slate-50/30">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
                      Project Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName || ''}
                      onChange={handleChange}
                      placeholder="Enter Project Name"
                      required
                      className="w-full text-sm bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg p-2.5 outline-none transition shadow-sm placeholder:text-slate-400"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
                      Project Client
                    </label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client || ''}
                      onChange={handleChange}
                      placeholder="Enter Client Name"
                      className="w-full text-sm bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg p-2.5 outline-none transition shadow-sm placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Row 2: Description (Full Width) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
                    Project Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Provide a brief summary of the project scope, objectives, and primary deliverables..."
                    className="w-full text-sm bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg p-2.5 outline-none transition shadow-sm resize-none leading-relaxed placeholder:text-slate-400"
                  />
                </div>

                {/* Row 3: Status & Timing Config */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
                      Project Status
                    </label>
                    <div className="relative">
                      <select
                        name="status"
                        id="projectStatus"
                        value={formData.status || ''}
                        onChange={handleChange}
                        className="w-full border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg p-2.5 outline-none transition text-sm bg-white text-slate-700 appearance-none cursor-pointer pr-10 shadow-sm"
                      >
                        <option value="" disabled hidden>Select status...</option>
                        <option value="Pending" className="text-slate-700 bg-white">⏳ Pending</option>
                        <option value="In Progress" className="text-slate-700 bg-white">🔄 In Progress</option>
                        <option value="Completed" className="text-slate-700 bg-white">✅ Completed</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate || ''}
                      onChange={handleChange}
                      className="w-full text-sm bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg p-2.5 outline-none transition text-slate-700 shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate || ''}
                      onChange={handleChange}
                      className="w-full text-sm bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg p-2.5 outline-none transition text-slate-700 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="flex gap-3 justify-end px-6 py-4 border-t border-slate-100 bg-white">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg text-sm shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all"
                >
                  {editingId ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        )
        }




        {/* PROJECT LIST */}
        {
          projects.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
              <p className="text-slate-400 font-medium">No projects available. Click 'Create Project' to begin.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project._id}
                  onClick={() => openPopup(project)}
                  className="group relative bg-white border border-slate-200 hover:border-indigo-400 p-6 rounded-xl shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between transition-all duration-200"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition text-lg leading-snug">

                        {project.projectName}
                      </h3>
                      {project.status && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase">

                          {project.status}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-2 leading-relaxed">
                      {project.description || "No description provided."}
                    </p>

                    <p className="text-slate-600 text-sm line-clamp-3 mb-1 leading-relaxed">
                      {project.startDate || "No description provided."}
                    </p>

                    <p className="text-slate-600 text-sm line-clamp-3 mb-2 leading-relaxed">
                      {project.endDate || "No description provided."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                    <span className="text-xs text-slate-400 font-medium">
                      Client: <span className="text-slate-600 font-semibold">{project.client || "N/A"}</span>
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTask(task);
                        }}
                        className="text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 px-2.5 py-1.5 rounded transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(project._id);
                        }}
                        className="text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        }

        {/* POPUP OVERLAY */}
        {
          showPop && selectedProject && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
              <div className="bg-white w-full h-150 max-w-4xl rounded-xl shadow-xl border border-slate-100 flex flex-col overflow-hidden max-h-[90vh] animate-in zoom-in-95 duration-200">

                {/* MODAL HEADER */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedProject.projectName}</h2>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Project Details Overview</p>
                  </div>
                  <button
                    onClick={closePopup}
                    className="bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600 h-8 w-8 rounded-lg flex items-center justify-center border border-slate-200 shadow-sm transition"
                  >
                    ✕
                  </button>
                </div>

                {/* TABS SELECTOR */}
                <div className="flex border-b border-slate-100 px-6 bg-slate-50/50 gap-2">
                  {["Overview", "Documents", "Tasks"].map((tab) => {
                    const isActive = currentTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setCurrentTab(tab)}
                        className={`py-3 px-4 text-sm font-semibold border-b-2 transition -mb-px ${isActive
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-slate-500 hover:text-slate-800"
                          }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                {/* MODAL CONTENT CONTAINER */}

                <div className="p-6 overflow-y-auto bg-white">
                  {/* OVERVIEW TAB */}
                  {/* {currentTab === "Overview" && (
                  <div className="bg-white h-110 rounded-xl p-2 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Project Overview</h3>

                    <div className="">
                      {selectedProject?.tasks?.map((task) => (
                        <div
                          key={task._id}
                          className="border rounded-lg p-3 bg-slate-50"
                        >
                          <h4 className="font-semibold text-slate-800">
                            {task.name}
                          </h4>

                          <p className="text-sm text-slate-500 mt-1">
                            {task.description}
                          </p>

                          <div className="mt-2 text-xs text-slate-600 space-y-1">
                            <p>
                              <strong>Member:</strong>{" "}
                              {members.find((m) => m._id === task.member)?.name || "Unassigned"}
                            </p>

                            <p>
                              <strong>Status:</strong> {task.status || "Pending"}
                            </p>

                            <p>
                              <strong>Start:</strong>{" "}
                              {task.startDate
                                ? new Date(task.startDate).toLocaleDateString()
                                : "-"}
                            </p>

                            <p>
                              <strong>End:</strong>{" "}
                              {task.endDate
                                ? new Date(task.endDate).toLocaleDateString()
                                : "-"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )} */}
                  {currentTab === "Overview" && (
                    <div className="bg-white h-screen rounded-xl p-3 shadow-sm border border-slate-100">
                      <h3 className="font-bold text-xl text-slate-800 mb-1 tracking-tight p-3">Project Overview</h3>

                      <div className="flex flex-wrap gap-2 overflow-y-auto ">
                        {selectedProject?.tasks?.map((task) => {
                          // Simple color mapping for status badges
                          const statusColors = {
                            "Completed": "bg-emerald-50 text-emerald-700 border-emerald-200",
                            "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
                            "Pending": "bg-amber-50 text-amber-700 border-amber-200",
                          };
                          const currentStatus = task.status || "Pending";

                          return (
                            <div
                              key={task._id}
                              className="flex flex-col justify-between border border-slate-100 rounded-xl p-4 bg-white hover:shadow-md hover:border-slate-200 transition-all duration-200 ease-in-out group w-95 h-55 ml-3"
                            >
                              <div>
                                {/* Top Row: Task Name & Status Badge */}
                                <div className="flex items-start justify-between gap-3 mb-2">
                                  <h4 className="font-semibold text-base text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {task.name}
                                  </h4>
                                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${statusColors[currentStatus] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                                    {currentStatus}
                                  </span>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                                  {task.description || "No description provided."}
                                </p>
                              </div>

                              {/* Bottom Metadata Section */}
                              <div className="pt-3 border-t border-slate-50 mt-auto text-xs text-slate-600 space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-slate-400">Assigned to</span>
                                  <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                                    {members.find((m) => m._id === task.member)?.name || "Unassigned"}
                                  </span>
                                </div>

                                <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                                  <div>
                                    <span className="text-slate-400">Start:</span>{" "}
                                    <span className="font-medium">{task.startDate ? new Date(task.startDate).toLocaleDateString() : "-"}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400">End:</span>{" "}
                                    <span className="font-medium">{task.endDate ? new Date(task.endDate).toLocaleDateString() : "-"}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* DOCUMENTS TAB */}
                  {currentTab === "Documents" && (
                    <div className="space-y-6">
                      {/* Upload Section */}
                      <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50/50 flex flex-col items-center justify-center text-center">
                        <label className="cursor-pointer bg-white border border-slate-200 hover:border-indigo-500 shadow-sm px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-indigo-600 transition inline-block">
                          Choose Document File
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                uploadFile(e.target.files[0]);
                              }
                            }}
                          />
                        </label>

                        <p className="text-xs text-slate-400 mt-2">
                          Upload strategic files or agreements related to this project.
                        </p>
                      </div>

                      {/* Documents List */}
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-3">
                          Repository Assets
                        </h4>

                        {!selectedProject.documents ||
                          selectedProject.documents.length === 0 ? (
                          <p className="text-xs text-slate-400 italic">
                            No assets uploaded yet.
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {selectedProject.documents.map((doc, i) => {
                              const isImage =
                                doc.fileUrl &&
                                /\.(jpg|jpeg|png|gif|webp)$/i.test(doc.fileUrl);

                              return (
                                <div
                                  key={i}
                                  className="relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                                >
                                  {/* Delete Button */}
                                  <button
                                    onClick={() => handleRemoveDocument(doc._id)}
                                    className="absolute top-2 right-2 z-10 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-red-600"
                                  >
                                    ✕
                                  </button>

                                  {/* Image Preview */}
                                  {isImage ? (
                                    <a
                                      href={doc.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <img
                                        src={doc.fileUrl}
                                        alt={doc.fileName}
                                        className="w-full h-48 object-cover"
                                      />
                                    </a>
                                  ) : (
                                    <a
                                      href={doc.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex flex-col items-center justify-center h-48 bg-slate-50"
                                    >
                                      <span className="text-5xl">📄</span>
                                      <span className="text-sm text-indigo-600 mt-2">
                                        View File
                                      </span>
                                    </a>
                                  )}

                                  {/* File Info */}
                                  <div className="p-3">
                                    <p className="text-sm font-medium text-slate-700 truncate">
                                      {doc.fileName || "Untitled File"}
                                    </p>

                                    <a
                                      href={doc.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-indigo-600 hover:underline"
                                    >
                                      Open File →
                                    </a>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TASKS TAB */}
                  {currentTab === "Tasks" && (
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">

                      {/* TASK FORM INPUTS */}
                      <div className="md:col-span-2 bg-slate-50/70 p-4 border border-slate-200/60 rounded-xl space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Create Sprint Task</h4>

                        <input
                          name="name"
                          placeholder="Task Title"
                          value={taskForm.name}
                          onChange={handleTaskChange}
                          className="border border-slate-200 bg-white focus:border-indigo-500 rounded-lg p-2 text-xs w-full outline-none transition"
                        />
                        <input
                          name="description"
                          placeholder="Task Description"
                          value={taskForm.description}
                          onChange={handleTaskChange}
                          className="border border-slate-200 bg-white focus:border-indigo-500 rounded-lg p-2 text-xs w-full outline-none transition"
                        />

                        <select
                          name="status"
                          value={taskForm.status}
                          onChange={handleTaskChange}
                          className="border rounded-lg p-2 w-full"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Testing">Testing</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>


                        <select
                          name="member"
                          value={taskForm.member}
                          onChange={(e) => {
                            const memberId = e.target.value;

                            const selectedMember = members.find(
                              (m) => m._id === memberId
                            );

                            setTaskForm({
                              ...taskForm,
                              member: memberId,
                              skill: "",
                            });

                            setSelectedSkills(selectedMember?.skills || []);
                          }}
                          className="border border-slate-200 bg-white rounded-lg p-2 text-xs w-full"
                        >
                          <option value="">Select Member</option>

                          {members.map((member) => (
                            <option key={member._id} value={member._id}>
                              {member?.name}
                            </option>
                          ))}
                        </select>

                        <select
                          name="skill"
                          value={taskForm.skill}
                          onChange={handleTaskChange}
                          className="border border-slate-200 bg-white rounded-lg p-2 text-xs w-full"
                        >
                          <option value="">Select Skill</option>

                          {selectedSkills.map((skill, index) => (
                            <option key={index} value={skill}>
                              {skill}
                            </option>
                          ))}
                        </select>


                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-400 font-semibold uppercase">Start</span>
                            <input
                              type="date"
                              name="startDate"
                              value={taskForm.startDate}
                              onChange={handleTaskChange}
                              className="border border-slate-200 bg-white p-1 text-xs rounded outline-none w-full"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-slate-400 font-semibold uppercase">End</span>
                            <input
                              type="date"
                              name="endDate"
                              value={taskForm.endDate}
                              onChange={handleTaskChange}
                              className="border border-slate-200 bg-white p-1 text-xs rounded outline-none w-full"
                            />
                          </div>
                        </div>


                        <button
                          onClick={editTask ? updateTask : addTask}
                          className={`w-full font-medium p-2 text-xs rounded-lg shadow-sm transition mt-2 text-white ${editTask
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                        >
                          {editTask ? "Update Task" : "Add Task Block"}
                        </button>
                      </div>

                      {/* TASK DISPLAY LIST */}
                      <div className="md:col-span-3 space-y-3 max-h-[400px] overflow-y-auto pr-1">
                        <h4 className="text-sm font-bold text-slate-900 mb-2">Sprint Backlog</h4>

                        {!selectedProject.tasks || selectedProject.tasks.length === 0 ? (
                          <p className="text-xs text-slate-400 italic py-6 text-center border border-dashed border-slate-100 rounded-xl">
                            No tasks configured for this project pipeline.
                          </p>
                        ) : (
                          selectedProject.tasks.map((task, i) => (
                            <div
                              key={task._id || i}
                              className="bg-white border border-slate-100 shadow-sm p-4 rounded-xl hover:border-slate-200 transition"
                            >
                              {/* HEADER */}
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <span className="font-bold text-slate-900 text-sm">
                                  {task.name}
                                </span>


                                <div className="flex gap-2">
                                  {/* EDIT BUTTON */}
                                  <button
                                    onClick={() => setEditTask(task)}
                                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                                  >
                                    Edit
                                  </button>

                                  {/* DELETE BUTTON */}
                                  <button
                                    onClick={() => deleteTask(task._id)}
                                    className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>

                              <p className="text-xs text-slate-500 mb-1">
                                {task.description}
                              </p>

                              <p className="text-xs text-slate-500 mb-1">
                                {task.status}
                              </p>

                              <div className="text-[11px] text-slate-400 mb-1">
                                <strong>Member:</strong>{" "}
                                {members.find((m) => m._id === task.member)?.name || "Unassigned"}
                              </div>

                              <div className="text-[11px] text-slate-400 mb-1">

                                {/* <strong>Skills:</strong> {task.skills && task.skills.join(", ")} */}


                                <strong>Skills:</strong> {task.skills && task.skills.map((skill, index) => (
                                  <span key={index} className="bg-blue-100 text-blue-900 text-xs px-2 py-1 rounded mr-1">
                                    {skill}
                                  </span>
                                ))}
                              </div>

                              <p className="text-xs text-slate-500 mb-1">
                                {task.startDate}
                              </p>
                              <p className="text-xs text-slate-500 mb-1">
                                {task.endDate}
                              </p>
                            </div>
                          ))

                        )}
                      </div>

                    </div>
                  )}

                </div>
              </div>
            </div>
          )
        }

      </div >
    </div >
  );
};

export default Project;