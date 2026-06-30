

import React, { useState, useEffect } from "react";
import api from "../service/api";
import { Calendar, FileText, User, Plus, X, Loader2, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default function EmployeeAttendancePage() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    type: "Leave",
    reason: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH REQUESTS =================
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/attendance/all-requests");
      console.log("Attendance Data:", res.data);
      setRequests(res.data.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ================= SUBMIT REQUEST =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/attendance/request", {
        ...formData,
      });

      alert("Request Submitted Successfully");

      setFormData({
        name: "",
        date: "",
        type: "Leave",
        reason: "",
      });

      setShowForm(false);
      fetchRequests(); // Refresh list
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Failed to Submit Request");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            Attendance Requests
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage and submit employee leave, half-day, or work from home logs.</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className={`inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 ${
            showForm 
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300/60" 
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/10"
          }`}
        >
          {showForm ? <X size={15} /> : <Plus size={15} />}
          <span>{showForm ? "Dismiss Form" : "Create Request"}</span>
        </button>
      </div>

      {/* Form Container */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-5 sm:p-6 space-y-4 animate-fade-in fixed z-100"
        >
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">New Request Particulars</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500">Employee Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50/50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500">Effective Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-slate-50/50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-slate-700"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Absence Allocation Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-slate-50/50 border border-slate-200 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-slate-700"
            >
              <option value="Leave">Leave</option>
              <option value="Half Day">Half Day</option>
              <option value="Work From Home">Work From Home</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Justification / Reason</label>
            <textarea
              placeholder="State structural reasoning for request configuration..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows="3"
              className="w-full bg-slate-50/50 border border-slate-200 p-3 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              required
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 shadow-green-900/10"
            >
              Submit Request Pipeline
            </button>
          </div>
        </form>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-3">
          <Loader2 size={24} className="animate-spin text-blue-500" />
          <p className="text-xs font-medium">Querying attendance state records...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && requests.length === 0 && (
        <div className="text-center py-16 bg-white border border-slate-200/60 rounded-2xl shadow-sm">
          <FileText size={32} className="mx-auto text-slate-300 mb-2" />
          <h3 className="text-sm font-semibold text-slate-700">No logs discovered</h3>
          <p className="text-xs text-slate-400 mt-1">Attendance exception dynamic storage is currently clear.</p>
        </div>
      )}

      {/* Requests Data Cards Grid */}
      {!loading && requests.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((req) => {
            const isApproved = req.status === "Approved";
            const isRejected = req.status === "Rejected";
            
            return (
              <div
                key={req._id}
                className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-5 flex flex-col justify-between hover:border-slate-300 transition-all group relative overflow-hidden"
              >
                <div>
                  {/* Card Header Top */}
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <User size={14} />
                      </div>
                      <h2 className="text-sm font-bold text-slate-800 truncate max-w-[140px]">
                        {req.name}
                      </h2>
                    </div>

                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${
                      isApproved ? "bg-emerald-50 text-emerald-700 border border-emerald-200/40" :
                      isRejected ? "bg-rose-50 text-rose-700 border border-rose-200/40" :
                      "bg-amber-50 text-amber-700 border border-amber-200/40"
                    }`}>
                      {isApproved && <CheckCircle2 size={10} />}
                      {isRejected && <AlertCircle size={10} />}
                      {!isApproved && !isRejected && <Clock size={10} />}
                      {req.status || "Pending"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 bg-slate-50/60 p-3 rounded-xl border border-slate-100 mb-4 min-h-[4.5rem]">
                    {req.reason}
                  </p>
                </div>

                {/* Card Meta Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} className="text-slate-400" />
                    {new Date(req.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {req.type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}