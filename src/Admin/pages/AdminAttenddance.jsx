
// import React, { useState, useEffect } from 'react';
// import api from '../../service/api.js';

// export default function AdminAttendancePage() {
//   const [requests, setRequests] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [loadingPending, setLoadingPending] = useState(false);
//   const [loadingHistory, setLoadingHistory] = useState(false);
//   const [error, setError] = useState('');

//   // 🔹 Fetch Pending Requests
//   const fetchPending = async () => {
//     try {
//       setLoadingPending(true);

//       const response = await api.get('/api/attendance/pending');

//       setRequests(response?.data?.data || []); // ✅ safe fix
//       setError('');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch pending requests.');
//     } finally {
//       setLoadingPending(false);
//     }
//   };

//   // 🔹 Fetch All Requests (History)
//   const fetchHistory = async () => {
//     try {
//       setLoadingHistory(true);

//       const res = await api.get("/api/attendance/all-requests");

//       setHistory(res?.data?.data || []); // ✅ safe fix
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingHistory(false);
//     }
//   };

//   useEffect(() => {
//     fetchPending();
//     fetchHistory();
//   }, []);

//   // 🔹 Approve / Reject
//   const handleAction = async (id, status) => {
//     try {
//       await api.put(`/api/attendance/action/${id}`, { status });

//       alert(`Request ${status}`);

//       // remove from pending list
//       setRequests(prev => prev.filter(req => req._id !== id));

//       // refresh history
//       fetchHistory();

//     } catch (err) {
//       console.error(err);
//       alert('Failed to update request.');
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">

//       {/* 🔹 ERROR */}
//       {error && (
//         <div className="text-red-600 mb-3 bg-red-50 p-2 rounded">
//           {error}
//         </div>
//       )}

//       {/* ================= PENDING ================= */}
//       <h1 className="text-2xl font-bold mb-4">
//         Pending Attendance Requests
//       </h1>

//       {loadingPending ? (
//         <p>Loading pending requests...</p>
//       ) : requests.length === 0 ? (
//         <p>No pending requests</p>
//       ) : (
//         requests.map(req => (
//           <div key={req._id} className="p-4 border mb-3 rounded">

//             <h3 className="font-bold">{req.name}</h3>
//             <p className="text-gray-600">{req.reason}</p>

//             <div className="mt-2">
//               <button
//                 onClick={() => handleAction(req._id, "Approved")}
//                 className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
//               >
//                 Approve
//               </button>

//               <button
//                 onClick={() => handleAction(req._id, "Rejected")}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Reject
//               </button>
//             </div>

//           </div>
//         ))
//       )}

//       {/* ================= HISTORY ================= */}
//       <h2 className="text-xl font-bold mt-8 mb-3">
//         All Requests (History)
//       </h2>

//       {loadingHistory ? (
//         <p>Loading history...</p>
//       ) : history.length === 0 ? (
//         <p>No history found</p>
//       ) : (
//         history.map(req => (
//           <div key={req._id} className="p-3 border mb-2 rounded">
//             <p>
//               <span className="font-semibold">{req.name}</span>
//               {" — "}
//               <span className="text-gray-700">{req.status}</span>
//             </p>
//           </div>
//         ))
//       )}

//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import api from '../../service/api.js';

// export default function AdminAttendancePage() {
//   const [requests, setRequests] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [loadingPending, setLoadingPending] = useState(false);
//   const [loadingHistory, setLoadingHistory] = useState(false);
//   const [error, setError] = useState('');

//   // 🔹 State to control Sidebar visibility
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // 🔹 Fetch Pending Requests
//   const fetchPending = async () => {
//     try {
//       setLoadingPending(true);
//       const response = await api.get('/api/attendance/pending');
//       setRequests(response?.data?.data || []);
//       setError('');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch pending requests.');
//     } finally {
//       setLoadingPending(false);
//     }
//   };

//   // 🔹 Fetch All Requests (History)
//   const fetchHistory = async () => {
//     try {
//       setLoadingHistory(true);
//       const res = await api.get("/api/attendance/all-requests");
//       setHistory(res?.data?.data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingHistory(false);
//     }
//   };

//   useEffect(() => {
//     fetchPending();
//     fetchHistory();
//   }, []);

//   // 🔹 Approve / Reject
//   const handleAction = async (id, status) => {
//     try {
//       await api.put(`/api/attendance/action/${id}`, { status });
//       alert(`Request ${status}`);

//       // remove from pending list
//       setRequests(prev => prev.filter(req => req._id !== id));

//       // refresh history if sidebar is or will be opened
//       fetchHistory();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update request.');
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto relative min-h-screen">

//       {/* 🔹 ERROR BANNER */}
//       {error && (
//         <div className="text-red-600 mb-4 bg-red-50 p-3 rounded-lg border border-red-200 shadow-sm">
//           {error}
//         </div>
//       )}

//       {/* 🔹 HEADER SECTION */}
//       <div className="flex justify-between items-center border-b pb-4 mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Attendance Dashboard</h1>
//           <p className="text-sm text-gray-500">Manage and review employee requests</p>
//         </div>

//         {/* HISTORY TRIGGER BUTTON */}
//         <button
//           onClick={() => setIsSidebarOpen(true)}
//           className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition shadow-sm border border-gray-300"
//         >
//           ⏱️ View History ({history.length})
//         </button>
//       </div>

//       {/* ================= MAIN PENDING LIST ================= */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
//           <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
//           Pending Requests ({requests.length})
//         </h2>

//         {loadingPending ? (
//           <div className="text-center py-12 text-gray-500">Loading pending requests...</div>
//         ) : requests.length === 0 ? (
//           <div className="text-center py-12 border-2 border-dashed rounded-xl text-gray-400 bg-gray-50">
//             No pending requests found. All caught up!
//           </div>
//         ) : (
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
//             {requests.map(req => (
//               <div key={req._id} className="p-5 border border-gray-200 bg-white rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition">
//                 <div>
//                   <h3 className="font-bold text-lg text-gray-800">{req.name}</h3>
//                   <p className="text-gray-600 mt-1 bg-gray-50 p-2 rounded border text-sm">{req.reason}</p>
//                 </div>

//                 <div className="flex gap-2 shrink-0">
//                   <button
//                     onClick={() => handleAction(req._id, "Approved")}
//                     className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition shadow-sm"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleAction(req._id, "Rejected")}
//                     className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white px-4 py-2 rounded-lg font-medium text-sm transition border border-red-200"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ================= SLIDE-OUT SIDEBAR (HISTORY) ================= */}
//       {/* 1. BACKDROP OVERLAY */}
//       <div 
//         className={`fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 z-40 ${
//           isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={() => setIsSidebarOpen(false)}
//       />

//       {/* 2. SIDEBAR PANEL */}
//       <div 
//         className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
//           isSidebarOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Sidebar Header */}
//         <div className="p-4 border-b flex justify-between items-center bg-gray-50">
//           <div>
//             <h2 className="text-lg font-bold text-gray-800">Request History</h2>
//             <p className="text-xs text-gray-500">Log of all approved and rejected requests</p>
//           </div>
//           <button 
//             onClick={() => setIsSidebarOpen(false)}
//             className="p-2 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-full transition"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Sidebar Content (Scrollable Container) */}
//         <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-gray-50/50">
//           {loadingHistory ? (
//             <div className="text-center py-8 text-gray-500">Loading history...</div>
//           ) : history.length === 0 ? (
//             <div className="text-center py-12 text-gray-400">No history found.</div>
//           ) : (
//             history.map(req => {
//               const isApproved = req.status === "Approved";
//               return (
//                 <div key={req._id} className="p-3 bg-white border border-gray-100 rounded-lg shadow-2xs flex justify-between items-center">
//                   <div>
//                     <p className="font-semibold text-gray-800">{req.name}</p>
//                     <p className="text-xs text-gray-400 truncate max-w-[220px]">{req.reason || 'No reason specified'}</p>
//                   </div>
//                   <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
//                     isApproved ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                   }`}>
//                     {req.status}
//                   </span>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import api from '../../service/api.js';

// export default function AdminAttendancePage() {
//   const [requests, setRequests] = useState([]);
//   const [history, setHistory] = useState([]);

//   const [loadingPending, setLoadingPending] = useState(false);
//   const [loadingHistory, setLoadingHistory] = useState(false);

//   const [error, setError] = useState('');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // ================= FETCH PENDING =================
//   const fetchPending = async () => {
//     try {
//       setLoadingPending(true);

//       const res = await api.get('/api/attendance/pending');

//       setRequests(res?.data?.data || res?.data || []);

//       setError('');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load pending requests');
//     } finally {
//       setLoadingPending(false);
//     }
//   };

//   // ================= FETCH HISTORY =================
//   const fetchHistory = async () => {
//     try {
//       setLoadingHistory(true);

//       const res = await api.get('/api/attendance/all-requests');

//       setHistory(res?.data?.data || res?.data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoadingHistory(false);
//     }
//   };

//   useEffect(() => {
//     fetchPending();
//     fetchHistory();
//   }, []);

//   // ================= APPROVE / REJECT =================
//   const handleAction = async (id, status) => {
//     try {
//       await api.put(`/api/attendance/action/${id}`, { status });

//       setRequests(prev => prev.filter(item => item._id !== id));

//       // refresh history
//       fetchHistory();

//       alert(`Request ${status}`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update request");
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto relative">

//       {/* ERROR */}
//       {error && (
//         <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Attendance Dashboard</h1>

//         <button
//           onClick={() => {
//             setIsSidebarOpen(true);
//             fetchHistory(); // refresh when open
//           }}
//           className="bg-gray-200 px-4 py-2 rounded"
//         >
//           View History ({history.length})
//         </button>
//       </div>

//       {/* ================= PENDING REQUESTS ================= */}
//       <h2 className="font-bold text-lg mb-3">
//         Pending Requests ({requests.length})
//       </h2>

//       {loadingPending ? (
//         <p>Loading...</p>
//       ) : requests.length === 0 ? (
//         <p>No pending requests</p>
//       ) : (
//         requests.map(req => (
//           <div key={req._id} className="border p-3 mb-3 rounded">
//             <h3 className="font-bold">{req.name}</h3>
//             <p>{req.reason}</p>

//             <button
//               onClick={() => handleAction(req._id, "Approved")}
//               className="bg-green-500 text-white px-3 py-1 mr-2"
//             >
//               Approve
//             </button>

//             <button
//               onClick={() => handleAction(req._id, "Rejected")}
//               className="bg-red-500 text-white px-3 py-1"
//             >
//               Reject
//             </button>
//           </div>
//         ))
//       )}

//       {/* ================= SIDEBAR HISTORY ================= */}
//       {isSidebarOpen && (
//         <div className="fixed inset-0 bg-black/40 flex justify-end">

//           <div className="w-96 bg-white h-full p-4 overflow-y-auto">

//             <button
//               onClick={() => setIsSidebarOpen(false)}
//               className="mb-3"
//             >
//               ❌ Close
//             </button>

//             <h2 className="font-bold mb-3">History</h2>

//             {loadingHistory ? (
//               <p>Loading history...</p>
//             ) : history.length === 0 ? (
//               <p>No history</p>
//             ) : (
//               history.map(req => (
//                 <div key={req._id} className="border p-2 mb-2">
//                   <p className="font-semibold">{req.name}</p>
//                   <p className="text-sm">{req.status}</p>
//                 </div>
//               ))
//             )}

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import api from '../../service/api.js';

export default function AdminAttendancePage() {
  const [requests, setRequests] = useState([]);
  const [history, setHistory] = useState([]);

  const [loadingPending, setLoadingPending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState(null); // Replaces native alert()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auto-clear toast feedback
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // ================= FETCH PENDING =================
  const fetchPending = async () => {
    try {
      setLoadingPending(true);
      const res = await api.get('/api/attendance/pending');
      setRequests(res?.data?.data || res?.data || []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load pending requests. Please try again.');
    } finally {
      setLoadingPending(false);
    }
  };


  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/attendance/request/${id}`); // ✅ correct

      setHistory(prev => prev.filter(item => item._id !== id));
      setRequests(prev => prev.filter(item => item._id !== id));

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ================= FETCH HISTORY =================
  const fetchHistory = async () => {
    try {
      setLoadingHistory(true);
      const res = await api.get('/api/attendance/all-requests');
      setHistory(res?.data?.data || res?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchPending();
    fetchHistory();
  }, []);

  // ================= APPROVE / REJECT =================
  const handleAction = async (id, status) => {
    try {
      await api.put(`/api/attendance/action/${id}`, { status });
      setRequests(prev => prev.filter(item => item._id !== id));
      fetchHistory(); // refresh history

      setToastMessage({ type: 'success', text: `Request successfully ${status.toLowerCase()}!` });
    } catch (err) {
      console.error(err);
      setToastMessage({ type: 'error', text: "Failed to update request status." });
    }
  };

  // Helper helper to color-code statuses in history
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8 relative font-sans">
      <div className="max-w-5xl mx-auto">

        {/* NOTIFICATION TOASTS */}
        {toastMessage && (
          <div className={`fixed top-4 right-4 z-50 max-w-sm w-full p-4 rounded-xl shadow-lg border animate-in fade-in slide-in-from-top-4 ${toastMessage.type === 'success' ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-rose-50 text-rose-900 border-rose-200'
            }`}>
            <p className="text-sm font-medium">{toastMessage.text}</p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl mb-6 flex items-center gap-3">
            <span className="text-lg">⚠️</span>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-5 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Review, approve, or track historical attendance modifications.</p>
          </div>

          <button
            onClick={() => {
              setIsSidebarOpen(true);
              fetchHistory();
            }}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm transition-colors text-sm"
          >
            📊 View History
            <span className="ml-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-xs font-semibold">
              {history.length}
            </span>
          </button>
        </div>

        {/* ================= PENDING REQUESTS ================= */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800 text-lg flex items-center gap-2">
            Pending Requests
            <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
              {requests.length}
            </span>
          </h2>
        </div>

        {loadingPending ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white border border-slate-200 rounded-xl p-5 animate-pulse space-y-3">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                <div className="h-8 bg-slate-200 rounded w-24 inline-block mr-2"></div>
                <div className="h-8 bg-slate-200 rounded w-24 inline-block"></div>
              </div>
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-sm">🎉 All caught up! No pending requests.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {requests.map(req => (
              <div key={req._id} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm transition-all hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold text-slate-800">{req.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{req.reason || "No reason provided."}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleAction(req._id, "Approved")}
                    className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(req._id, "Rejected")}
                    className="flex-1 sm:flex-initial bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 font-medium text-sm px-4 py-2 rounded-lg transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= SIDEBAR HISTORY ================= */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">

            {/* Click outside target back drop overlay handles closure */}
            <div className="absolute inset-0 -z-10" onClick={() => setIsSidebarOpen(false)} />

            <div className="w-full max-w-md bg-white h-full p-6 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">

              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-900 text-lg">Action History</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                >
                  ✕ Close
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                {loadingHistory ? (
                  <div className="text-center py-8 text-sm text-slate-400 animate-pulse">Loading history logs...</div>
                ) : history.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-sm">No historical logs found.</div>
                ) : (
                  history.map(req => (
                    <div key={req._id} className="border border-slate-100 bg-slate-50/50 p-4 rounded-xl flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-slate-800 truncate">{req.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">ID: {req._id.slice(-6)}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${getStatusBadgeClass(req.status)}`}>
                        {req.status}
                      </span>

                      <button
                        onClick={() => handleDelete(req._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>
                  ))
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}