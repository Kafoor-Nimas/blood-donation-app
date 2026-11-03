import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { isDarkMode, setUser } = useApp();
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // API State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      // Live API Call to Backend
      const response = await API.post("/auth/login", { email, password });
      const { token, user } = response.data;

      // Save JWT Token & Update Global Context User
      localStorage.setItem("lifelink_token", token);
      if (setUser) {
        setUser(user);
      }

      setIsSubmitting(false);
      setIsAuthorized(true);

      // Brief visual confirmation before routing based on role
      setTimeout(() => {
        if (user?.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/blood-requests");
        }
      }, 600);
    } catch (error) {
      setIsSubmitting(false);
      setIsAuthorized(false);
      setErrorMessage(
        error.response?.data?.message ||
          "Invalid email or password. Please try again.",
      );
    }
  };

  return (
    <div
      className={`w-full transition-colors font-body-md antialiased min-h-screen flex flex-col justify-between ${
        isDarkMode
          ? "bg-[#0F172A] text-[#F8FAFC]"
          : "bg-[#f8f9ff] text-[#0b1c30]"
      }`}
    >
      <Navbar />

      <main className="w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-6 pt-24 pb-12">
        <div className="flex flex-col w-full items-center justify-center py-6 px-4 pt-20">
          <div
            className={`max-w-4xl w-full mx-auto rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[580px] relative border transition-colors ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155]"
                : "bg-white border-slate-100"
            }`}
          >
            {/* Left Section: 45% Clinical Visual & Impact Story */}
            <div className="md:w-5/12 bg-gradient-to-br from-[#dc2626] to-[#b70011] text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
              {/* Ambient Medical Pulse Elements */}
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-black/15 blur-xl pointer-events-none" />

              {/* Top Branding */}
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-inner">
                    <span
                      className="material-symbols-outlined text-white text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      cardiology
                    </span>
                  </div>
                  <div>
                    <span className="text-xl font-bold tracking-tight text-white block leading-tight">
                      LifeLink
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-white/80 font-semibold">
                      Clinical Portal Access
                    </span>
                  </div>
                </div>
              </div>

              {/* Center Narrative & Stats */}
              <div className="my-8 relative z-10 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Welcome Back!
                  </h2>
                  <p className="text-sm text-white/90 leading-relaxed">
                    Your kindness can make a difference. Sign in to continue
                    supporting our blood donation community and managing
                    critical transfusion requests.
                  </p>
                </div>

                {/* Highlight Metric Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="material-symbols-outlined text-[#7ffc97] text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified_user
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-white/90">
                      Critical Reserve Metric
                    </span>
                  </div>
                  <p className="text-base font-bold text-white tracking-tight">
                    4,120+ Units Donated
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-white/80">
                    <span className="w-2 h-2 rounded-full bg-[#7ffc97] animate-pulse" />
                    <span className="text-xs font-medium">
                      99.4% Urgent Match Rate
                    </span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="relative pl-3 bg-white/5 rounded-r-lg py-2 pr-3">
                  <p className="text-xs italic text-white/95 leading-snug">
                    “LifeLink enabled our hospital to source 4 units of rare O-
                    within 35 minutes.”
                  </p>
                  <p className="text-[11px] font-semibold text-white/75 mt-1.5">
                    — Dr. Mahesh Senanayake, Kandy Teaching Hospital
                  </p>
                </div>
              </div>

              {/* Bottom Security Stamp */}
              <div className="relative z-10 pt-4 flex items-center justify-between">
                <p className="text-xs font-medium text-white/90">
                  Together, we can save more lives.
                </p>
                <div className="flex items-center gap-1.5 bg-black/20 rounded-full px-2.5 py-1">
                  <span
                    className="material-symbols-outlined text-white text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    shield
                  </span>
                  <span className="text-[11px] tracking-wide text-white font-semibold">
                    NBTS Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section: 55% Authentication Console */}
            <div
              className={`md:w-7/12 p-8 md:p-10 flex flex-col justify-center transition-colors ${
                isDarkMode ? "bg-[#1E293B]" : "bg-white"
              }`}
            >
              <div className="max-w-md w-full mx-auto">
                {/* Console Header */}
                <div className="mb-8">
                  <div
                    className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3 ${
                      isDarkMode
                        ? "bg-[#334155] text-[#ffdad6]"
                        : "bg-[#dce9ff] text-[#b70011]"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b70011] animate-ping" />
                    TRANSFUSION NETWORK V4.2
                  </div>
                  <h1
                    className={`text-3xl font-bold tracking-tight ${
                      isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                    }`}
                  >
                    Welcome Back
                  </h1>
                  <p
                    className={`text-sm mt-1 ${
                      isDarkMode ? "text-[#94A3B8]" : "text-slate-600"
                    }`}
                  >
                    Sign in to your LifeLink account to manage requests or
                    donation availability.
                  </p>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-[#dc2626] text-xs font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">
                      error
                    </span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Authentication Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label
                        htmlFor="email"
                        className={`text-xs font-semibold ${
                          isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                        }`}
                      >
                        Email Address
                      </label>
                      <span className="text-[11px] text-[#b70011] font-medium">
                        Required
                      </span>
                    </div>
                    <div
                      className={`relative rounded-xl transition-colors ${
                        isDarkMode ? "bg-[#111827]" : "bg-slate-100"
                      }`}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined text-xl">
                          mail
                        </span>
                      </div>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="doctor@generalhospital.lk"
                        className={`w-full pl-11 pr-4 py-2.5 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-[#b70011]/20 rounded-xl ${
                          isDarkMode
                            ? "text-[#F8FAFC] placeholder-slate-500"
                            : "text-[#0b1c30] placeholder-slate-400"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label
                        htmlFor="password"
                        className={`text-xs font-semibold ${
                          isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                        }`}
                      >
                        Password
                      </label>
                      <span className="text-[11px] text-slate-400">
                        Encrypted
                      </span>
                    </div>
                    <div
                      className={`relative rounded-xl transition-colors ${
                        isDarkMode ? "bg-[#111827]" : "bg-slate-100"
                      }`}
                    >
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined text-xl">
                          lock
                        </span>
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full pl-11 pr-11 py-2.5 bg-transparent text-xs focus:outline-none focus:ring-2 focus:ring-[#b70011]/20 rounded-xl ${
                          isDarkMode
                            ? "text-[#F8FAFC] placeholder-slate-500"
                            : "text-[#0b1c30] placeholder-slate-400"
                        }`}
                      />
                      <button
                        type="button"
                        aria-label="Toggle password view"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-xl">
                          {showPassword ? "visibility" : "visibility_off"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Controls Row: Remember me & Forgot Password */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded text-[#dc2626] bg-slate-100 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span
                        className={`text-xs transition-colors select-none ${
                          isDarkMode
                            ? "text-slate-400 group-hover:text-white"
                            : "text-slate-600 group-hover:text-[#0b1c30]"
                        }`}
                      >
                        Remember this device for 30 days
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-xs text-[#b70011] hover:text-[#dc2626] font-semibold transition-colors"
                    >
                      Forgot Password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full h-11 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none cursor-pointer ${
                        isAuthorized
                          ? "bg-[#00682b]"
                          : isSubmitting
                            ? "bg-[#dc2626] opacity-80 cursor-not-allowed"
                            : "bg-[#dc2626] hover:bg-[#b70011] active:scale-[0.99]"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-xl ${
                          isSubmitting ? "animate-spin" : ""
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {isAuthorized
                          ? "check_circle"
                          : isSubmitting
                            ? "sync"
                            : "login"}
                      </span>
                      <span>
                        {isAuthorized
                          ? "Access Authorized"
                          : isSubmitting
                            ? "Authenticating..."
                            : "Sign In"}
                      </span>
                    </button>
                  </div>

                  {/* Quick Security Metadata */}
                  <div
                    className={`rounded-xl p-3 flex items-center justify-center gap-2 text-center border transition-colors ${
                      isDarkMode
                        ? "bg-[#111827] border-[#334155] text-slate-400"
                        : "bg-slate-100 border-slate-200 text-slate-600"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm text-[#00682b]">
                      lock_reset
                    </span>
                    <span className="text-[11px]">
                      Secured with AES-256 encryption &amp; JWT session hashing
                    </span>
                  </div>

                  {/* Sign Up Registration Link */}
                  <div className="text-center pt-2">
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="text-[#b70011] hover:text-[#dc2626] font-semibold transition-colors ml-1"
                      >
                        Create an Account
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
