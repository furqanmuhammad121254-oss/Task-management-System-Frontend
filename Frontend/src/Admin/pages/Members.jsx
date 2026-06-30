

// import React, { useState, useEffect } from 'react';
// import api from "../../service/api.js";

// const Members = () => {
//     const [showForm, setShowForm] = useState(false);
//     const [members, setMembers] = useState([]);
//     const [skill, setSkill] = useState("");
//     const [skills, setSkills] = useState([]);
//     const [editMember, setEditMember] = useState(null);
//     const [preview, setPreview] = useState(null);

//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         phone: ""
//     });



//     useEffect(() => {
//         fetchMembers();
//     }, []);

//     // 1. READ: Fetch all members from Database
//     const fetchMembers = async () => {
//         try {
//             const res = await api.get("/api/members");
//             setMembers(res.data);
//         } catch (err) {
//             console.error("Error fetching members:", err);
//         }
//     };

//     // 2. CREATE & UPDATE Handler
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (editMember) {
//                 // PUT Request for editing existing records
//                 const res = await api.put(`/api/members/${editMember._id}`, { ...form, skills });
//                 setMembers((prev) =>
//                     prev.map((m) => (m._id === editMember._id ? res.data : m))
//                 );
//             } else {
//                 // POST Request for saving new records
//                 const res = await api.post("/api/members", { ...form, skills });
//                 setMembers((prev) => [res.data, ...prev]);
//             }

//             // Reset UI states completely
//             closeAndResetForm();
//         } catch (err) {
//             console.error("Error saving member database changes:", err);
//         }
//     };

//     // 3. DELETE Handler
//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to remove this member?")) return;
//         try {
//             await api.delete(`/api/members/${id}`);
//             setMembers((prev) => prev.filter((member) => member._id !== id));
//         } catch (err) {
//             console.error("Error deleting database record:", err);
//         }
//     };


//     const handleEditClick = (member) => {
//         setEditMember(member);
//         setForm({
//             name: member.name,
//             email: member.email,
//             phone: member.phone || ""
//         });
//         setSkills(member.skills || []);
//         setShowForm(true);
//     };

//     const closeAndResetForm = () => {
//         setShowForm(false);
//         setEditMember(null);
//         setForm({ name: "", email: "", phone: "" });
//         setSkills([]);
//         setSkill("");
//     };

//     //  profile image 
//     const addSkill = (e) => {
//         e.preventDefault();
//         if (skill.trim() === "") return;
//         setSkills([...skills, skill.trim()]);
//         setSkill("");
//     };

//     const removeSkill = (index) => {
//         setSkills(skills.filter((_, i) => i !== index));
//     };


//     const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };



//     return (
//         <div className="w-full h-185 bg-slate-50 p-6 md:p-10">
//             <div className="max-w-5xl mx-auto">

//                 {/* Header Section */}
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//                     <div>
//                         <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Members Dashboard</h1>
//                         <p className="text-sm text-slate-500 mt-1">Manage your team directory, updates, and technical skill sets.</p>
//                     </div>
//                     <button
//                         onClick={() => setShowForm(true)}
//                         className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 transition-all active:scale-[0.98] self-start sm:self-auto"
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                         </svg>
//                         Create Member
//                     </button>
//                 </div>

//                 {/* Table Container */}
//                 <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
//                     <div className="overflow-x-auto">
//                         <table className="w-full border-collapse text-left text-sm text-slate-600">
//                             <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-4 w-16 text-center">#No</th>
//                                     <th scope="col" className="px-6 py-4">Name</th>
//                                     <th scope="col" className="px-6 py-4">Email</th>
//                                     <th scope="col" className="px-6 py-4">Phone</th>
//                                     <th scope="col" className="px-6 py-4 text-right pr-10">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-slate-100">
//                                 {members.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="5" className="text-center py-10 text-slate-400 font-medium">
//                                             No members found. Click 'Create Member' to add one.
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     members.map((member, index) => (
//                                         <tr key={member._id || index} className="hover:bg-slate-50/75 transition-colors">
//                                             <td className="px-6 py-4 font-medium text-slate-400 text-center">
//                                                 {index + 1}
//                                             </td>
//                                             <td className="px-6 py-4 font-medium text-slate-900">
//                                                 <div>
//                                                     <p>{member.name}</p>
//                                                     {/* Optional: Render skills inside your main dashboard layout view */}
//                                                     {member.skills && member.skills.length > 0 && (
//                                                         <div className="flex flex-wrap gap-1 mt-1">
//                                                             {member.skills.map((s, idx) => (
//                                                                 <span key={idx} className="bg-slate-100 text-[10px] px-1.5 py-0.5 rounded text-slate-600 font-normal">
//                                                                     {s}
//                                                                 </span>
//                                                             ))}
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4">{member.email}</td>
//                                             <td className="px-6 py-4 text-slate-500">{member.phone || "—"}</td>
//                                             <td className="px-6 py-4 text-sm text-right pr-6 whitespace-nowrap">
//                                                 <button
//                                                     onClick={() => handleEditClick(member)}
//                                                     className="text-indigo-600 hover:text-indigo-900 font-medium mr-4 transition-colors"
//                                                 >
//                                                     Edit
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDelete(member._id)}
//                                                     className="text-rose-600 hover:text-rose-900 font-medium transition-colors"
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 {/* Modal Backdrop Form */}
//                 {showForm && (
//                     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//                         <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">

//                             <div className="mb-5">
//                                 <h2 className="text-xl font-bold text-slate-900">
//                                     {editMember ? "Edit Team Member" : "Create New Member"}
//                                 </h2>
//                                 <p className="text-sm text-slate-500 mt-1">Fill in the profile details for this team member.</p>
//                             </div>

//                             <form onSubmit={handleSubmit} className="space-y-4">
//                                 <div>

//                                     {/* profile image  */}

//                                     <div className="flex flex-col items-center justify-center p-4">
//                                         {/* Hidden File Input tied to the label */}
//                                         <label className="relative w-32 h-32 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-slate-400 bg-slate-50 cursor-pointer overflow-hidden group hover:border-indigo-500 hover:bg-slate-100 transition-all duration-300">

//                                             {preview ? (
//                                                 <>
//                                                     {/* Image Preview */}
//                                                     <img
//                                                         src={preview}
//                                                         alt="Profile Preview"
//                                                         className="w-full h-full object-cover object-center"
//                                                     />
//                                                     {/* Hover overlay to change image */}
//                                                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
//                                                         <span className="text-white text-xs font-medium">Change Photo</span>
//                                                     </div>
//                                                 </>
//                                             ) : (
//                                                 /* Empty/Upload State Icon & Text */
//                                                 <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-indigo-500">
//                                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                                                     </svg>
//                                                     <span className="text-xs font-medium">Upload</span>
//                                                 </div>
//                                             )}

//                                             {/* The actual native input is hidden but clickable via the label */}
//                                             <input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 className="hidden"
//                                                 onChange={handleImageChange}
//                                             />
//                                         </label>
//                                     </div>


//                                     <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
//                                     <input
//                                         type="text"
//                                         required
//                                         value={form.name}
//                                         onChange={(e) => setForm({ ...form, name: e.target.value })}
//                                         placeholder="Full Name"
//                                         className="w-full border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
//                                     <input
//                                         type="email"
//                                         required
//                                         value={form.email}
//                                         onChange={(e) => setForm({ ...form, email: e.target.value })}
//                                         placeholder="jane@example.com"
//                                         className="w-full border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Phone Number</label>
//                                     <input
//                                         type="text"
//                                         value={form.phone}
//                                         onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                                         placeholder="+1 (555) 000-0000"
//                                         className="w-full border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
//                                     />
//                                 </div>

//                                 {/* Skills Section */}
//                                 <div className="pt-2">
//                                     <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Expertise / Skills</label>
//                                     <div className="flex gap-2">
//                                         <input
//                                             type="text"
//                                             placeholder="Expertise Skill Add"
//                                             value={skill}
//                                             onChange={(e) => setSkill(e.target.value)}
//                                             className="flex-1 border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={addSkill}
//                                             className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-4 rounded-lg transition-colors"
//                                         >
//                                             Add
//                                         </button>
//                                     </div>

//                                     {/* Skills Badge Container */}
//                                     {skills.length > 0 && (
//                                         <div className="flex flex-wrap gap-1.5 mt-3 max-h-24 overflow-y-auto p-1 bg-slate-50 rounded-lg border border-dashed border-slate-200">
//                                             {skills.map((s, i) => (
//                                                 <span
//                                                     key={i}
//                                                     className="inline-flex items-center gap-1.5 bg-white border border-slate-200 pl-2.5 pr-1.5 py-0.5 rounded-md text-xs font-medium text-slate-700 shadow-sm"
//                                                 >
//                                                     {s}
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => removeSkill(i)}
//                                                         className="text-slate-400 hover:text-rose-500 transition-colors p-0.5 rounded"
//                                                     >
//                                                         ✕
//                                                     </button>
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Form Footer Controls */}
//                                 <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
//                                     <button
//                                         type="button"
//                                         onClick={closeAndResetForm}
//                                         className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors"
//                                     >
//                                         {editMember ? "Update Settings" : "Save Member"}
//                                     </button>
//                                 </div>
//                             </form>

//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
// export default Members;


// import React, { useState, useEffect } from 'react';
// import api from "../../service/api.js";

// const Members = () => {
//     const [showForm, setShowForm] = useState(false);
//     const [members, setMembers] = useState([]);
//     const [skill, setSkill] = useState("");
//     const [skills, setSkills] = useState([]);
//     const [editMember, setEditMember] = useState(null);
    
//     // Image Upload State
//     const [preview, setPreview] = useState(null);
//     const [imageFile, setImageFile] = useState(null); 

//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         phone: ""
//     });

//     useEffect(() => {
//         fetchMembers();
//     }, []);

//     // 1. READ: Fetch all members from Database
//     const fetchMembers = async () => {
//         try {
//             const res = await api.get("/api/members");
//             setMembers(res.data);
//         } catch (err) {
//             console.error("Error fetching members:", err);
//         }
//     };

//     // 2. CREATE & UPDATE Handler
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formData = new FormData();
//             formData.append("name", form.name);
//             formData.append("email", form.email);
//             formData.append("phone", form.phone);
            
//             // Appending skills correctly 
//             skills.forEach(s => formData.append("skills", s));

//             if (imageFile) {
//                 formData.append("avatar", imageFile);
//             }

//             const config = {
//                 headers: { "Content-Type": "multipart/form-data" }
//             };

//             if (editMember) {
//                 const res = await api.put(`/api/members/${editMember._id}`, formData, config);
//                 setMembers((prev) =>
//                     prev.map((m) => (m._id === editMember._id ? res.data : m))
//                 );
//             } else {
//                 const res = await api.post("/api/members", formData, config);
//                 setMembers((prev) => [res.data, ...prev]);
//             }

//             closeAndResetForm();
//         } catch (err) {
//             console.error("Error saving member database changes:", err);
//         }
//     };

//     // 3. DELETE Handler
//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to remove this member?")) return;
//         try {
//             await api.delete(`/api/members/${id}`);
//             setMembers((prev) => prev.filter((member) => member._id !== id));
//         } catch (err) {
//             console.error("Error deleting database record:", err);
//         }
//     };

//     const handleEditClick = (member) => {
//         setEditMember(member);
//         setForm({
//             name: member.name,
//             email: member.email,
//             phone: member.phone || ""
//         });
//         setSkills(member.skills || []);
        
//         // REMOVED LOCALHOST PREFIX HERE: Cloudinary supplies a full URL direct string
//         if (member.avatar && member.avatar !== "null" && member.avatar !== null) {
//             setPreview(member.avatar); 
//         } else {
//             setPreview(null);
//         }
        
//         setShowForm(true);
//     };

//     const closeAndResetForm = () => {
//         setShowForm(false);
//         setEditMember(null);
//         setForm({ name: "", email: "", phone: "" });
//         setSkills([]);
//         setSkill("");
//         setPreview(null);
//         setImageFile(null);
//     };

//     const addSkill = (e) => {
//         e.preventDefault();
//         if (skill.trim() === "") return;
//         setSkills([...skills, skill.trim()]);
//         setSkill("");
//     };

//     const removeSkill = (index) => {
//         setSkills(skills.filter((_, i) => i !== index));
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setImageFile(file); 
//             setPreview(URL.createObjectURL(file)); 
//         }
//     };

//     return (
//         <div className="w-full h-185 bg-slate-50 p-6 md:p-10">
//             <div className="max-w-5xl mx-auto">

//                 {/* Header Section */}
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//                     <div>
//                         <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Members Dashboard</h1>
//                         <p className="text-sm text-slate-500 mt-1">Manage your team directory, updates, and technical skill sets.</p>
//                     </div>
//                     <button
//                         onClick={() => setShowForm(true)}
//                         className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all active:scale-[0.98] self-start sm:self-auto"
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                         </svg>
//                         Create Member
//                     </button>
//                 </div>

//                 {/* Table Container */}
//                 <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
//                     <div className="overflow-x-auto">
//                         <table className="w-full border-collapse text-left text-sm text-slate-600">
//                             <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
//                                 <tr>
//                                     <th scope="col" className="px-6 py-4 w-16 text-center">#No</th>
//                                     <th scope="col" className="px-6 py-4">Avatar</th>
//                                     <th scope="col" className="px-6 py-4">Name</th>
//                                     <th scope="col" className="px-6 py-4">Email</th>
//                                     <th scope="col" className="px-6 py-4">Phone</th>
//                                     <th scope="col" className="px-6 py-4 text-right pr-10">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-slate-100">
//                                 {members.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="6" className="text-center py-10 text-slate-400 font-medium">
//                                             No members found. Click 'Create Member' to add one.
//                                         </td>
//                                     </tr>
//                                 ) : (
//                                     members.map((member, index) => (
//                                         <tr key={member._id || index} className="hover:bg-slate-50/75 transition-colors">
//                                             <td className="px-6 py-4 font-medium text-slate-400 text-center">
//                                                 {index + 1}
//                                             </td>
                                            
//                                             {/* Dynamic Avatar Parsing Section */}
//                                             <td className="px-6 py-4">
//                                                 <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center relative">
//                                                     {member.avatar && member.avatar !== "null" ? (
//                                                         <img 
//                                                             src={member.avatar} // REMOVED LOCALHOST PREFIX HERE
//                                                             alt={member.name} 
//                                                             className="w-full h-full object-cover z-10 relative"
//                                                             onError={(e) => {
//                                                                 e.target.style.display = 'none';
//                                                             }}
//                                                         />
//                                                     ) : null}
//                                                     <div className="absolute inset-0 w-full h-full flex items-center justify-center text-xs font-bold bg-indigo-50 text-indigo-600 uppercase z-0">
//                                                         {member.name ? member.name.charAt(0) : "?"}
//                                                     </div>
//                                                 </div>
//                                             </td>

//                                             <td className="px-6 py-4 font-medium text-slate-900">
//                                                 <div>
//                                                     <p>{member.name}</p>
//                                                     {member.skills && member.skills.length > 0 && (
//                                                         <div className="flex flex-wrap gap-1 mt-1">
//                                                             {member.skills.map((s, idx) => (
//                                                                 <span key={idx} className="bg-slate-100 text-[10px] px-1.5 py-0.5 rounded text-slate-600 font-normal">
//                                                                     {s}
//                                                                 </span>
//                                                             ))}
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4">{member.email}</td>
//                                             <td className="px-6 py-4 text-slate-500">{member.phone || "—"}</td>
//                                             <td className="px-6 py-4 text-sm text-right pr-6 whitespace-nowrap">
//                                                 <button
//                                                     onClick={() => handleEditClick(member)}
//                                                     className="text-indigo-600 hover:text-indigo-900 font-medium mr-4 transition-colors"
//                                                 >
//                                                     Edit
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDelete(member._id)}
//                                                     className="text-rose-600 hover:text-rose-900 font-medium transition-colors"
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 {/* Modal Backdrop Form */}
//                 {showForm && (
//                     <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//                         <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-slate-100 max-h-[90vh] overflow-y-auto">

//                             <div className="mb-5">
//                                 <h2 className="text-xl font-bold text-slate-900">
//                                     {editMember ? "Edit Team Member" : "Create New Member"}
//                                 </h2>
//                                 <p className="text-sm text-slate-500 mt-1">Fill in the profile details for this team member.</p>
//                             </div>

//                             <form onSubmit={handleSubmit} className="space-y-4">
                                
//                                 {/* Image Uploader */}
//                                 <div className="flex flex-col items-center justify-center p-2">
//                                     <label className="relative w-28 h-28 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer overflow-hidden group hover:border-indigo-500 hover:bg-slate-100 transition-all duration-300">
//                                         {preview && preview !== "null" ? (
//                                             <>
//                                                 <img
//                                                     src={preview}
//                                                     alt="Profile Preview"
//                                                     className="w-full h-full object-cover object-center"
//                                                 />
//                                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
//                                                     <span className="text-white text-xs font-medium">Change Photo</span>
//                                                 </div>
//                                             </>
//                                         ) : (
//                                             <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-indigo-500">
//                                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                                                 </svg>
//                                                 <span className="text-xs font-medium">Upload</span>
//                                             </div>
//                                         )}
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             className="hidden"
//                                             onChange={handleImageChange}
//                                         />
//                                     </label>
//                                 </div>

//                                 <div>
//                                     <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
//                                     <input
//                                         type="text"
//                                         required
//                                         value={form.name}
//                                         onChange={(e) => setForm({ ...form, name: e.target.value })}
//                                         placeholder="Full Name"
//                                         className="w-full border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
//                                     <input
//                                         type="type"
//                                         required
//                                         value={form.email}
//                                         onChange={(e) => setForm({ ...form, email: e.target.value })}
//                                         placeholder="jane@example.com"
//                                         className="w-full border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Phone Number</label>
//                                     <input
//                                         type="text"
//                                         value={form.phone}
//                                         onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                                         placeholder="+1 (555) 000-0000"
//                                         className="w-full border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
//                                     />
//                                 </div>

//                                 {/* Skills Section */}
//                                 <div className="pt-2">
//                                     <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Expertise / Skills</label>
//                                     <div className="flex gap-2">
//                                         <input
//                                             type="text"
//                                             placeholder="Expertise Skill Add"
//                                             value={skill}
//                                             onChange={(e) => setSkill(e.target.value)}
//                                             className="flex-1 border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={addSkill}
//                                             className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-4 rounded-lg transition-colors"
//                                         >
//                                             Add
//                                         </button>
//                                     </div>

//                                     {skills.length > 0 && (
//                                         <div className="flex flex-wrap gap-1.5 mt-3 max-h-24 overflow-y-auto p-1 bg-slate-50 rounded-lg border border-dashed border-slate-200">
//                                             {skills.map((s, i) => (
//                                                 <span
//                                                     key={i}
//                                                     className="inline-flex items-center gap-1.5 bg-white border border-slate-200 pl-2.5 pr-1.5 py-0.5 rounded-md text-xs font-medium text-slate-700 shadow-sm"
//                                                 >
//                                                     {s}
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => removeSkill(i)}
//                                                         className="text-slate-400 hover:text-rose-500 transition-colors p-0.5 rounded"
//                                                     >
//                                                         ✕
//                                                     </button>
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Form Footer Controls */}
//                                 <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
//                                     <button
//                                         type="button"
//                                         onClick={closeAndResetForm}
//                                         className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors"
//                                     >
//                                         {editMember ? "Update Settings" : "Save Member"}
//                                     </button>
//                                 </div>
//                             </form>

//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Members;



import React, { useState, useEffect } from 'react';
import api from "../../service/api.js";

const Members = () => {
    const [showForm, setShowForm] = useState(false);
    const [members, setMembers] = useState([]);
    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState([]);
    const [editMember, setEditMember] = useState(null);
    
    // Image Upload State
    const [preview, setPreview] = useState(null);
    const [imageFile, setImageFile] = useState(null); 

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    // 1. READ: Fetch all members from Database
    const fetchMembers = async () => {
        try {
            const res = await api.get("/api/members");
            setMembers(res.data);
        } catch (err) {
            console.error("Error fetching members:", err);
        }
    };

    // 2. CREATE & UPDATE Handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("phone", form.phone);
            
            // Appending skills correctly 
            skills.forEach(s => formData.append("skills", s));

            if (imageFile) {
                formData.append("avatar", imageFile);
            }

            const config = {
                headers: { "Content-Type": "multipart/form-data" }
            };

            if (editMember) {
                const res = await api.put(`/api/members/${editMember._id}`, formData, config);
                setMembers((prev) =>
                    prev.map((m) => (m._id === editMember._id ? res.data : m))
                );
            } else {
                const res = await api.post("/api/members", formData, config);
                setMembers((prev) => [res.data, ...prev]);
            }

            closeAndResetForm();
        } catch (err) {
            console.error("Error saving member database changes:", err);
        }
    };

    // 3. DELETE Handler
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this member?")) return;
        try {
            await api.delete(`/api/members/${id}`);
            setMembers((prev) => prev.filter((member) => member._id !== id));
        } catch (err) {
            console.error("Error deleting database record:", err);
        }
    };

    const handleEditClick = (member) => {
        setEditMember(member);
        setForm({
            name: member.name,
            email: member.email,
            phone: member.phone || ""
        });
        setSkills(member.skills || []);
        
        if (member.avatar && member.avatar !== "null" && member.avatar !== null) {
            setPreview(member.avatar); 
        } else {
            setPreview(null);
        }
        
        setShowForm(true);
    };

    const closeAndResetForm = () => {
        setShowForm(false);
        setEditMember(null);
        setForm({ name: "", email: "", phone: "" });
        setSkills([]);
        setSkill("");
        setPreview(null);
        setImageFile(null);
    };

    const addSkill = (e) => {
        e.preventDefault();
        if (skill.trim() === "") return;
        setSkills([...skills, skill.trim()]);
        setSkill("");
    };

    const removeSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); 
            setPreview(URL.createObjectURL(file)); 
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-6 md:p-10">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Members Dashboard</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage your team directory, updates, and technical skill sets.</p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all active:scale-[0.98] self-start sm:self-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Create Member
                    </button>
                </div>

                {/* --- MOBILE CARD VIEW (Visible only on small screens) --- */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {members.length === 0 ? (
                        <div className="text-center py-10 bg-white rounded-xl border border-slate-200 text-slate-400 font-medium">
                            No members found. Click 'Create Member' to add one.
                        </div>
                    ) : (
                        members.map((member, index) => (
                            <div key={member._id || index} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col gap-4">
                                {/* Header: Avatar + Info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative flex items-center justify-center">
                                        {member.avatar && member.avatar !== "null" ? (
                                            <img 
                                                src={member.avatar} 
                                                alt={member.name} 
                                                className="w-full h-full object-cover z-10 relative"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        ) : null}
                                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold bg-indigo-50 text-indigo-600 uppercase z-0">
                                            {member.name ? member.name.charAt(0) : "?"}
                                        </div>
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="font-semibold text-slate-900 truncate">{member.name}</h3>
                                        <p className="text-sm text-slate-500 truncate">{member.email}</p>
                                    </div>
                                </div>

                                {/* Body: Phone & Skills */}
                                <div className="flex flex-col gap-3 border-t border-slate-100 pt-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-400 font-medium">Phone:</span>
                                        <span className="text-slate-700">{member.phone || "—"}</span>
                                    </div>
                                    
                                    {member.skills && member.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            {member.skills.map((s, idx) => (
                                                <span key={idx} className="bg-slate-100 text-[11px] px-2 py-1 rounded-md text-slate-600 font-medium">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Footer: Actions */}
                                <div className="flex justify-end gap-4 border-t border-slate-100 pt-3 mt-auto">
                                    <button
                                        onClick={() => handleEditClick(member)}
                                        className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold py-1 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member._id)}
                                        className="text-sm text-rose-600 hover:text-rose-800 font-semibold py-1 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* --- DESKTOP TABLE VIEW (Hidden on small screens) --- */}
                <div className="hidden md:block w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left text-sm text-slate-600">
                            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                                <tr>
                                    <th scope="col" className="px-6 py-4 w-16 text-center">#No</th>
                                    <th scope="col" className="px-6 py-4">Avatar</th>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Email</th>
                                    <th scope="col" className="px-6 py-4">Phone</th>
                                    <th scope="col" className="px-6 py-4 text-right pr-10">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {members.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-10 text-slate-400 font-medium">
                                            No members found. Click 'Create Member' to add one.
                                        </td>
                                    </tr>
                                ) : (
                                    members.map((member, index) => (
                                        <tr key={member._id || index} className="hover:bg-slate-50/75 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-400 text-center">
                                                {index + 1}
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center relative">
                                                    {member.avatar && member.avatar !== "null" ? (
                                                        <img 
                                                            src={member.avatar} 
                                                            alt={member.name} 
                                                            className="w-full h-full object-cover z-10 relative"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                            }}
                                                        />
                                                    ) : null}
                                                    <div className="absolute inset-0 w-full h-full flex items-center justify-center text-xs font-bold bg-indigo-50 text-indigo-600 uppercase z-0">
                                                        {member.name ? member.name.charAt(0) : "?"}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 font-medium text-slate-900">
                                                <div>
                                                    <p>{member.name}</p>
                                                    {member.skills && member.skills.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {member.skills.map((s, idx) => (
                                                                <span key={idx} className="bg-slate-100 text-[10px] px-1.5 py-0.5 rounded text-slate-600 font-normal">
                                                                    {s}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{member.email}</td>
                                            <td className="px-6 py-4 text-slate-500">{member.phone || "—"}</td>
                                            <td className="px-6 py-4 text-sm text-right pr-6 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleEditClick(member)}
                                                    className="text-indigo-600 hover:text-indigo-900 font-medium mr-4 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(member._id)}
                                                    className="text-rose-600 hover:text-rose-900 font-medium transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal Backdrop Form */}
                {showForm && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-slate-100 max-h-[90vh] overflow-y-auto">

                            <div className="mb-5">
                                <h2 className="text-xl font-bold text-slate-900">
                                    {editMember ? "Edit Team Member" : "Create New Member"}
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Fill in the profile details for this team member.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                
                                {/* Image Uploader */}
                                <div className="flex flex-col items-center justify-center p-2">
                                    <label className="relative w-28 h-28 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer overflow-hidden group hover:border-indigo-500 hover:bg-slate-100 transition-all duration-300">
                                        {preview && preview !== "null" ? (
                                            <>
                                                <img
                                                    src={preview}
                                                    alt="Profile Preview"
                                                    className="w-full h-full object-cover object-center"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                                                    <span className="text-white text-xs font-medium">Change Photo</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-indigo-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                <span className="text-xs font-medium">Upload</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="Full Name"
                                        className="w-full border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="jane@example.com"
                                        className="w-full border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Phone Number</label>
                                    <input
                                        type="text"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    />
                                </div>

                                {/* Skills Section */}
                                <div className="pt-2">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Expertise / Skills</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Expertise Skill Add"
                                            value={skill}
                                            onChange={(e) => setSkill(e.target.value)}
                                            className="flex-1 border border-slate-200 p-2.5 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={addSkill}
                                            className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-4 rounded-lg transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>

                                    {skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-3 max-h-24 overflow-y-auto p-1 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                                            {skills.map((s, i) => (
                                                <span
                                                    key={i}
                                                    className="inline-flex items-center gap-1.5 bg-white border border-slate-200 pl-2.5 pr-1.5 py-0.5 rounded-md text-xs font-medium text-slate-700 shadow-sm"
                                                >
                                                    {s}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSkill(i)}
                                                        className="text-slate-400 hover:text-rose-500 transition-colors p-0.5 rounded"
                                                    >
                                                        ✕
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Form Footer Controls */}
                                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                                    <button
                                        type="button"
                                        onClick={closeAndResetForm}
                                        className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-colors"
                                    >
                                        {editMember ? "Update Settings" : "Save Member"}
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Members;