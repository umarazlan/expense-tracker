// import './App.css'
// import { Toaster } from "react-hot-toast";
// import SignUp from './components/SignUp'
// import { BrowserRouter, Route ,Routes } from 'react-router-dom'
// import Login from './components/Login';
// import Navbar from './components/Navbar';
// function App() {
//   return (
//     <>
//      <Toaster position="top-right" />
//    <div className=''>
//      <BrowserRouter>
//      <Navbar/>
//         <Routes>
//           <Route path='/signup' element={<SignUp/>}></Route>
//           <Route path='/login' element={<Login/>}></Route>
//         </Routes>
//      </BrowserRouter>
//    </div>
   
//    </>
//   )
// }

// export default App
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

import DashboardLayout from "./components/DashboardLayout";

import Dashboard from "./components/Dashboard";
import AddExpense from "./components/AddExpense";
import ManageExpense from "./components/ManageExpense.jsx";
import ExpenseReport from "./components/ExpenseReport";
import Footer from "./components/Footer.jsx";
import ChangePassword from "./components/ChangePassword.jsx";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>

        {/* Public pages */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer/>
            </>
          }
        />

        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <SignUp />
              <Footer/>
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
              <Footer/>
            </>
          }
        />

        {/* Logged-in layout */}
        <Route
          element={<DashboardLayout />}
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          /> 

           <Route
            path="/add-expense"
            element={<AddExpense />}
          /> 

          <Route
            path="/manage-expense"
            element={<ManageExpense />}
          /> 

          <Route
            path="/expense-report"
            element={<ExpenseReport />}
          />
          <Route
            path="/change-password"
            element={<ChangePassword />}
          />
        </Route>

      </Routes>
    </>
  );
}

export default App;