// import Member from "../models/Members.js";

// export const createMember = async (req, res) => {
//     try {
//         const { name, email, phone, skills } = req.body;

        

//         if (!name || !email) {
//             return res.status(400).json({ message: "Name and email fields are required." });
//         }

       
//         const existingMember = await Member.findOne({ email });
//         if (existingMember) {
//             return res.status(400).json({ message: "A member with this email already exists." });
//         }

//         const avatar = req.file ? `/uploads/${req.file.filename}` : "";

//         const newMember = new Member({
//             name,
//             email,
//             phone,
//             skills,
//             avatar 
//         });

//         const savedMember = await newMember.save();
//         res.status(201).json(savedMember);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };
// export const getMembers = async (req, res) => {
//     try {
//         const members = await Member.find().sort({ createdAt: -1 }); 
//         res.status(200).json(members);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };
// export const updateMember = async (req, res) => {
//     try {
//         const { name, email, phone, skills } = req.body;
        
//         const updateData = { name, email, phone, skills };
//         if (req.file) {
//             updateData.avatar = `/uploads/${req.file.filename}`;
//         }

//         const updatedMember = await Member.findByIdAndUpdate(
//             req.params.id,
//             { name, email, phone, skills },
//             { new: true, runValidators: true } 
//         );

//         if (!updatedMember) {
//             return res.status(404).json({ message: "Member not found" });
//         }

//         res.status(200).json(updatedMember);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };
// export const deleteMember = async (req, res) => {
//     try {
//         const deletedMember = await Member.findByIdAndDelete(req.params.id);
        
//         if (!deletedMember) {
//             return res.status(404).json({ message: "Member not found" });
//         }

//         res.status(200).json({ message: "Member successfully deleted" });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };


import Member from "../models/Members.js";


// export const createMember = async (req, res) => {
//   try {
//     const { name, email, phone, skills } = req.body;

//     if (!name || !email) {
//       return res.status(400).json({
//         message: "Name and email fields are required.",
//       });
//     }

//     const existingMember = await Member.findOne({ email });

//     if (existingMember) {
//       return res.status(400).json({
//         message: "A member with this email already exists.",
//       });
//     }

//     // Cloudinary image URL
//     const avatar = req.file ? req.file.path : "";

//     const newMember = new Member({
//       name,
//       email,
//       phone,
//       skills,
//       avatar,
//     });

//     const savedMember = await newMember.save();

//     res.status(201).json(savedMember);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };

export const createMember = async (req, res) => {
  try {
    let avatarUrl = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "members",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      avatarUrl = result.secure_url;
    }

    // Example DB save
    const member = {
      name: req.body.name,
      avatar: avatarUrl,
    };

    res.status(201).json({
      success: true,
      message: "Member created successfully",
      member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });

    res.status(200).json(members);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const updateMember = async (req, res) => {
  try {
    const { name, email, phone, skills } = req.body;

    const updateData = {
      name,
      email,
      phone,
      skills,
    };

    // Update avatar only if a new image is uploaded
    if (req.file) {
      updateData.avatar = req.file.path;
    }

    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMember) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);

    if (!deletedMember) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json({
      message: "Member successfully deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
