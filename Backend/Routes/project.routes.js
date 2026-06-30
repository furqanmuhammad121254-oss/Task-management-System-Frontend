
// import express from "express";
// import multer from "multer";

// import {
//   getProjects,
//   createProject,
//   updateProject,
//   deleteProject,
//   deleteDocument,
//   addTask,
//   updateTask,
//   deleteTask,
//   uploadDocument,
// } from "../Controllers/project.controller.js";

// const router = express.Router();

// // Memory Storage (Vercel Compatible)
// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB
//   },
// });

// // PROJECT CRUD
// router.get("/", getProjects);

// router.post("/", createProject);

// router.put("/:id", updateProject);

// router.delete("/:id", deleteProject);

// // TASK
// router.post("/:id/tasks", addTask);

// router.put("/:projectId/tasks/:taskId", updateTask);

// router.delete("/:projectId/tasks/:taskId", deleteTask);

// // DOCUMENT
// router.post(
//   "/:id/documents",
//   upload.single("file"),
//   uploadDocument
// );

// router.delete(
//   "/:projectId/documents/:documentId",
//   deleteDocument
// );

// export default router;


import express from "express";
import multer from "multer";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  addTask,
  updateTask,
  deleteTask,
  uploadDocument,
  deleteDocument,
} from "../Controllers/project.controller.js";

const router = express.Router();

// Multer (Memory Storage for Vercel)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

/* ===========================
   PROJECT ROUTES
=========================== */

router.route("/")
  .get(getProjects)
  .post(createProject);

router.route("/:id")
  .put(updateProject)
  .delete(deleteProject);

/* ===========================
   TASK ROUTES
=========================== */

router.post("/:id/tasks", addTask);

router
  .route("/:projectId/tasks/:taskId")
  .put(updateTask)
  .delete(deleteTask);

/* ===========================
   DOCUMENT ROUTES
=========================== */

router.post(
  "/:id/documents",
  upload.single("file"),
  uploadDocument
);

router.delete(
  "/:projectId/documents/:documentId",
  deleteDocument
);

export default router;