
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
          Admin Profile
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