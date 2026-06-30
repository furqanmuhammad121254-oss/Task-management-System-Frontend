import express from "express";

import {
  createAttendanceRequest,
  getPendingRequests,
  handleAttendanceAction,
  getEmployeeRequests,
  getAllRequests,
  deleteRequest
} from "../Controllers/attendance.controller.js";

const router = express.Router();

router.post("/request", createAttendanceRequest);

router.get("/all-requests", getAllRequests);

router.delete("/request/:id", deleteRequest);

router.get("/pending", getPendingRequests);

router.put("/action/:id", handleAttendanceAction);

router.get("/my-requests", getEmployeeRequests);



export default router;