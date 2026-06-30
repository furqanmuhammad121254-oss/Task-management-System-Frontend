
import AttendanceRequest from "../models/Attendance.js";



export const createAttendanceRequest = async (req, res) => {
  try {
    const { name, date, type, reason, employeeId } = req.body;

    // Fixed: Matches the imported model name and sets status to default 'Pending'
    const newRequest = new AttendanceRequest({
      employeeId,
      name,
      date,
      type,
      reason,
      status: "Pending" 
    });

    await newRequest.save();
    res.status(201).json({ message: 'Success', data: newRequest });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    // Fixed: Matches your schema configuration where the default is "Pending", not null
    const requests = await AttendanceRequest.find({ status: "Pending" });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleAttendanceAction = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // e.g., "Approved" or "Rejected"

    const request = await AttendanceRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({
      message: `Request ${status}`,
      data: request,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getEmployeeRequests = async (req, res) => {
  try {
    const { employeeId } = req.query;
    if (!employeeId) {
      return res.status(400).json({ message: "Employee ID is required" });
    }
    
    // Sorts by creation date so newest requests appear at the top
    const requests = await AttendanceRequest.find({ employeeId }).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getAllRequests = async (req, res) => {
  try {
    const requests = await AttendanceRequest.find()
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch requests",
      error: error.message,
    });
  }
};


export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    await AttendanceRequest.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "History deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};