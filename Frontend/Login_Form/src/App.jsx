import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Component/Login/Login";
import Admin from "./Component/Admin/Admin";
import Navbars from "./Component/Navbar/Navbars";
import { useAuth } from "../src/Component/Context/Logincontext";
import { Student_ProfileProvider } from "./Component/Context/Student_Profile";
import Student from "./Component/Student/Student";
import Stud_Profile from "./Component/Stud_Profile/Stud_Profile";
import SuperAdmin from "./Component/SuperAdmin/SuperAdmin";
// import { Student_Profile } from './Component/Context/Student_Profile';
export default function App() {
  const { isLoggedIn, login, logout, access1, acess } = useAuth();
  useEffect(() => {
    const authtoken = localStorage.getItem("auth-token");
    const role = localStorage.getItem("role");
    if (authtoken&&role) {
      login(authtoken);
      access1(JSON.parse(role));
    }
  },[]);

  return (
    <>
      <BrowserRouter>
        <Navbars></Navbars>
        {/* <br /> */}
        <Student_ProfileProvider>
          <Routes>
            <Route
              path="/"
              element={
                acess.role === "admin" ? (
                  <Admin></Admin>
                ) : acess.role === "work" ? (
                  <Student></Student>
                ) : acess.role === "superadmin" ? (
                  <SuperAdmin></SuperAdmin>
                ) : (
                  <Login></Login>
                )
              }
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/student" element={<Student></Student>} />
            <Route path="/superadmin" element={<SuperAdmin></SuperAdmin>} />

            <Route
              path="/std_profile"
              element={<Stud_Profile></Stud_Profile>}
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
          {/* <Routes><Route path="/" element={<Login />} /></Routes> */}
        </Student_ProfileProvider>
      </BrowserRouter>
    </>
  );
}
