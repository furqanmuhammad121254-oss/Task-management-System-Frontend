

// import React, { useEffect, useState } from "react";
// import api from "../../service/api";

// const Profile = () => {
//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // EDIT STATE
//   const [editUser, setEditUser] = useState(null);
//   const [form, setForm] = useState({ name: "", email: "", password: "" });

//   /* ================= FETCH ADMINS ================= */
//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const res = await api.get("/user/admin");
//         setAdmins(res.data.admins);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdmins();
//   }, []);

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this admin?")) {
//       try {
//         await api.delete(`/user/delete/${id}`);
//         setAdmins((prev) => prev.filter((u) => u._id !== id));
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   /* ================= OPEN EDIT ================= */
//   const handleEdit = (user) => {
//     setEditUser(user);
//     setForm({ name: user.name, email: user.email, password: user.password || "" });
//   };

//   /* ================= UPDATE ================= */
//   const handleUpdate = async () => {
//     try {
//       const res = await api.put(`/user/update/${editUser._id}`, form);
//       const updated = res.data.user;

//       setAdmins((prev) =>
//         prev.map((u) => (u._id === editUser._id ? updated : u))
//       );

//       setEditUser(null);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   /* ================= LOADING ================= */
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-lg text-indigo-600 font-bold">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-5 py-8 font-sans bg-slate-50 h-140">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-8 border-b-2 border-slate-200 pb-4">
//         <h2 className="text-slate-800 text-3xl font-bold tracking-tight">Admin Dashboard</h2>
//       </div>

//       {/* ================= ADMINS GRID / CARDS ================= */}
//       <div className="flex gap-8 p-6 max-w-7xl mx-auto">
//         {/* {admins.map((admin) => ( */}
//           <div
//             // key={admin._id}
//             className="group relative bg-white w-full max-w-[440px] h-[500px] rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(148,163,184,0.12)] hover:shadow-[0_8px_30px_-4px_rgba(79,70,229,0.15)] hover:border-indigo-100/80 p-8 flex flex-col justify-between transition-all duration-300 mx-auto overflow-hidden"
//           >
//             {/* Decorative subtle background glow on card hover */}
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-indigo-50/40 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//             {/* Top Section / Card Content */}
//             <div className="relative flex flex-col items-center w-full">

//               {/* Modern Large Centered Avatar with Ring Effect */}
//               <div className="relative mb-6">
//                 <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-50 to-indigo-100/50 text-indigo-600 flex items-center justify-center font-bold text-4xl border border-indigo-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
//                   {/* {admin.name ? admin.name.charAt(0).toUpperCase() : "A"} */}
//                 </div>
//                 <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
//                 </span>
//               </div>

//               {/* Profile Field Stack */}
//               <div className="w-full space-y-4">

//                 {/* Name Display Field */}
//                 <div className="flex flex-col gap-1 w-full">
//                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">
//                     Admin Name
//                   </span>
//                   <div className="flex items-center px-4 h-12 w-full bg-slate-50/50 border border-slate-150 rounded-2xl group-hover:bg-white group-hover:border-indigo-100 transition-colors duration-300">
//                     <span className="text-slate-800 font-semibold text-base truncate">
//                       {/* {admin.name} */}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Email Display Field */}
//                 <div className="flex flex-col gap-1 w-full">
//                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">
//                     Email Address
//                   </span>
//                   <div className="flex items-center px-4 h-12 w-full bg-slate-50/50 border border-slate-150 rounded-2xl group-hover:bg-white group-hover:border-indigo-100 transition-colors duration-300 text-sm">
//                     <span className="text-slate-600 font-medium truncate">
//                       {/* {admin.email} */}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Password Display Field */}
//                 <div className="flex flex-col gap-1 w-full">
//                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">
//                     Security Code
//                   </span>
//                   <div className="flex items-center px-4 h-12 w-full bg-slate-50/50 border border-slate-150 rounded-2xl group-hover:bg-white group-hover:border-indigo-100 transition-colors duration-300 text-sm">
//                     <span className="text-slate-400 tracking-[0.25em] text-xs font-bold pt-1">
//                       ••••••••
//                     </span>
//                   </div>
//                 </div>

//               </div>
//             </div>

//             {/* Actions Buttons Container */}
//             <div className="flex gap-3 pt-4 w-full relative z-10">
//               <button
//                 onClick={() => handleEdit(admin)}
//                 className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-indigo-100 active:scale-[0.98]"
//               >
//                 Edit Profile
//               </button>
//               <button
//                 onClick={() => handleDelete(admin._id)}
//                 className="py-3 px-4 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 font-semibold text-sm cursor-pointer transition-colors duration-200 active:scale-[0.98]"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         {/* ))} */}
//       </div>



//       {/* ================= EDIT MODAL ================= */}
//       {editUser && (
//         <div className="fixed inset-0 bg-slate-900/60 flex justify-center items-center z-50 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl animate-in fade-in zoom-in-95 duration-200">
//             <h3 className="text-slate-900 text-2xl font-semibold mb-6">Edit Admin Profile</h3>

//             <div className="flex flex-col gap-4">
//               <div>
//                 <label className="block mb-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">Full Name</label>
//                 <input
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   placeholder="Name"
//                   className="w-full p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">Email Address</label>
//                 <input
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   placeholder="Email"
//                   className="w-full p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
//                 <input
//                   type="password"
//                   value={form.password}
//                   onChange={(e) => setForm({ ...form, password: e.target.value })}
//                   placeholder="Password"
//                   className="w-full p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
//                 />
//               </div>
//             </div>

//             {/* Modal Buttons */}
//             <div className="flex gap-3 mt-7 justify-end">
//               <button
//                 onClick={() => setEditUser(null)}
//                 className="py-2.5 px-5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 font-semibold text-sm cursor-pointer transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 className="py-2.5 px-5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm cursor-pointer transition-colors"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;



import React, { useEffect, useState } from "react";
import api from "../../service/api";

const Profile = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ================= FETCH ADMINS =================
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await api.get("/user/admin");

        console.log(res.data);

        setAdmins(res.data.admins || []);
      } catch (error) {
        console.log("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/user/delete/${id}`);

      setAdmins((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  // ================= OPEN EDIT =================
  const handleEdit = (user) => {
    setEditUser(user);

    setForm({
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      const res = await api.put(
        `/user/update/${editUser._id}`,
        form
      );

      const updatedUser = res.data.user;

      setAdmins((prev) =>
        prev.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );

      setEditUser(null);
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-slate-800">
          Admin Dashboard
        </h2>
      </div>

      {/* No Admin */}
      {admins.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No Admin Found
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center">
          {admins.map((admin) => (
            <div
              key={admin._id}
              className="group bg-white w-full max-w-[420px] rounded-3xl border shadow-md p-8 flex flex-col justify-between hover:shadow-xl transition"
            >
              {/* Profile */}
              <div>
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-4xl font-bold">
                    {admin.name
                      ? admin.name.charAt(0).toUpperCase()
                      : "A"}
                  </div>
                </div>

                {/* Name */}
                <div className="mb-4">
                  <label className="text-xs text-gray-400 uppercase">
                    Admin Name
                  </label>

                  <div className="border rounded-xl p-3 mt-1">
                    {admin.name}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="text-xs text-gray-400 uppercase">
                    Email Address
                  </label>

                  <div className="border rounded-xl p-3 mt-1">
                    {admin.email}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs text-gray-400 uppercase">
                    Password
                  </label>

                  <div className="border rounded-xl p-3 mt-1">
                    ••••••••
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleEdit(admin)}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(admin._id)}
                  className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editUser && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">
            <h3 className="text-2xl font-bold mb-5">
              Edit Admin
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="password"
                placeholder="New Password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditUser(null)}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;