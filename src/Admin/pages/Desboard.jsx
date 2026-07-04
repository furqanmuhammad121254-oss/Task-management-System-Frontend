
import React, { useEffect, useState } from "react";
import api from "../../service/api.js";
import { Users, UserCheck, UserX } from "lucide-react";

const Desboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/user/all-users");

        // ONLY EMPLOYEES FILTER
        const employees = (res.data.users || []).filter(
          (u) => u.role === "employee"
        );

        setUsers(employees);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // COUNTS (ONLY EMPLOYEES)
  const totalEmployees = users.length;
  const activeEmployees = users.filter((u) => u.isActive === true).length;
  const inactiveEmployees = users.filter((u) => u.isActive === false).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 h-140">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* TOTAL EMPLOYEES */}
        <div className="bg-white p-5 rounded-xl shadow border">
          <div className="flex items-center gap-3">
            <Users className="text-blue-600" />
            <h2 className="text-lg font-semibold">Total Employees</h2>
          </div>
          <p className="text-3xl font-bold mt-2">{totalEmployees}</p>
        </div>

        {/* ACTIVE EMPLOYEES */}
        <div className="bg-white p-5 rounded-xl shadow border">
          <div className="flex items-center gap-3">
            <UserCheck className="text-green-600" />
            <h2 className="text-lg font-semibold">Active Employees</h2>
          </div>
          <p className="text-3xl font-bold mt-2 text-green-600">
            {activeEmployees}
          </p>
        </div>

        {/* INACTIVE EMPLOYEES */}
        <div className="bg-white p-5 rounded-xl shadow border">
          <div className="flex items-center gap-3">
            <UserX className="text-red-600" />
            <h2 className="text-lg font-semibold">Inactive Employees</h2>
          </div>
          <p className="text-3xl font-bold mt-2 text-red-600">
            {inactiveEmployees}
          </p>
        </div>

      </div>

    </div>
  );
};

export default Desboard;