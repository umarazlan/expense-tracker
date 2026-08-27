import React from "react";
import './Footer.css'
import { BsFillWalletFill } from "react-icons/bs";
const Footer = () => {
  return (
    <>
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-grid">
              <div class="footer-brand">
                <a href="#" class="footer-logo">
                  <div class="">
                    <BsFillWalletFill size={25} className="text-warning" />
                  </div>
                  <span class="footer-logo-name">ExpenseTracker</span>
                </a>
                <p class="footer-tagline">
                  Smart expense tracking that keeps your finances clear,
                  organized, and stress-free — wherever you are.
                </p>

                {/* <div class="footer-subscribe">
                  <input
                    type="email"
                    placeholder="Your email address"
                    aria-label="Subscribe to newsletter"
                  />
                  <button type="button">Subscribe</button>
                </div> */}
              </div>

              <div class="footer-nav-col">
                <p class="footer-nav-heading">Product</p>
                <ul class="footer-nav-list">
                  <li>
                    <a href="#">Features</a>
                  </li>
                  <li>
                    <a href="#">Pricing</a>
                  </li>
                  <li>
                    <a href="#">
                      Budgeting <span class="footer-link-badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">Integrations</a>
                  </li>
                  <li>
                    <a href="#">Changelog</a>
                  </li>
                </ul>
              </div>

              <div class="footer-nav-col">
                <p class="footer-nav-heading">Company</p>
                <ul class="footer-nav-list">
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                  <li>
                    <a href="#">Press kit</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>

              <div class="footer-nav-col">
                <p class="footer-nav-heading">Support</p>
                <ul class="footer-nav-list">
                  <li>
                    <a href="#">Help center</a>
                  </li>
                  <li>
                    <a href="#">Community</a>
                  </li>
                  <li>
                    <a href="#">Status</a>
                  </li>
                  <li>
                    <a href="#">API docs</a>
                  </li>
                  <li>
                    <a href="#">Security</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <ul class="footer-legal">
              <li>
                <a href="#">Privacy policy</a>
              </li>
              <li>
                <a href="#">Terms of service</a>
              </li>
              <li>
                <a href="#">Cookie settings</a>
              </li>
            </ul>

            <div class="footer-socials">
              <a href="#" class="footer-social-btn" aria-label="Twitter / X">
                <i class="bi bi-twitter-x"></i>
              </a>
              <a href="#" class="footer-social-btn" aria-label="GitHub">
                <i class="bi bi-github"></i>
              </a>
              <a href="#" class="footer-social-btn" aria-label="LinkedIn">
                <i class="bi bi-linkedin"></i>
              </a>
              <a href="#" class="footer-social-btn" aria-label="Instagram">
                <i class="bi bi-instagram"></i>
              </a>
            </div>

            <p class="footer-copy">
              © 2025 <a href="#">ExpenseTracker</a>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
