import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";
import { BsLightningChargeFill, BsShieldCheck } from "react-icons/bs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://your-django-backend.onrender.com/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("Login response:", data);

      if (response.ok) {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("FullName", data.FullName);

        toast.success(data.message || "Login successful!");

        navigate("/dashboard");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Network error. Could not connect to server.");
    }
  };

  return (
    <section className="auth-section">
      {/* Background decoration */}
      <div className="auth-orb auth-orb-one"></div>
      <div className="auth-orb auth-orb-two"></div>

      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100 py-5">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <motion.div
              className="auth-card"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                className="auth-badge"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <BsLightningChargeFill />
                Smart Expense Management
              </motion.div>

              {/* Heading */}
              <div className="auth-heading">
                <div className="auth-main-icon">
                  <FaUser />
                </div>

                <h1>Welcome back.</h1>

                <p>
                  Login to continue managing your expenses and take control of
                  your money.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="auth-input-wrapper">
                  <label>Email Address</label>

                  <div className="auth-input-group">
                    <span>
                      <MdAlternateEmail />
                    </span>

                    <input
                      type="email"
                      name="Email"
                      placeholder="Enter your email"
                      value={formData.Email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="auth-input-wrapper">
                  <label>Password</label>

                  <div className="auth-input-group">
                    <span>
                      <RiLockPasswordLine />
                    </span>

                    <input
                      type="password"
                      name="Password"
                      placeholder="Enter your password"
                      value={formData.Password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Button */}
                <motion.button
                  type="submit"
                  className="auth-primary-btn"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 15px 35px rgba(255, 193, 7, 0.25)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  Login
                </motion.button>
              </form>

              {/* Bottom */}
              <div className="auth-footer">
                <BsShieldCheck />

                <span>Don't have an account?</span>

                <button type="button" onClick={() => navigate("/signup")}>
                  Create Account
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
