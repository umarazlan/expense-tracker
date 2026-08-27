import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaKey } from "react-icons/fa";
import { BsFillWalletFill } from "react-icons/bs";
import { FaTachometerAlt } from "react-icons/fa";
import { MdAddChart, MdClose } from "react-icons/md";
import { FaFilePen } from "react-icons/fa6";
import { VscChecklistCompact } from "react-icons/vsc";
import { FiMenu, FiLogOut } from "react-icons/fi";

import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="mobile-logo">
          <BsFillWalletFill />
          <span>ExpenseTracker</span>
        </div>

        <button
          type="button"
          className="menu-button"
          onClick={() => setIsOpen(true)}
        >
          <FiMenu />
        </button>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <BsFillWalletFill />
            <span>ExpenseTracker</span>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={() => setIsOpen(false)}
          >
            <MdClose />
          </button>
        </div>

        <hr />

        {/* Navigation */}
        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/add-expense"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <MdAddChart />
            <span>Add Expense</span>
          </NavLink>

          <NavLink
            to="/manage-expense"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FaFilePen />
            <span>Manage Expense</span>
          </NavLink>

          <NavLink
            to="/expense-report"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <VscChecklistCompact />
            <span>Expense Report</span>
          </NavLink>
          <NavLink
            to="/change-password"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <FaKey /> 
            <span>Change Password</span>
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="sidebar-footer">
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
