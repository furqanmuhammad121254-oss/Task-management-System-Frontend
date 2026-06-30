
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userroutes from "./Routes/user.Routes.js";
import projectroutes from "./Routes/project.routes.js";
import memberroutes from "./Routes/member.routes.js";
import attendanceroutes from "./Routes/attendance.routes.js";
import dotenv from 'dotenv';


dotenv.config();

connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: (process.env.FRONTEND_URL),
    credentials: true
  })
);

app.get("/testing", (req, res) => {
  res.send("backend working");
});


app.use("/user", userroutes);
app.use("/api/projects", projectroutes);
app.use("/api/members", memberroutes);
app.use("/api/attendance", attendanceroutes);




const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
})