import React, { useState, useEffect } from 'react';
import api from "../service/api.js"; 
import { Mail, Phone, User } from 'lucide-react';


const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const res = await api.get("/api/members");
      setMembers(res.data);
    } catch (err) {
      console.error("Error fetching members:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header section with stats count */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and view all registered members</p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
          {members.length} Total
        </span>
      </div>

      {/* Empty State */}
      {members.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed">
          <p className="text-gray-500">No members found.</p>
        </div>
      ) : (
        /* Responsive Grid layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div 
              key={member._id} 
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header info / Avatar */}
                <div className="flex items-center space-x-4 mb-4">
                  {member.avatar ? (
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-20 h-20 rounded-full object-cover border border-gray-100"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{member.name}</h2>
                    <span className="inline-block mt-0.5 px-2 py-0.5 text-xs font-medium text-green-700 bg-green-50 rounded">
                      Active Member
                    </span>
                  </div>
                </div>

                <hr className="border-gray-100 my-3" />

                {/* Contact details with icons */}
                <div className="space-y-2.5 text-sm text-gray-600">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{member.email || 'No email provided'}</span>
                  </div>
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{member.phone || 'No phone provided'}</span>
                  </div>
                </div>
              </div>

              
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Members;