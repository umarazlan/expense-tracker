import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsLightningChargeFill, BsShieldCheck } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./Auth.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
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

    // Password length validation
    if (formData.Password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    // Password matching validation
    if (formData.Password !== formData.ConfirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/signup/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FullName: formData.FullName,
            Email: formData.Email,
            Password: formData.Password,
          }),
        }
      );

      const data = await response.json();

      console.log("Backend response:", data);

      if (response.ok) {
        toast.success(data.message || "Registered successfully!");

        setFormData({
          FullName: "",
          Email: "",
          Password: "",
          ConfirmPassword: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Signup error:", error);

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
                  <FaUserPlus />
                </div>

                <h1>Create your account.</h1>

                <p>
                  Start tracking your expenses and make smarter financial
                  decisions.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="auth-input-wrapper">
                  <label>Full Name</label>

                  <div className="auth-input-group">
                    <span>
                      <FaUser />
                    </span>

                    <input
                      type="text"
                      name="FullName"
                      placeholder="Enter your full name"
                      value={formData.FullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

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
                      placeholder="Create a password"
                      value={formData.Password}
                      onChange={handleChange}
                      minLength={8}
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="auth-input-wrapper">
                  <label>Confirm Password</label>

                  <div
                    className={`auth-input-group ${
                      formData.ConfirmPassword &&
                      (formData.Password === formData.ConfirmPassword
                        ? "password-match"
                        : "password-mismatch")
                    }`}
                  >
                    <span>
                      <RiLockPasswordLine />
                    </span>

                    <input
                      type="password"
                      name="ConfirmPassword"
                      placeholder="Confirm your password"
                      value={formData.ConfirmPassword}
                      onChange={handleChange}
                      minLength={8}
                      required
                    />
                  </div>

                  {/* Password status */}
                  {formData.ConfirmPassword && (
                    <small
                      className={
                        formData.Password === formData.ConfirmPassword
                          ? "password-success"
                          : "password-error"
                      }
                    >
                      {formData.Password === formData.ConfirmPassword
                        ? "✓ Passwords match"
                        : "✕ Passwords do not match"}
                    </small>
                  )}
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
                  Create Account
                </motion.button>
              </form>

              {/* Bottom */}
              <div className="auth-footer">
                <BsShieldCheck />

                <span>Already have an account?</span>

                <button type="button" onClick={() => navigate("/login")}>
                  Login
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;