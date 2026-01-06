import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import assets from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const [showPw, setShowPw] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { login } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const emailNorm = (email ?? "").trim().toLowerCase();
    const pw = (password ?? "").toString();

    if (!emailNorm || !pw) {
      setError("Office email and password are required.");
      return;
    }

    const result = login(emailNorm, pw);

    if (!result?.success) {
      setError(result?.message || "Invalid credentials.");
    }
  };

  return (
    <main className="relative min-h-screen bg-white text-gray-900 overflow-hidden">
      <div
        className="hidden lg:block absolute inset-y-0 right-0 w-[52%] xl:w-1/2 pointer-events-none"
        aria-hidden
      >
        <picture>
          <img
            src={assets.login_bg}
            alt="Admin Background"
            role="presentation"
            className="h-full w-full object-cover object-left"
            loading="eager"
          />
        </picture>
      </div>

      <div className="lg:hidden">
        <picture>
          <source media="(min-width: 640px)" srcSet={assets.login_bg_sm} />
          <img
            src={assets.login_bg_sm}
            alt="Admin Background"
            role="presentation"
            className="block w-full h-auto select-none pointer-events-none object-contain"
            sizes="100vw"
            loading="eager"
          />
        </picture>
      </div>

      <div className="relative z-10 grid lg:grid-cols-2">
        <section className="px-5 sm:px-10 lg:pl-20 xl:pl-50 pb-14 w-full max-w-3xl mx-auto lg:mx-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
          {/* Brand Logo */}
          <div className="mb-10 flex items-center gap-3">
            <img src={assets.logo} alt="SUKAN" className="h-8" />
          </div>

          {/* Greeting */}
          <p
            className="text-xl sm:text-2xl mb-2"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Welcome back,{" "}
            <span
              className="text-primary font-semibold"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Employee
            </span>
          </p>

          {/* Title */}
          <h1
            className="text-[40px] leading-none sm:text-[54px] font-bold mb-8 text-[#0a2a22]"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Portal Login
          </h1>

          {/* FORM */}
          <form className="max-w-xl" onSubmit={handleSubmit}>
            {/* Email Input */}
            <label className="block mb-4">
              <span className="sr-only">Office Email</span>
              <input
                type="email"
                placeholder="Office Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#ed2925] bg-transparent px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[#ed2925] placeholder:text-gray-500 shadow-[0_18px_45px_-22px_rgba(0,0,0,0.45)] transition-all"
                autoComplete="username"
              />
            </label>

            {/* Password Input */}
            <label className="block mb-3">
              <span className="sr-only">Password</span>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-[#ed2925] bg-transparent px-4 py-3 pr-12 text-base outline-none focus:ring-2 focus:ring-[#ed2925] placeholder:text-gray-500 shadow-[0_18px_45px_-22px_rgba(0,0,0,0.45)] transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  aria-label={showPw ? "Hide password" : "Show password"}
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center size-9 rounded-md text-gray-700/85 hover:bg-black/5 transition-colors"
                >
                  {showPw ? (
                    <FiEyeOff className="h-5 w-5" />
                  ) : (
                    <FiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </label>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-sm select-none cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="size-4 rounded accent-[#ed2925]"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-gray-700 hover:underline"
                onClick={() => setError("Please contact HR to reset your password.")}
              >
                Forgot Password?
              </button>
            </div>

            {error && (
              <p className="mb-4 text-sm text-red-600 font-semibold bg-red-50 p-3 rounded-md border border-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto min-w-56 rounded-lg bg-primary text-white text-lg font-semibold py-3 px-8 shadow-[0_24px_48px_-20px_rgba(237,41,37,0.65)] hover:opacity-95 active:scale-[.99] transition-transform duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-500">
            <p>
              Copyright © {new Date().getFullYear()}{" "}
              <span className="text-primary font-semibold">Sukan</span> All
              rights reserved.
            </p>
            <p className="sm:text-right">
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </p>
          </div>
        </section>

        <aside className="hidden lg:block" />
      </div>
    </main>
  );
};

export default Login;
