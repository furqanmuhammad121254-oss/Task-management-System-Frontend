
// import express from "express";
// import upload from "../Middleware/uploadMiddleware.js";
// import {
//   createMember,
//   getMembers,
//   updateMember,
//   deleteMember,
// } from "../Controllers/member.controller.js";



// const router = express.Router();

// router
//   .route("/")
//   .get(getMembers)
//   .post(upload.single("avatar"), createMember);

// router
//   .route("/:id")
//   .put(upload.single("avatar"), updateMember)
//   .delete(deleteMember);

// export default router;

import express from "express";
import upload from "../Middleware/uploadMiddleware.js";
import {
  createMember,
  getMembers,
  updateMember,
  deleteMember,
} from "../Controllers/member.controller.js";

const router = express.Router();

router
  .route("/")
  .get(getMembers)
  .post( upload.single("avatar"), createMember);

router
  .route("/:id")
  .put(upload.single("avatar") ,updateMember)
  .delete(deleteMember);

export default router;