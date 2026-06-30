
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  client: String,
  skill: String,
  member: String,
  startDate: Date,
  endDate: Date,
  warningStatus: String,
});

const documentSchema = new mongoose.Schema({
  fileName: String,
  fileUrl: String,
  publicId: String,
});

const Project = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    description: String,
    status: String,
    client: String,
    startDate: Date,
    endDate: Date,

    tasks: [taskSchema],

    documents: [documentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Projects", Project);


