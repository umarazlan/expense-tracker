import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaWallet,
  FaMoneyBillWave,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
  FaPlus,
  FaFileInvoiceDollar,
  FaCog,
} from "react-icons/fa";

import {
  BsGraphUpArrow,
  BsLightningChargeFill,
  BsArrowRight,
} from "react-icons/bs";

import { TiShoppingCart } from "react-icons/ti";
import { FaRupeeSign } from "react-icons/fa6";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const userName = localStorage.getItem("FullName");
  const userId = localStorage.getItem("userId");

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Protect dashboard
  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    fetchExpenses();
  }, [userId, navigate]);

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/manage_expense/${userId}`,
      );

      const data = await response.json();

      setExpenses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Dashboard expense error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // CALCULATIONS
  // ================================

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.ExpenseCost || 0),
    0,
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = expenses
    .filter((expense) => {
      if (!expense.ExpenseDate) return false;

      const date = new Date(expense.ExpenseDate);

      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    })
    .reduce((total, expense) => total + Number(expense.ExpenseCost || 0), 0);

  const today = new Date().toISOString().split("T")[0];

  const todayExpenses = expenses
    .filter((expense) => expense.ExpenseDate === today)
    .reduce((total, expense) => total + Number(expense.ExpenseCost || 0), 0);

  // Average expense
  const averageExpense =
    expenses.length > 0 ? totalExpenses / expenses.length : 0;

  // Recent expenses
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.ExpenseDate) - new Date(a.ExpenseDate))
    .slice(0, 5);

  return (
    <section className="dashboard-section">
      {/* Background Decoration */}
      <div className="dashboard-orb dashboard-orb-one"></div>
      <div className="dashboard-orb dashboard-orb-two"></div>

      <div className="container py-4 py-md-5">
        {/* =================================
            HEADER
        ================================= */}

        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="dashboard-badge">
              <BsLightningChargeFill />
              Expense Dashboard
            </div>

            <h1>
              Welcome back, <span>{userName || "User"}</span>
            </h1>

            <p>Here's your expense overview and spending activity.</p>
          </div>

          <div className="dashboard-header-actions">
            <button
              className="dashboard-outline-btn"
              onClick={() => navigate("/expense-report")}
            >
              <FaFileInvoiceDollar />
              Reports
            </button>

            <button
              className="dashboard-add-btn"
              onClick={() => navigate("/add-expense")}
            >
              <FaPlus />
              Add Expense
            </button>
          </div>
        </motion.div>

        {/* =================================
            STAT CARDS
        ================================= */}

        <motion.div
          className="row g-4 mb-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {/* Total Expenses */}
          <motion.div
            className="col-12 col-sm-6 col-xl-3"
            variants={{
              hidden: {
                opacity: 0,
                y: 25,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
          >
            <div className="dashboard-stat-card">
              <div className="stat-top">
                <div>
                  <p>Total Expenses</p>

                  <h2>Rs: {totalExpenses.toFixed(2)}</h2>
                </div>

                <div className="stat-icon yellow">
                  <FaWallet />
                </div>
              </div>

              <div className="stat-bottom">
                <BsGraphUpArrow />
                <span>All time spending</span>
              </div>
            </div>
          </motion.div>

          {/* Monthly */}
          <motion.div
            className="col-12 col-sm-6 col-xl-3"
            variants={{
              hidden: {
                opacity: 0,
                y: 25,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
          >
            <div className="dashboard-stat-card">
              <div className="stat-top">
                <div>
                  <p>This Month</p>

                  <h2>Rs: {monthlyExpenses.toFixed(2)}</h2>
                </div>

                <div className="stat-icon blue">
                  <FaChartLine />
                </div>
              </div>

              <div className="stat-bottom blue-text">
                <FaCalendarAlt />
                <span>Current month</span>
              </div>
            </div>
          </motion.div>

          {/* Today */}
          <motion.div
            className="col-12 col-sm-6 col-xl-3"
            variants={{
              hidden: {
                opacity: 0,
                y: 25,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
          >
            <div className="dashboard-stat-card">
              <div className="stat-top">
                <div>
                  <p>Today's Spending</p>

                  <h2>Rs: {todayExpenses.toFixed(2)}</h2>
                </div>

                <div className="stat-icon green">
                  <FaMoneyBillWave />
                </div>
              </div>

              <div className="stat-bottom green-text">
                <FaArrowDown />
                <span>Today's expenses</span>
              </div>
            </div>
          </motion.div>

          {/* Average */}
          <motion.div
            className="col-12 col-sm-6 col-xl-3"
            variants={{
              hidden: {
                opacity: 0,
                y: 25,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
          >
            <div className="dashboard-stat-card">
              <div className="stat-top">
                <div>
                  <p>Average Expense</p>

                  <h2>Rs: {averageExpense.toFixed(2)}</h2>
                </div>

                <div className="stat-icon orange">
                  <FaArrowUp />
                </div>
              </div>

              <div className="stat-bottom orange-text">
                <FaChartLine />
                <span>Per transaction</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* =================================
            MAIN CONTENT
        ================================= */}

        <div className="row g-4">
          {/* =================================
              MAIN OVERVIEW CARD
          ================================= */}

          <div className="col-12 col-lg-8">
            <motion.div
              className="dashboard-overview-card"
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
            >
              <div className="overview-header">
                <div>
                  <div className="overview-badge">
                    <BsGraphUpArrow />
                    Spending Overview
                  </div>

                  <h3>Your financial activity</h3>

                  <p>Keep track of where your money is going.</p>
                </div>

                <div className="overview-wallet">
                  <FaWallet />
                </div>
              </div>

              {/* Large Total */}

              <div className="overview-total">
                <small>Total Spending</small>

                <h2>Rs: {totalExpenses.toFixed(2)}</h2>

                <div className="overview-status">
                  <span>
                    <FaArrowDown />
                  </span>
                  {expenses.length} transactions recorded
                </div>
              </div>

              {/* Fake Visual Chart */}

              <div className="dashboard-chart">
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>
                <div className="chart-grid-line"></div>

                <div className="dashboard-chart-line"></div>

                <div className="dashboard-chart-point point-1"></div>
                <div className="dashboard-chart-point point-2"></div>
                <div className="dashboard-chart-point point-3"></div>
                <div className="dashboard-chart-point point-4"></div>
                <div className="dashboard-chart-point point-5"></div>
              </div>

              <div className="chart-labels">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
              </div>
            </motion.div>
          </div>

          {/* =================================
              QUICK ACTIONS
          ================================= */}

          <div className="col-12 col-lg-4">
            <motion.div
              className="quick-actions-card"
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.4,
              }}
            >
              <div className="quick-header">
                <div>
                  <h3>Quick Actions</h3>

                  <p>Manage your expenses</p>
                </div>

                <BsLightningChargeFill />
              </div>

              <button
                className="quick-action"
                onClick={() => navigate("/add-expense")}
              >
                <div className="quick-action-icon yellow-bg">
                  <FaPlus />
                </div>

                <div>
                  <strong>Add Expense</strong>
                  <small>Record new spending</small>
                </div>

                <BsArrowRight />
              </button>

              <button
                className="quick-action"
                onClick={() => navigate("/expense-report")}
              >
                <div className="quick-action-icon blue-bg">
                  <FaFileInvoiceDollar />
                </div>

                <div>
                  <strong>Expense Report</strong>
                  <small>View spending reports</small>
                </div>

                <BsArrowRight />
              </button>

              <button
                className="quick-action"
                onClick={() => navigate("/manage-expense")}
              >
                <div className="quick-action-icon green-bg">
                  <FaCog />
                </div>

                <div>
                  <strong>Manage Expenses</strong>
                  <small>Edit or delete expenses</small>
                </div>

                <BsArrowRight />
              </button>
            </motion.div>
          </div>
        </div>

        {/* =================================
            RECENT EXPENSES
        ================================= */}

        <motion.div
          className="recent-expenses-card mt-4"
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.5,
          }}
        >
          <div className="recent-header">
            <div>
              <div className="overview-badge">
                <TiShoppingCart />
                Recent Activity
              </div>

              <h3>Recent Expenses</h3>

              <p>Your latest spending activity</p>
            </div>

            <button
              onClick={() => navigate("/manage-expense")}
              className="view-all-btn"
            >
              View All
              <BsArrowRight />
            </button>
          </div>

          {loading ? (
            <div className="dashboard-empty">
              <p>Loading expenses...</p>
            </div>
          ) : recentExpenses.length > 0 ? (
            <div className="recent-list">
              {recentExpenses.map((expense, index) => (
                <motion.div
                  className="recent-item"
                  key={expense.id}
                  initial={{
                    opacity: 0,
                    x: -15,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.6 + index * 0.08,
                  }}
                >
                  <div className="recent-item-left">
                    <div className="recent-expense-icon">
                      <TiShoppingCart />
                    </div>

                    <div>
                      <h5>{expense.ExpenseItem}</h5>

                      <small>
                        <FaCalendarAlt />
                        {expense.ExpenseDate}
                      </small>
                    </div>
                  </div>

                  <div className="recent-cost">
                    <span>
                      <FaRupeeSign />
                      {Number(expense.ExpenseCost || 0).toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="dashboard-empty">
              <div className="empty-icon">
                <TiShoppingCart />
              </div>

              <h4>No Expenses Yet</h4>

              <p>Start tracking your spending by adding your first expense.</p>

              <button
                className="dashboard-add-btn"
                onClick={() => navigate("/add-expense")}
              >
                <FaPlus />
                Add Your First Expense
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;
