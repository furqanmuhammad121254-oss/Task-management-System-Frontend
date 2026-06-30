// import express from "express";
// import { registerUser, loginUser, deactivateUser, allusers, admin, updateUser,logout  } from "../Controllers/user.controller.js";
// import Users from "../models/Users.js";
// import checkRole from '../Middleware/checkRole.js';

// const router = express.Router();



// router.post("/signup", registerUser);

// router.post("/login", loginUser);


// router.get("/all-users", allusers  )


// router.get("/admin",checkRole, admin)

// router.put("/update/:id", updateUser);



// router.put("/deactivate/:id", deactivateUser);


// router.post("/logout", logout);



// export default router;


import express from "express";
import { registerUser, loginUser, deactivateUser, allusers, admin, updateUser, logout } from "../Controllers/user.controller.js";
import checkRole from '../Middleware/checkRole.js';

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/all-users", allusers);
router.get("/admin", checkRole, admin);
router.put("/update/:id", updateUser);
router.put("/deactivate/:id", deactivateUser);
router.post("/logout", logout);

export default router;