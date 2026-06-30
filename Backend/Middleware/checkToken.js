// import jwt from "jsonwebtoken";
// import User from "../models/UserSchema.js";
// import bcrypt from "bcryptjs";

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     // 🔥 JWT TOKEN CREATE
//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role
//       },
//       "mysecretkey", // later .env me rakhna
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default checkToken;