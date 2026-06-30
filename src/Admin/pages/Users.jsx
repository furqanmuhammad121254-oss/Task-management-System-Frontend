// import React, { useEffect, useState } from "react";
// import api from "../../service/api.js";
// import { Mail, Shield, Loader2, Edit, X, UserCheck, UserX } from "lucide-react";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   const [confirmUser, setConfirmUser] = useState(null);
//   const [editUser, setEditUser] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     createdAt: "",
//   });

//   // ================= FETCH USERS =================
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await api.get("/user/all-users");
//         const employees = (res.data.users || []).filter(
//           (user) => user.role === "employee"
//         );
//         setUsers(employees);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // ================= STATUS (ACTIVATE/DEACTIVATE) =================
//   const handleStatusClick = (user) => {
//     setConfirmUser(user);
//   };

//   const handleConfirm = async () => {
//     setSubmitting(true);
//     try {
//       const newStatus = !confirmUser.isActive;
//       await api.put(`/user/deactivate/${confirmUser._id}`, {
//         isActive: newStatus,
//       });

//       setUsers((prev) =>
//         prev.map((u) =>
//           u._id === confirmUser._id ? { ...u, isActive: newStatus } : u
//         )
//       );
//       setConfirmUser(null);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ================= EDIT =================
//   const handleEditClick = (user) => {
//     setEditUser(user);
//     setFormData({
//       name: user.name || "",
//       email: user.email || "",
//       createdAt: user.createdAt ? user.createdAt.slice(0, 10) : "",
//     });
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleUpdate = async () => {
//     setSubmitting(true);
//     try {
//       const res = await api.put(`/user/update/${editUser._id}`, formData);
//       setUsers((prev) =>
//         prev.map((u) => (u._id === editUser._id ? res.data.user : u))
//       );
//       setEditUser(null);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const formatDate = (date) => {
//     if (!date) return "N/A";
//     return new Date(date).toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col gap-3 items-center justify-center min-h-screen bg-slate-50">
//         <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
//         <p className="text-sm font-medium text-slate-500">Loading directory...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen antialiased text-slate-800">
      
//       {/* HEADER */}
//       <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
//         <div className="space-y-1">
//           <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
//             <Shield className="text-blue-600 w-6 h-6" />
//             User Directory
//           </h1>
//           <p className="text-sm text-slate-500">Manage internal employee accounts and permissions.</p>
//         </div>
//         <span className="text-xs bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 font-semibold rounded-full shadow-inner">
//           Total Employees: {users.length}
//         </span>
//       </div>

//       {/* TABLE CONTAINER */}
//       <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left border-collapse">
//             <thead>
//               <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 <th className="p-4 text-center w-16">#</th>
//                 <th className="p-4">Name</th>
//                 <th className="p-4">Email</th>
//                 <th className="p-4">Role</th>
//                 <th className="p-4">Created On</th>
//                 <th className="p-4 text-center w-32">User Actions</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-100">
//               {users.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="p-12 text-center text-slate-400 font-medium">
//                     No matching employees found.
//                   </td>
//                 </tr>
//               ) : (
//                 users.map((user, index) => (
//                   <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
//                     <td className="p-4 text-center font-medium text-slate-400">{index + 1}</td>
//                     <td className="p-4 font-semibold text-slate-900">{user.name || "N/A"}</td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2 text-slate-600 group-hover:text-slate-900 transition-colors">
//                         <Mail size={14} className="text-slate-400" /> 
//                         <span>{user.email}</span>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <span className="inline-flex items-center bg-blue-50 text-blue-700 font-medium text-xs px-2.5 py-1 rounded-md border border-blue-100 capitalize">
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="p-4 text-slate-500">{formatDate(user.createdAt)}</td>
                    
                   
//                     {/* STATUS ACTION */}
//                     <td className="p-4 text-center">
//                       <button
//                         onClick={() => handleStatusClick(user)}
//                         className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border shadow-sm transition-all active:scale-95 ${
//                           user.isActive
//                             ? "bg-emerald-50 text-emerald-700 border-emerald-200/60 hover:bg-emerald-100/80"
//                             : "bg-rose-50 text-rose-700 border-rose-200/60 hover:bg-rose-100/80"
//                         }`}
//                       >
//                         <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-emerald-600" : "bg-rose-600"}`} />
//                         {user.isActive ? "Active" : "Inactive"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ================= STATUS MODAL ================= */}
//       {confirmUser && (
//         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
//           <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl border border-slate-100 text-center relative max-sm:w-full animate-scale-up">
//             <button 
//               onClick={() => setConfirmUser(null)}
//               className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors"
//             >
//               <X size={18} />
//             </button>

//             <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${confirmUser.isActive ? "bg-rose-50" : "bg-emerald-50"}`}>
//               {confirmUser.isActive ? (
//                 <UserX className="text-rose-600 w-6 h-6" />
//               ) : (
//                 <UserCheck className="text-emerald-600 w-6 h-6" />
//               )}
//             </div>

//             <h2 className="text-lg font-bold text-slate-900 mb-1">
//               {confirmUser.isActive ? "Deactivate User Account?" : "Activate User Account?"}
//             </h2>

//             <p className="text-sm text-slate-500 mb-6">
//               Are you sure you want to change the active status for <span className="font-semibold text-slate-800">{confirmUser.name || "this user"}</span>?
//             </p>

//             <div className="flex gap-3">
//               <button
//                 disabled={submitting}
//                 onClick={() => setConfirmUser(null)}
//                 className="w-full border border-slate-200 text-slate-600 p-2.5 rounded-xl font-medium text-sm hover:bg-slate-50 transition-colors disabled:opacity-50"
//               >
//                 Cancel
//               </button>

//               <button
//                 disabled={submitting}
//                 onClick={handleConfirm}
//                 className={`w-full text-white p-2.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-1.5 ${
//                   confirmUser.isActive ? "bg-rose-600 hover:bg-rose-700 shadow-rose-200" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
//                 } shadow-lg shadow-offset-2 disabled:opacity-70`}
//               >
//                 {submitting && <Loader2 size={16} className="animate-spin" />}
//                 {confirmUser.isActive ? "Deactivate" : "Activate"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ================= EDIT MODAL ================= */}
//       {editUser && (
//         <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
//           <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-slate-100 relative animate-scale-up">
//             <button 
//               onClick={() => setEditUser(null)}
//               className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors"
//             >
//               <X size={18} />
//             </button>

//             <h2 className="text-lg font-bold text-slate-900 mb-5">Modify User Profile</h2>

//             <div className="space-y-4 mb-6">
//               <div>
//                 <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
//                 <input
//                   name="name"
//                   type="text"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl p-2.5 text-sm outline-none transition-all placeholder:text-slate-400"
//                   placeholder="John Doe"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
//                 <input
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl p-2.5 text-sm outline-none transition-all placeholder:text-slate-400"
//                   placeholder="john@company.com"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Creation Date</label>
//                 <input
//                   name="createdAt"
//                   type="date"
//                   value={formData.createdAt}
//                   onChange={handleChange}
//                   className="w-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl p-2.5 text-sm outline-none transition-all text-slate-700"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <button
//                 disabled={submitting}
//                 onClick={() => setEditUser(null)}
//                 className="w-full border border-slate-200 text-slate-600 p-2.5 rounded-xl font-medium text-sm hover:bg-slate-50 transition-colors disabled:opacity-50"
//               >
//                 Cancel
//               </button>

//               <button
//                 disabled={submitting}
//                 onClick={handleUpdate}
//                 className="w-full bg-blue-600 text-white p-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-1.5 disabled:opacity-70"
//               >
//                 {submitting && <Loader2 size={16} className="animate-spin" />}
//                 Save Changes
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default Users;


import React, { useEffect, useState } from "react";
import api from "../../service/api.js";
import { Mail, Shield, Loader2, Edit, X, UserCheck, UserX, Calendar, ShieldCheck } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [confirmUser, setConfirmUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    createdAt: "",
  });

  // ================= FETCH USERS =================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/user/all-users");
        const employees = (res.data.users || []).filter(
          (user) => user.role === "employee"
        );
        setUsers(employees);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ================= STATUS (ACTIVATE/DEACTIVATE) =================
  const handleStatusClick = (user) => {
    setConfirmUser(user);
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      const newStatus = !confirmUser.isActive;
      await api.put(`/user/deactivate/${confirmUser._id}`, {
        isActive: newStatus,
      });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === confirmUser._id ? { ...u, isActive: newStatus } : u
        )
      );
      setConfirmUser(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // ================= EDIT =================
  // const handleEditClick = (user) => {
  //   setEditUser(user);
  //   setFormData({
  //     name: user.name || "",
  //     email: user.email || "",
  //     createdAt: user.createdAt ? user.createdAt.slice(0, 10) : "",
  //   });
  // };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    setSubmitting(true);
    try {
      const res = await api.put(`/user/update/${editUser._id}`, formData);
      setUsers((prev) =>
        prev.map((u) => (u._id === editUser._id ? res.data.user : u))
      );
      setEditUser(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-3 items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
        <p className="text-sm font-medium text-slate-500">Loading directory...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen antialiased text-slate-800">
      
      {/* HEADER PANEL */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Shield className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
            User Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Manage internal employee accounts and permissions.</p>
        </div>
        <span className="text-xs bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 font-semibold rounded-xl shadow-inner whitespace-nowrap">
          Total Employees: {users.length}
        </span>
      </div>

      {/* MOBILE LIST LAYOUT (Hidden on Desktop) */}
      <div className="block lg:hidden space-y-4">
        {users.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 font-medium">
            No matching employees found.
          </div>
        ) : (
          users.map((user, index) => (
            <div key={user._id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 relative">
              <div className="flex justify-between items-start">
                <div className="space-y-1 max-w-[70%]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Employee #{index + 1}</span>
                  <h3 className="font-bold text-slate-900 text-base truncate">{user.name || "N/A"}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
                    <Mail size={12} className="shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>
                
                {/* Edit Button Float */}
                {/* <button
                  onClick={() => handleEditClick(user)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-xl transition-colors"
                >
                  <Edit size={16} />
                </button> */}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-0.5">Role</span>
                  <span className="inline-flex items-center bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded border border-blue-100 capitalize">
                    {user.role}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-0.5">Joined</span>
                  <span className="text-slate-600 font-medium flex items-center gap-1">
                    <Calendar size={12} className="text-slate-400" />
                    {formatDate(user.createdAt)}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Account Status</span>
                <button
                  onClick={() => handleStatusClick(user)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border shadow-sm transition-all active:scale-95 ${
                    user.isActive
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                      : "bg-rose-50 text-rose-700 border-rose-200/60"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-emerald-600" : "bg-rose-600"}`} />
                  {user.isActive ? "Active" : "Inactive"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE LAYOUT (Hidden on Mobile) */}
      <div className="hidden lg:block bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="p-4 text-center w-16">#</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Created On</th>
                {/* <th className="p-4 text-center w-32">Status</th> */}
                <th className="p-4 text-center w-24">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-slate-400 font-medium">
                    No matching employees found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 text-center font-medium text-slate-400">{index + 1}</td>
                    <td className="p-4 font-semibold text-slate-900">{user.name || "N/A"}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-slate-600 group-hover:text-slate-900 transition-colors">
                        <Mail size={14} className="text-slate-400" /> 
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center bg-blue-50 text-blue-700 font-medium text-xs px-2.5 py-1 rounded-md border border-blue-100 capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{formatDate(user.createdAt)}</td>
                    
                    {/* STATUS ACTION */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleStatusClick(user)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border shadow-sm transition-all active:scale-95 ${
                          user.isActive
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60 hover:bg-emerald-100/80"
                            : "bg-rose-50 text-rose-700 border-rose-200/60 hover:bg-rose-100/80"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-emerald-600" : "bg-rose-600"}`} />
                        {user.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>

                    {/* EDIT ACTION */}
                    {/* <td className="p-4 text-center">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-transparent hover:border-slate-200"
                      >
                        <Edit size={16} />
                      </button>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= STATUS MODAL ================= */}
      {confirmUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl border border-slate-100 text-center relative animate-scale-up">
            <button 
              onClick={() => setConfirmUser(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors"
            >
              <X size={18} />
            </button>

            <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${confirmUser.isActive ? "bg-rose-50" : "bg-emerald-50"}`}>
              {confirmUser.isActive ? (
                <UserX className="text-rose-600 w-6 h-6" />
              ) : (
                <UserCheck className="text-emerald-600 w-6 h-6" />
              )}
            </div>

            <h2 className="text-lg font-bold text-slate-900 mb-1">
              {confirmUser.isActive ? "Deactivate Account?" : "Activate Account?"}
            </h2>

            <p className="text-sm text-slate-500 mb-6">
              Are you sure you want to change the active status for <span className="font-semibold text-slate-800">{confirmUser.name || "this user"}</span>?
            </p>

            <div className="flex gap-3">
              <button
                disabled={submitting}
                onClick={() => setConfirmUser(null)}
                className="w-full border border-slate-200 text-slate-600 p-2.5 rounded-xl font-medium text-sm hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                disabled={submitting}
                onClick={handleConfirm}
                className={`w-full text-white p-2.5 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-1.5 ${
                  confirmUser.isActive ? "bg-rose-600 hover:bg-rose-700 shadow-rose-200" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                } shadow-lg disabled:opacity-70`}
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {confirmUser.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editUser && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-slate-100 relative animate-scale-up">
            <button 
              onClick={() => setEditUser(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-bold text-slate-900 mb-5">Modify User Profile</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl p-2.5 text-sm outline-none transition-all placeholder:text-slate-400"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl p-2.5 text-sm outline-none transition-all placeholder:text-slate-400"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Creation Date</label>
                <input
                  name="createdAt"
                  type="date"
                  value={formData.createdAt}
                  onChange={handleChange}
                  className="w-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl p-2.5 text-sm outline-none transition-all text-slate-700"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                disabled={submitting}
                onClick={() => setEditUser(null)}
                className="w-full border border-slate-200 text-slate-600 p-2.5 rounded-xl font-medium text-sm hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                disabled={submitting}
                onClick={handleUpdate}
                className="w-full bg-blue-600 text-white p-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-1.5 disabled:opacity-70"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Users;