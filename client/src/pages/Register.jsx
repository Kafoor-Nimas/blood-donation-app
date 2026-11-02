import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useApp } from "../context/AppContext";

export default function Register() {
  const { isDarkMode } = useApp();
  const navigate = useNavigate();

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI Control State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-time Password Strength Criteria
  const passwordCriteria = useMemo(() => {
    return {
      hasMinLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    };
  }, [password]);

  const strengthScore = useMemo(() => {
    let score = 0;
    if (passwordCriteria.hasMinLength) score++;
    if (passwordCriteria.hasUppercase) score++;
    if (passwordCriteria.hasNumber) score++;
    return score;
  }, [passwordCriteria]);

  const strengthLabel = useMemo(() => {
    if (strengthScore === 3) return { text: "Strong", color: "text-[#008438]" };
    if (strengthScore === 2)
      return { text: "Moderate", color: "text-amber-500" };
    if (strengthScore === 1) return { text: "Weak", color: "text-[#b70011]" };
    return { text: "Enter Password", color: "text-slate-400" };
  }, [strengthScore]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please verify your entries.");
      return;
    }

    setIsSubmitting(true);

    // Simulated API Registration Delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Registration successful! Redirecting to login portal.");
      navigate("/login");
    }, 1000);
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
        <div className="flex flex-col w-full pt-20">
          <div
            className={`w-full max-w-5xl mx-auto my-6 sm:my-10 rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden border transition-colors ${
              isDarkMode
                ? "bg-[#1E293B] border-[#334155]"
                : "bg-white border-slate-100"
            }`}
          >
            {/* Left Visual & Narrative Section (42-45%) */}
            <div className="md:w-5/12 bg-gradient-to-br from-[#dc2626] to-[#b70011] text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
              {/* Background Ambient Elements */}
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full bg-black/20 blur-3xl pointer-events-none" />

              {/* Top Branding */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#b70011] flex items-center justify-center shadow-md">
                    <span
                      className="material-symbols-outlined text-[24px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      cardiology
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight text-white leading-none">
                      LifeLink
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-red-200 pt-1 font-semibold">
                      Emergency Grid
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs backdrop-blur-sm tracking-wide font-medium">
                  Donor Registry
                </span>
              </div>

              {/* Center Narrative & Key Value Badges */}
              <div className="relative z-10 my-8 flex flex-col gap-6">
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">
                    Be a Hero.
                    <br />
                    Save a Life.
                  </h1>
                  <p className="text-xs text-red-100 mt-3 leading-relaxed">
                    Join our blood donation network and help connect verified
                    patients across Sri Lanka with urgent, life-saving
                    transfusions in real time.
                  </p>
                </div>

                {/* Key Benefits List */}
                <div className="flex flex-col gap-3.5 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px] text-white">
                        verified
                      </span>
                    </div>
                    <span className="text-xs text-white/90 font-medium">
                      Instant matching with verified hospital blood banks
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px] text-white">
                        shield
                      </span>
                    </div>
                    <span className="text-xs text-white/90 font-medium">
                      Privacy-first donor contact masking &amp; consent controls
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px] text-white">
                        ecg_heart
                      </span>
                    </div>
                    <span className="text-xs text-white/90 font-medium">
                      Automated recovery tracking and clinical rest alerts
                    </span>
                  </div>
                </div>

                {/* Simulated Active Donor Badge Card */}
                <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 shadow-inner mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white text-[#b70011] text-lg font-bold flex items-center justify-center">
                        O-
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-white font-semibold leading-tight">
                          Universal Donor
                        </span>
                        <span className="text-xs text-red-200">
                          Clinical Match Ready
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/30 text-white text-xs">
                      <span className="w-2 h-2 rounded-full bg-[#7ffc97] animate-pulse" />
                      <span>Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Status */}
              <div className="relative z-10 pt-4 flex items-center justify-between text-white/80">
                <span className="text-[11px] tracking-wide">
                  Every drop counts. Every donor matters.
                </span>
                <div className="flex items-center gap-1.5 text-white text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-white">
                    bolt
                  </span>
                  <span>24/7 Grid</span>
                </div>
              </div>
            </div>

            {/* Right Form Section (55-58%) */}
            <div
              className={`md:w-7/12 p-8 md:p-12 flex flex-col justify-center transition-colors ${
                isDarkMode ? "bg-[#1E293B]" : "bg-white"
              }`}
            >
              <div className="w-full max-w-md mx-auto">
                {/* Console Header */}
                <div className="mb-6">
                  <div
                    className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${
                      isDarkMode
                        ? "bg-[#334155] text-[#ffdad6]"
                        : "bg-[#ffdad6] text-[#b70011]"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-ping" />
                    Verified Blood Network Registration
                  </div>
                  <h2
                    className={`text-2xl font-bold tracking-tight ${
                      isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                    }`}
                  >
                    Create Your Account
                  </h2>
                  <p
                    className={`text-xs mt-1 ${
                      isDarkMode ? "text-[#94A3B8]" : "text-slate-600"
                    }`}
                  >
                    Join LifeLink and become part of our nationwide donor and
                    requester community.
                  </p>
                </div>

                {/* Registration Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="full-name"
                        className={`text-xs font-semibold ${
                          isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                        }`}
                      >
                        Full Name
                      </label>
                      <span className="text-[11px] text-[#b70011] font-medium">
                        Required
                      </span>
                    </div>
                    <div
                      className={`relative flex items-center rounded-xl transition-colors ${
                        isDarkMode ? "bg-[#111827]" : "bg-slate-100"
                      }`}
                    >
                      <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                        person
                      </span>
                      <input
                        id="full-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Kasun Kalhara Bandara"
                        className={`w-full pl-11 pr-4 py-2.5 bg-transparent rounded-xl text-xs outline-none transition-all ${
                          isDarkMode
                            ? "text-[#F8FAFC] placeholder-slate-500"
                            : "text-[#0b1c30] placeholder-slate-400"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
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
                      className={`relative flex items-center rounded-xl transition-colors ${
                        isDarkMode ? "bg-[#111827]" : "bg-slate-100"
                      }`}
                    >
                      <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                        mail
                      </span>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="kasun@example.com"
                        className={`w-full pl-11 pr-4 py-2.5 bg-transparent rounded-xl text-xs outline-none transition-all ${
                          isDarkMode
                            ? "text-[#F8FAFC] placeholder-slate-500"
                            : "text-[#0b1c30] placeholder-slate-400"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="phone"
                        className={`text-xs font-semibold ${
                          isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                        }`}
                      >
                        Phone Number
                      </label>
                      <span className="text-[11px] text-slate-400 font-medium">
                        SMS Verification
                      </span>
                    </div>
                    <div
                      className={`relative flex items-center rounded-xl transition-colors ${
                        isDarkMode ? "bg-[#111827]" : "bg-slate-100"
                      }`}
                    >
                      <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                        call
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+94 77 123 4567"
                        className={`w-full pl-11 pr-4 py-2.5 bg-transparent rounded-xl text-xs outline-none transition-all ${
                          isDarkMode
                            ? "text-[#F8FAFC] placeholder-slate-500"
                            : "text-[#0b1c30] placeholder-slate-400"
                        }`}
                      />
                    </div>
                    <p
                      className={`text-[10px] flex items-center gap-1 mt-0.5 ${
                        isDarkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        info
                      </span>
                      Used for emergency dispatch alerts and OTP validation
                      only.
                    </p>
                  </div>

                  {/* Password Field */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="password"
                      className={`text-xs font-semibold ${
                        isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                      }`}
                    >
                      Password
                    </label>
                    <div
                      className={`relative flex items-center rounded-xl transition-colors ${
                        isDarkMode ? "bg-[#111827]" : "bg-slate-100"
                      }`}
                    >
                      <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                        lock
                      </span>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a strong password"
                        className={`w-full pl-11 pr-11 py-2.5 bg-transparent rounded-xl text-xs outline-none transition-all ${
                          isDarkMode
                            ? "text-[#F8FAFC] placeholder-slate-500"
                            : "text-[#0b1c30] placeholder-slate-400"
                        }`}
                      />
                      <button
                        type="button"
                        aria-label="Toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none flex items-center justify-center p-1 rounded-lg cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Password Strength Meter */}
                  <div
                    className={`p-3.5 rounded-xl space-y-2 border transition-colors ${
                      isDarkMode
                        ? "bg-[#111827] border-[#334155]"
                        : "bg-slate-100 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">
                        Security Strength
                      </span>
                      <span
                        className={`text-[11px] font-semibold ${strengthLabel.color}`}
                      >
                        {strengthLabel.text}
                      </span>
                    </div>

                    {/* Progress indicator bars */}
                    <div className="grid grid-cols-3 gap-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-colors ${
                          strengthScore >= 1
                            ? "bg-[#b70011]"
                            : "bg-slate-300 dark:bg-slate-700"
                        }`}
                      />
                      <div
                        className={`h-1.5 rounded-full transition-colors ${
                          strengthScore >= 2
                            ? "bg-amber-500"
                            : "bg-slate-300 dark:bg-slate-700"
                        }`}
                      />
                      <div
                        className={`h-1.5 rounded-full transition-colors ${
                          strengthScore >= 3
                            ? "bg-[#008438]"
                            : "bg-slate-300 dark:bg-slate-700"
                        }`}
                      />
                    </div>

                    {/* Security Criteria Checkmarks */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pt-1">
                      <div
                        className={`flex items-center gap-1 text-[11px] ${
                          passwordCriteria.hasMinLength
                            ? "text-[#008438]"
                            : "text-slate-400"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {passwordCriteria.hasMinLength
                            ? "check_circle"
                            : "cancel"}
                        </span>
                        <span>8+ chars</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-[11px] ${
                          passwordCriteria.hasUppercase
                            ? "text-[#008438]"
                            : "text-slate-400"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {passwordCriteria.hasUppercase
                            ? "check_circle"
                            : "cancel"}
                        </span>
                        <span>Uppercase</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-[11px] ${
                          passwordCriteria.hasNumber
                            ? "text-[#008438]"
                            : "text-slate-400"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {passwordCriteria.hasNumber
                            ? "check_circle"
                            : "cancel"}
                        </span>
                        <span>One number</span>
                      </div>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="confirm-password"
                      className={`text-xs font-semibold ${
                        isDarkMode ? "text-[#F8FAFC]" : "text-[#0b1c30]"
                      }`}
                    >
                      Confirm Password
                    </label>
                    <div
                      className={`relative flex items-center rounded-xl transition-colors ${
                        isDarkMode ? "bg-[#111827]" : "bg-slate-100"
                      }`}
                    >
                      <span className="material-symbols-outlined absolute left-3.5 text-slate-400 text-[20px] pointer-events-none">
                        lock_reset
                      </span>
                      <input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className={`w-full pl-11 pr-11 py-2.5 bg-transparent rounded-xl text-xs outline-none transition-all ${
                          isDarkMode
                            ? "text-[#F8FAFC] placeholder-slate-500"
                            : "text-[#0b1c30] placeholder-slate-400"
                        }`}
                      />
                      <button
                        type="button"
                        aria-label="Toggle confirm password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none flex items-center justify-center p-1 rounded-lg cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showConfirmPassword
                            ? "visibility_off"
                            : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Terms & Privacy Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        required
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-[#dc2626] bg-slate-100 focus:ring-0 cursor-pointer accent-[#dc2626]"
                      />
                      <span
                        className={`text-xs leading-snug transition-colors select-none ${
                          isDarkMode
                            ? "text-slate-400 group-hover:text-white"
                            : "text-slate-600 group-hover:text-[#0b1c30]"
                        }`}
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-[#b70011] font-medium underline underline-offset-2"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-[#b70011] font-medium underline underline-offset-2"
                        >
                          Privacy Policy
                        </a>
                        , including emergency donor data protection protocols.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#dc2626] hover:bg-[#b70011] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      <span>
                        {isSubmitting
                          ? "Creating Account..."
                          : "Create Account"}
                      </span>
                      <span
                        className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                          isSubmitting
                            ? "animate-spin"
                            : "group-hover:translate-x-1"
                        }`}
                      >
                        {isSubmitting ? "sync" : "arrow_forward"}
                      </span>
                    </button>
                  </div>

                  {/* Footer Link */}
                  <div className="text-center pt-2">
                    <span
                      className={`text-xs ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-[#b70011] hover:text-[#dc2626] font-semibold transition-colors ml-1"
                      >
                        Sign In
                      </Link>
                    </span>
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
