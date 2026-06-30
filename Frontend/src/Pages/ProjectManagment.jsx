import React, { useEffect, useState, useCallback } from "react";
import api from "../service/api";

const PROJECT_API = "http://localhost:5000/api/projects";

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get(PROJECT_API);

            const allProjects = res.data || [];

            // Filter out projects that are already completed
            const activeProjects = allProjects.filter(
                (project) => project.status?.toLowerCase() !== "completed" && project.status?.toLowerCase() !== "done"
            );

            setProjects(activeProjects);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCompleteProject = async (projectId) => {
        try {
            await api.put(`http://localhost:5000/api/projects/${projectId}`, {
                status: "Completed"
            });

            // Instantly remove the completed project card from the UI
            setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId));

        } catch (err) {
            console.error("Error updating project status:", err);
            alert("Failed to update status");
        }
    };

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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px] text-gray-500 font-medium">
                <div className="animate-pulse">Loading Projects...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50/50 min-h-screen">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
                    Project Dashboard
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    Manage and track your operational company projects seamlessly.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <div
                        key={project._id || index}
                        className="flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <div>
                            <div className="flex items-center justify-between gap-4 mb-3.5">
                                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50/70 px-2.5 py-1 rounded-md max-w-[60%] truncate">
                                    {/* {project.client || "No Client Specified"} */}
                                </span>
                                <span className={`text-xs font-medium px-2.5 py-0.5 border rounded-full whitespace-nowrap ${getStatusStyle(project.status)}`}>
                                    {project.status || "Pending"}
                                </span>
                            </div>

                            <h3 className="font-bold text-gray-800 text-lg mb-1.5 truncate capitalize">
                                {project.projectName}
                            </h3>

                            <p className="text-gray-500 text-sm mb-5 line-clamp-2 min-h-[40px]">
                                {project.description || "No description provided."}
                            </p>


                        </div>

                        <div className="">
                            <span>📅</span>
                            <span>{project.startDate?.slice(0, 10) || "N/A"}</span>
                        </div>
                        <span className="text-gray-300 ">→</span>
                        <span>🏁</span>
                        <span>{project.endDate?.slice(0, 10) || "N/A"}</span>
                        {/* <div className="flex items-center gap-1.5 font-medium text-gray-500 mb-3">
                            
                        </div> */}

                        <div className="border-t border-gray-100 flex flex-col gap-3">
                            <div className="flex items-center justify-between text-xs text-gray-400">

                                <p className="text-gray-500 text-sm  line-clamp- min-h-[40px] flex gap-1  pt-5">
                                    <p className="text-blue-700"> Client: </p>
                                    {project.client || "No description provided."}
                                </p>
                            </div>

                            {/* {project.status?.toLowerCase() !== "completed" && (
                                <button
                                    onClick={() => handleCompleteProject(project._id)}
                                    className="w-full mt-1 bg-green-600 hover:bg-green-700 text-white font-medium py-1.5 px-3 rounded-xl text-xs transition duration-200 flex items-center justify-center gap-1"
                                >
                                    ✓ Mark as Completed
                                </button>
                            )} */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectManager;


