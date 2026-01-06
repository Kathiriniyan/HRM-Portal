// src/layout/Layout.jsx
import React, { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Rss,
  User,
  CalendarCheck2,
  ClipboardCheck,
  MapPinned,
  CalendarOff,
  Receipt,
  Umbrella,
  ListTodo,
  Shuffle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import ThemeToggleBtn from "./ThemeToggleBtn";
import assets from "../assets/assets";
import { useAppContext } from "../context/AppContext";

/* =======================
   Motion (smooth + slower)
======================= */
const spring = { type: "spring", stiffness: 260, damping: 34, mass: 1.15 };
const fade = { duration: 0.35, ease: "easeOut" };
const tabSpring = { type: "spring", stiffness: 520, damping: 34, mass: 0.7 };

// ✅ set your Create route here
const CREATE_PATH = "/create";

/* =======================
   Date helpers
======================= */
const pad2 = (n) => String(n).padStart(2, "0");
const formatMobileDate = (d = new Date()) => {
  const day = pad2(d.getDate());
  const month = d.toLocaleString(undefined, { month: "short" }).toUpperCase();
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};
const formatDesktopDate = (d = new Date()) => {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const Layout = ({ theme, setTheme }) => {
  const location = useLocation();
  const { navigate, userData, logout } = useAppContext();

  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navSections = useMemo(
    () => [
      {
        key: "main",
        items: [
          { to: "/", label: "Home", Icon: LayoutDashboard },
          { to: "/tasks", label: "Task", Icon: CheckSquare },
          { to: "/feeds", label: "Feeds", Icon: Rss },
          { to: "/profile", label: "Profile", Icon: User },
        ],
      },
      {
        key: "modules",
        items: [
          { to: "/attendance", label: "Attendance", Icon: CalendarCheck2 },
          { to: "/mark-attendance", label: "Mark Attendance", Icon: ClipboardCheck },
          { to: "/attendance-areas", label: "Attendance Areas", Icon: MapPinned },
          { to: "/leave", label: "Leave", Icon: CalendarOff },
          { to: "/payroll", label: "Payroll", Icon: Receipt },
          { to: "/holiday", label: "Holiday", Icon: Umbrella },
          { to: "/todo", label: "Todo", Icon: ListTodo },
          { to: "/shift-assignment", label: "Shift Assignment", Icon: Shuffle },
        ],
      },
    ],
    []
  );

  // ✅ Mobile bottom nav uses ONLY 4 Menu items (same routes)
  const mobileMenu = navSections[0].items;

  const handleNavigate = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  const isActivePath = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  /* =======================
     TOP BAR
     ✅ Desktop unchanged
     ✅ Mobile updated to match your screenshot
  ======================= */
  const TopBar = () => {
    const firstName = userData?.firstName || "Employee";
    const lastName = userData?.lastName || "";
    const avatar = userData?.profileImage;

    const email =
      userData?.email ||
      userData?.emailAddress ||
      userData?.userEmail ||
      userData?.username ||
      "";

    const initials =
      `${(firstName || "E")[0] || "E"}${(lastName || "U")[0] || "U"}`.toUpperCase();

    const onCheckIn = () => {
      // ✅ change this route if you want
      // handleNavigate("/attendance");
      handleNavigate("/mark-attendance");
    };

    return (
      <>
        {/* ========= Mobile / Tablet (UPDATED LIKE IMAGE) ========= */}
        <div className="lg:hidden">
          <header className="sticky top-0 z-30">
            {/* top “status” row */}
            <div className="mx-4 pt-4">
              <div className="flex items-center justify-between px-1 pb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                <span>
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                <div className="flex items-center gap-2 opacity-70">
                  <span className="inline-block h-2 w-6 rounded-full bg-gray-400/60 dark:bg-gray-500/60" />
                  <span className="inline-block h-2 w-4 rounded-full bg-gray-400/60 dark:bg-gray-500/60" />
                  <span className="inline-block h-2 w-8 rounded-full bg-gray-400/60 dark:bg-gray-500/60" />
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="mx-4 mb-4">
              <div
                className={[
                  "relative",
                  "rounded-3xl",
                  "bg-white dark:bg-[#1E293B]",
                  "border border-red-500/70 dark:border-red-500/40", // ✅ red outline like screenshot
                  "shadow-[0_18px_50px_-40px_rgba(2,6,23,0.35)]",
                  "px-4 pt-4 pb-6", // pb enough so button can overlap
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Left: avatar + text */}
                  <button
                    type="button"
                    onClick={() => handleNavigate("/profile")}
                    className="flex items-center gap-3 min-w-0"
                    aria-label="Open profile"
                  >
                    <span
                      className={[
                        "relative",
                        "w-11 h-11 rounded-full overflow-hidden",
                        "bg-gray-100 dark:bg-white/10",
                        "border-2 border-white dark:border-gray-700",
                        "ring-2 ring-gray-200/70 dark:ring-white/10", // ✅ more “photo” feel
                        "shadow-sm",
                        "grid place-items-center shrink-0",
                      ].join(" ")}
                    >
                      {avatar ? (
                        <img
                          alt="User Profile"
                          src={avatar}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-xs font-bold text-gray-800 dark:text-white">
                          {initials}
                        </span>
                      )}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-base font-extrabold text-gray-900 dark:text-white truncate">
                        Hello {firstName}!
                      </span>
                      <span className="block text-[12px] text-gray-500 dark:text-gray-300 truncate">
                        Email: {email || "—"}
                      </span>
                    </span>
                  </button>

                  {/* Right: bell + menu in round buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      className="relative h-10 w-10 rounded-full bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 shadow-sm grid place-items-center"
                      aria-label="Notifications"
                      title="Notifications"
                    >
                      <Bell className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#1E293B]" />
                    </button>

                    <button
                      onClick={() => setMobileOpen(true)}
                      className="h-10 w-10 rounded-full bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/10 shadow-sm grid place-items-center"
                      aria-label="Open menu"
                      title="Menu"
                    >
                      <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" strokeWidth={2.4} />
                    </button>
                  </div>
                </div>

                {/* Date (bottom-left) */}
                <div className="mt-3">
                  <p className="text-[11px] tracking-[0.22em] text-gray-400 dark:text-gray-400 uppercase">
                    {formatMobileDate()}
                  </p>
                </div>

                {/* ✅ Floating Check-in button (half outside) */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-4">
                  <button
                    type="button"
                    onClick={onCheckIn}
                    className={[
                      "px-6 py-2",
                      "rounded-xl",
                      "bg-primary text-white",
                      "text-sm font-semibold",
                      "shadow-[0_14px_30px_-18px_rgba(237,41,38,0.75)]",
                      "active:scale-[0.98] transition",
                      "flex items-center gap-2",
                    ].join(" ")}
                    aria-label="Check in"
                    title="Check in"
                  >
                    <span>Check in</span>
                    <span aria-hidden>›</span>
                  </button>
                </div>
              </div>

              {/* Spacer so content doesn’t jump into the floating button */}
              <div className="h-5" />
            </div>
          </header>
        </div>

        {/* ========= Desktop (UNCHANGED) ========= */}
        <div className="hidden lg:block">
          <header className="fixed top-0 left-0 right-0 z-30">
            <motion.div
              className="bg-white/80 dark:bg-[#0f141a]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 transition-colors duration-300"
              animate={{ marginLeft: expanded ? 256 : 80 }}
              transition={spring}
              style={{ willChange: "margin-left" }}
            >
              <div className="px-8 py-5">
                <div className="flex items-center justify-between gap-6">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDesktopDate()}
                    </p>

                    <p
                      className="mt-1 uppercase text-gray-900 dark:text-white tracking-wide font-semibold text-[26px] leading-tight truncate"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      WELCOME, {userData?.firstName || "Employee"}
                    </p>

                    {(userData?.email ||
                      userData?.emailAddress ||
                      userData?.userEmail ||
                      userData?.username) && (
                      <p className="mt-1 text-[12px] text-gray-600 dark:text-gray-300 break-all">
                        {userData?.email ||
                          userData?.emailAddress ||
                          userData?.userEmail ||
                          userData?.username}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <ThemeToggleBtn key={theme} theme={theme} setTheme={setTheme} />

                    <button
                      className="relative p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                      aria-label="Notifications"
                    >
                      <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#0f141a]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigate("/profile")}
                      className="flex items-center gap-3 pl-2 cursor-pointer group"
                      aria-label="Open profile"
                    >
                      <div className="relative w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
                        {userData?.profileImage ? (
                          <img
                            src={userData.profileImage}
                            alt={`${userData?.firstName || "User"} profile`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-xs">
                            {`${(userData?.firstName || "E")[0]}${(userData?.lastName || "U")[0]}`.toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="text-left hidden xl:block">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white leading-none">
                          {userData?.firstName || "Employee"} {userData?.lastName || ""}
                        </p>
                        {(userData?.email ||
                          userData?.emailAddress ||
                          userData?.userEmail ||
                          userData?.username) && (
                          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 break-all">
                            {userData?.email ||
                              userData?.emailAddress ||
                              userData?.userEmail ||
                              userData?.username}
                          </p>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </header>

          <div className="h-[92px]" />
        </div>
      </>
    );
  };

  /* =======================
     Desktop Sidebar (UNCHANGED)
  ======================= */
  const SidebarItem = ({ item }) => {
    const active = isActivePath(item.to);
    const Icon = item.Icon;

    return (
      <NavLink
        to={item.to}
        onClick={(e) => {
          e.preventDefault();
          handleNavigate(item.to);
        }}
        className={`relative flex items-center justify-between rounded-xl transition-all duration-300 group ${
          expanded ? "px-4 py-3" : "px-3 py-3"
        } ${
          active
            ? "text-white"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
        }`}
      >
        {active && (
          <motion.span
            layoutId="active-layout-sidebar"
            transition={spring}
            className="absolute inset-0 bg-primary rounded-xl shadow-md"
          />
        )}

        <div className="relative z-10 flex items-center gap-3 min-w-0">
          <Icon
            className={`w-5 h-5 shrink-0 ${
              active ? "text-white" : "text-gray-500 dark:text-gray-400"
            }`}
          />

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.span
                key="label"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={fade}
                className="font-medium text-sm whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </NavLink>
    );
  };

  const DesktopSidebarContent = () => {
    const fullLogo = theme === "dark" ? assets.logo_dark : assets.logo;
    const miniLogo = theme === "dark" ? assets.logo_mobile_dark : assets.logo_mobile;

    const Divider = () => (
      <div className="px-3">
        <div className="mx-auto h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-white/20" />
      </div>
    );

    return (
      <div className="relative flex flex-col h-full bg-white dark:bg-[#0f141a]">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gray-200 dark:bg-white/10" />

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={[
            "absolute z-50",
            "top-1/2 -translate-y-1/2",
            "-right-3",
            "h-8 w-8 rounded-full",
            "bg-primary/50 dark:bg-[#0f141a]",
            "border border-gray-200 dark:border-white/10",
            "shadow-[0_14px_40px_-30px_rgba(2,6,23,0.65)]",
            "grid place-items-center",
            "cursor-pointer",
            "hover:bg-gray-50 dark:hover:bg-white/5 transition",
          ].join(" ")}
          title={expanded ? "Collapse" : "Expand"}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={expanded ? "left" : "right"}
              initial={{ opacity: 0, rotate: expanded ? 10 : -10, scale: 0.98 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {expanded ? (
                <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-white" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-700 dark:text-white" />
              )}
            </motion.span>
          </AnimatePresence>
        </button>

        <div className="px-4 pt-6 pb-4">
          <div className="h-10 flex items-center">
            <AnimatePresence initial={false} mode="wait">
              {expanded ? (
                <motion.div
                  key="logo-full"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={fade}
                  className="flex items-center"
                >
                  <img src={fullLogo} alt="Logo" className="h-9 w-auto object-contain" />
                </motion.div>
              ) : (
                <motion.div
                  key="logo-mini"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={fade}
                  className="flex items-center"
                >
                  <img src={miniLogo} alt="Logo mini" className="h-9 h-9 object-contain" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <Divider />

        <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-hide">
          <LayoutGroup id="layout-sidebar-group">
            <div className="space-y-1">
              {navSections[0].items.map((item) => (
                <SidebarItem key={item.to} item={item} />
              ))}
            </div>

            <div className="py-4">
              <Divider />
            </div>

            <div className="space-y-1">
              {navSections[1].items.map((item) => (
                <SidebarItem key={item.to} item={item} />
              ))}
            </div>
          </LayoutGroup>
        </div>

        <Divider />

        <div className="p-3">
          <button
            onClick={() => logout?.()}
            className={`w-full flex items-center gap-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors ${
              expanded ? "px-4 py-3" : "px-3 py-3 justify-center"
            }`}
          >
            <LogOut className="w-5 h-5" />
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.span
                  key="logout-label"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={fade}
                  className="font-medium text-sm"
                >
                  Log out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    );
  };

  /* =======================
     Mobile Sidebar (UNCHANGED)
  ======================= */
  const MobileSidebar = () => {
    const fullLogo = theme === "dark" ? assets.logo_dark : assets.logo;

    const allGroups = [
      { title: "Menu", items: navSections[0].items },
      { title: "Modules", items: navSections[1].items },
    ];

    const MobileItem = ({ item }) => {
      const active = isActivePath(item.to);
      const Icon = item.Icon;

      return (
        <a
          href={item.to}
          onClick={(e) => {
            e.preventDefault();
            handleNavigate(item.to);
          }}
          className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            active
              ? "text-white"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
          }`}
        >
          {active && (
            <motion.span
              layoutId="active-mobile-sidebar"
              transition={spring}
              className="absolute inset-0 bg-primary rounded-xl shadow-md"
            />
          )}
          <div className="relative z-10 flex items-center gap-3">
            <Icon
              className={`w-5 h-5 ${
                active ? "text-white" : "text-gray-500 dark:text-gray-400"
              }`}
            />
            <span className="font-medium text-sm">{item.label}</span>
          </div>
        </a>
      );
    };

    return (
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden backdrop-blur-sm"
            />

            <motion.div
              className="fixed left-0 top-0 h-full z-[60] lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ ...spring, stiffness: 280, damping: 30 }}
              style={{ willChange: "transform" }}
            >
              <aside className="h-full w-72 shadow-2xl">
                <div className="relative h-full flex flex-col bg-white dark:bg-[#0f141a]">
                  <div className="px-6 py-6 mb-2">
                    <img src={fullLogo} alt="Logo" className="w-32 object-contain" />
                  </div>

                  <div className="flex-1 overflow-y-auto px-4 space-y-6 scrollbar-hide">
                    <LayoutGroup id="mobile-sidebar-group">
                      {allGroups.map((group) => (
                        <div key={group.title}>
                          <h3 className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            {group.title}
                          </h3>
                          <div className="space-y-1">
                            {group.items.map((item) => (
                              <MobileItem key={item.to} item={item} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </LayoutGroup>
                  </div>

                  <div className="px-4 pb-3">
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200/70 dark:border-white/10">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Theme
                      </span>
                      <ThemeToggleBtn key={theme} theme={theme} setTheme={setTheme} />
                    </div>
                  </div>

                  <div className="p-4 mt-1 border-t border-gray-100 dark:border-white/5">
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        logout?.();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium text-sm">Log out</span>
                    </button>
                  </div>
                </div>
              </aside>

              <motion.button
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 -right-14 h-11 w-11 rounded-full bg-white text-gray-900 shadow-lg grid place-items-center active:scale-[0.98]"
                aria-label="Close sidebar"
                title="Close"
              >
                <X className="w-5 h-5" strokeWidth={2.6} />
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };

  /* =======================
     Mobile Bottom Nav (same as your current)
  ======================= */
  const MobileBottomNav = () => {
    const tabs = mobileMenu;

    return (
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40">
        <div className="pb-[env(safe-area-inset-bottom)]">
          <div className="relative w-full bg-white dark:bg-[#1E293B] border-t border-gray-100 dark:border-white/10 px-6 py-2 rounded-t-[2rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.10)]">
            <div className="flex justify-between items-end relative">
              {tabs.map((item, idx) => {
                const Icon = item.Icon;
                const active = isActivePath(item.to);
                const isLeftNearFab = idx === 1;
                const isRightNearFab = idx === 2;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(item.to);
                    }}
                    className={`flex flex-col items-center gap-1 w-14 ${
                      isLeftNearFab ? "mr-5" : ""
                    } ${isRightNearFab ? "ml-5" : ""}`}
                    aria-label={item.label}
                  >
                    <Icon
                      className={`h-7 w-7 ${
                        active ? "text-primary" : "text-gray-400 dark:text-gray-500"
                      }`}
                      strokeWidth={2.2}
                    />
                    <span
                      className={`text-[10px] font-medium ${
                        active ? "text-primary" : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {item.label}
                    </span>
                    <div
                      className={`w-3 h-1 rounded-full mt-0.5 ${
                        active ? "bg-primary" : "bg-transparent"
                      }`}
                    />
                  </NavLink>
                );
              })}

              <div className="absolute left-1/2 -translate-x-1/2 -top-10">
                <button
                  type="button"
                  onClick={() => handleNavigate(CREATE_PATH)}
                  className="w-14 h-14 bg-primary rounded-full shadow-xl shadow-primary/40 flex items-center justify-center text-white active:scale-[0.98] transition-transform"
                  aria-label="Create"
                  title="Create"
                >
                  <Plus className="w-7 h-7" strokeWidth={2.6} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f141a] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden lg:block fixed left-0 top-0 h-screen z-40"
        animate={{ width: expanded ? 256 : 80 }}
        transition={spring}
        style={{ willChange: "width" }}
      >
        <DesktopSidebarContent />
      </motion.aside>

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main content wrapper */}
      <motion.div
        className="flex flex-col min-h-screen"
        animate={{ marginLeft: 0 }}
        transition={spring}
        style={{ willChange: "margin-left" }}
      >
        {/* Mobile main content */}
        <div className="lg:hidden flex flex-col min-h-screen">
          <TopBar />
          <main className="bg-[#F6F6F6] dark:bg-[#1B1F25] flex-1 px-4 pb-24">
            <div className="mx-auto w-full">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Desktop main content */}
        <motion.div
          className="hidden lg:flex flex-col min-h-screen"
          animate={{ marginLeft: expanded ? 256 : 80 }}
          transition={spring}
          style={{ willChange: "margin-left" }}
        >
          <TopBar />
          <main className="bg-[#F6F6F6] dark:bg-[#1B1F25] flex-1 p-8">
            <div className="mx-auto w-full">
              <Outlet />
            </div>
          </main>
        </motion.div>
      </motion.div>

      {/* Mobile bottom nav */}
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
