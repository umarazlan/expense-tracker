import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { BsFillWalletFill } from "react-icons/bs";
import { FaUserPlus, FaUserTie } from "react-icons/fa";
import { FaTachometerAlt, FaHome } from "react-icons/fa";
import { MdLogin, MdAddChart } from "react-icons/md";
import { FaFilePen } from "react-icons/fa6";
import { VscChecklistCompact } from "react-icons/vsc";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const user = localStorage.getItem("user");
  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/login");
  };

  // Close the mobile menu whenever a link is tapped
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container">
        {/* Logo */}
        <Link
          className="navbar-brand fw-bold text-white"
          to="/"
          onClick={closeMenu}
        >
          <BsFillWalletFill className="mb-1 me-2" />
          ExpenseTracker
        </Link>

        {/* Toggle */}
        <button
          className={`navbar-toggler${isOpen ? "" : " collapsed"}`}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="app-toggler-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        {/* Navbar */}
        <div
          className={`collapse navbar-collapse justify-content-end${isOpen ? " show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-lg-center">
            {/* Home */}
            <li className="nav-item">
              <Link
                className={`nav-link app-nav-link${isActive("/") ? " active" : ""}`}
                to="/"
                onClick={closeMenu}
              >
                <FaHome className="mb-1 me-2" />
                Home
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                {/* Dashboard */}
                <li className="nav-item">
                  <Link
                    className={`nav-link app-nav-link${isActive("/dashboard") ? " active" : ""}`}
                    to="/dashboard"
                    onClick={closeMenu}
                  >
                    <FaTachometerAlt className="mb-1 me-2" />
                    Dashboard
                  </Link>
                </li>

                {/* Add Expense */}
                <li className="nav-item">
                  <Link
                    className={`nav-link app-nav-link${isActive("/add-expense") ? " active" : ""}`}
                    to="/add-expense"
                    onClick={closeMenu}
                  >
                    <MdAddChart className="mb-1 me-2" />
                    Add Expense
                  </Link>
                </li>

                {/* Manage Expense */}
                <li className="nav-item">
                  <Link
                    className={`nav-link app-nav-link${isActive("/manage-expense") ? " active" : ""}`}
                    to="/manage-expense"
                    onClick={closeMenu}
                  >
                    <FaFilePen className="mb-1 me-2" />
                    Manage Expense
                  </Link>
                </li>

                {/* Expense Report */}
                <li className="nav-item">
                  <Link
                    className={`nav-link app-nav-link${isActive("/expense-report") ? " active" : ""}`}
                    to="/expense-report"
                    onClick={closeMenu}
                  >
                    <VscChecklistCompact className="mb-1 me-2" />
                    Expense Report
                  </Link>
                </li>

                {/* Logout */}
                <li className="nav-item app-logout-item">
                  <button
                    className="btn btn-danger btn-sm app-logout-btn"
                    onClick={handleLogout}
                  >
                    <MdLogin className="mb-1 me-2" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Signup */}
                <li className="nav-item">
                  <Link
                    className={`nav-link app-nav-link${isActive("/signup") ? " active" : ""}`}
                    to="/signup"
                    onClick={closeMenu}
                  >
                    <FaUserPlus className="mb-1 me-2" />
                    SignUp
                  </Link>
                </li>

                {/* Login */}
                <li className="nav-item">
                  <Link
                    className={`nav-link app-nav-link${isActive("/login") ? " active" : ""}`}
                    to="/login"
                    onClick={closeMenu}
                  >
                    <FaUserTie className="mb-1 me-2" />
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
