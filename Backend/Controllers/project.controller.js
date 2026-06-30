
import fs from "fs";
import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

// Get Projects
export const getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

// Create Project
export const createProject = async (req, res) => {
  try {
    const {
      projectName,
      description,
      status,
      client,
      startDate,
      endDate,
    } = req.body;

    const project = await Project.create({
      projectName,
      description,
      status,
      client,
      startDate,
      endDate,
      documents: [],
      tasks: [],
    });

    res.status(201).json(project);
  } catch (error) {
    console.log("Create Project Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update Project
export const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(project);
};

// Delete Project
export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
  });
};

// Add Task
export const addTask = async (req, res) => {
  const project = await Project.findById(req.params.id);

  project.tasks.push(req.body);

  await project.save();

  res.json(project);
};


export const updateTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = project.tasks.id(req.params.taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔥 IMPORTANT: force overwrite fields
    task.name = req.body.name;
    task.description = req.body.description;
    task.status = req.body.status;
    task.member = req.body.member;

    // 🔥 DATE FORCE UPDATE
    task.startDate = req.body.startDate
      ? new Date(req.body.startDate)
      : null;

    task.endDate = req.body.endDate
      ? new Date(req.body.endDate)
      : null;

    await project.save(); // MUST

    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// task delete 
export const deleteTask = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    project.tasks = project.tasks.filter(
      (t) => t._id.toString() !== req.params.taskId
    );

    await project.save();

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Upload Document
// export const uploadDocument = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);

//     if (!project) {
//       return res.status(404).json({
//         message: "Project not found",
//       });
//     }

//     if (!req.file) {
//       return res.status(400).json({
//         message: "No file uploaded",
//       });
//     }

//     const result = await cloudinary.uploader.upload(
//       req.file.path,
//       {
//         folder: "projects",
//         resource_type: "auto",
//       }
//     );

//     project.documents.push({
//       fileName: req.file.originalname,
//       fileUrl: result.secure_url,
//       publicId: result.public_id,
//     });

//     await project.save();

//     fs.unlinkSync(req.file.path);

//     res.status(200).json(project);
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
export const uploadDocument = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const fileBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64"
    )}`;

    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: "projects",
      resource_type: "auto",
    });

    project.documents.push({
      fileName: req.file.originalname,
      fileUrl: result.secure_url,
      publicId: result.public_id,
    });

    await project.save();

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Document
export const deleteDocument = async (req, res) => {
  try {
    const { projectId, documentId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const document = project.documents.id(documentId);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    if (document.publicId) {
      await cloudinary.uploader.destroy(
        document.publicId,
        {
          resource_type: "image",
        }
      );
    }

    project.documents.pull(documentId);

    await project.save();

    res.json({
      success: true,
      documents: project.documents,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getProjectDashboard = async (req, res) => {
  try {
    const projects = await Project.find();

    const tasks = await Task.find()
      .populate("assignedMember")
      .lean();

    // 🔥 GROUP TASKS UNDER PROJECTS
    const response = projects.map((project) => {
      const projectTasks = tasks
        .filter((t) => String(t.projectId) === String(project._id))
        .map((task) => ({
          _id: task._id,
          title: task.title,
          status: task.status,

          // ✅ EDGE CASE HANDLING
          assignedMember: task.assignedMember
            ? {
                _id: task.assignedMember._id,
                name: task.assignedMember.name,
              }
            : null, // 👈 no employee assigned
        }));

      return {
        _id: project._id,
        title: project.title,
        description: project.description,
        tasks: projectTasks,
      };
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

