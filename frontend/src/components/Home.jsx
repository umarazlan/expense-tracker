import React from "react";
import { motion } from "framer-motion";
import {
  BsFillWalletFill,
  BsArrowRight,
  BsGraphUpArrow,
  BsShieldCheck,
  BsLightningChargeFill,
} from "react-icons/bs";
import { FaMoneyBillTrendUp, FaChartPie } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="home-section">
      {/* Background decoration */}
      <div className="home-orb orb-one"></div>
      <div className="home-orb orb-two"></div>

      <div className="container">
        <motion.div
          className="row align-items-center min-vh-100 py-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* LEFT SIDE */}
          <div className="col-lg-6">
            <motion.div className="home-badge" variants={itemVariants}>
              <BsLightningChargeFill />
              Smart Expense Management
            </motion.div>

            <motion.h1 className="home-title" variants={itemVariants}>
              Take control of
              <span> your money.</span>
            </motion.h1>

            <motion.p className="home-description" variants={itemVariants}>
              Track your expenses, understand your spending habits, and manage
              your money smarter with a simple and powerful expense tracker.
            </motion.p>

            {/* Buttons */}
            <motion.div className="home-buttons" variants={itemVariants}>
              <motion.button
                className="btn home-primary-btn"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(255, 193, 7, 0.25)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signup")}
              >
                Get Started
                <BsArrowRight />
              </motion.button>

              <motion.button
                className="btn home-secondary-btn"
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
              >
                Login
              </motion.button>
            </motion.div>

            {/* Features */}
            <motion.div className="home-features" variants={itemVariants}>
              <div className="feature-item">
                <BsShieldCheck />
                <span>Secure</span>
              </div>

              <div className="feature-item">
                <BsGraphUpArrow />
                <span>Track Spending</span>
              </div>

              <div className="feature-item">
                <FaChartPie />
                <span>View Reports</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6">
            <motion.div
              className="dashboard-preview"
              initial={{
                opacity: 0,
                scale: 0.8,
                x: 60,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: "easeOut",
              }}
            >
              {/* Main card */}
              <motion.div
                className="expense-card"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="card-header-custom">
                  <div>
                    <p>Total Balance</p>
                    <h2>$12,480.50</h2>
                  </div>

                  <div className="wallet-icon">
                    <BsFillWalletFill />
                  </div>
                </div>

                <div className="balance-chart">
                  <div className="chart-line"></div>

                  <div className="chart-point point-one"></div>
                  <div className="chart-point point-two"></div>
                  <div className="chart-point point-three"></div>
                  <div className="chart-point point-four"></div>
                </div>

                <div className="card-footer-custom">
                  <div>
                    <small>Monthly Income</small>
                    <strong>+$4,850</strong>
                  </div>

                  <div>
                    <small>Expenses</small>
                    <strong>-$2,140</strong>
                  </div>
                </div>
              </motion.div>

              {/* Floating expense card */}
              <motion.div
                className="floating-card expense-floating"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="floating-icon">
                  <FaMoneyBillTrendUp />
                </div>

                <div>
                  <small>Today's Spending</small>
                  <h4>$128.40</h4>
                </div>
              </motion.div>

              {/* Floating percentage card */}
              <motion.div
                className="floating-card saving-floating"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="saving-icon">
                  <BsGraphUpArrow />
                </div>

                <div>
                  <small>Monthly Saving</small>
                  <h4>+18.6%</h4>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
