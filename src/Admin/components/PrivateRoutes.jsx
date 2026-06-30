// import React, { useEffect, useState } from 'react';
// import { Navigate, Outlet } from 'react-router-dom'
// import api from '../../service/api.js';

// function PrivateRoutes() {
//     const [user, setUser] = useState(null)
//     const [isLoggedIn, setIsLoggedIn] = useState(null)

//     async function getMe() {
//         try {
//             const res = await api.get('/user/me');
//             if (res.status === 200) {
//                 setUser(res.data.user)
//                 setIsLoggedIn(true)
//             }
//         } catch (error) {
//             setIsLoggedIn(false)
//         }
//     }

//     useEffect(() => {

//         getMe()
//     }, [])

//     if (isLoggedIn == null) return <h1>Checking Auth</h1>


//     return isLoggedIn ? <Navigate to='/login' /> : <Outlet />
// }

// export default PrivateRoutes


// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoutes = () => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   // only allow admin routes
//   return role === "admin" ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoutes;



import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return role === "admin"
    ? <Outlet />
    : <Navigate to="/admin/dashboard" replace />;
};

export default PrivateRoutes;;