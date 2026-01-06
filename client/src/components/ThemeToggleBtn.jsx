import React, { useEffect, useRef, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";

const DURATION = 0.3; // seconds
const THUMB_X = 36; // px (translate-x-9)

const ThemeToggleBtn = ({ theme, setTheme }) => {
  const reduceMotion = useReducedMotion();

  // ✅ UI-only state (drives thumb + icon animations)
  const [uiTheme, setUiTheme] = useState(theme);

  // ✅ stores the real theme we will apply after animation ends
  const pendingRef = useRef(null);

  // ✅ true only while we are running a user-triggered animation
  const animatingRef = useRef(false);

  // ✅ keep UI in sync if theme changes elsewhere (load / external)
  useEffect(() => {
    // if we are not currently animating, follow real theme
    if (!animatingRef.current) setUiTheme(theme);
  }, [theme]);

  const thumbTransition = reduceMotion
    ? { duration: 0 }
    : { duration: DURATION, ease: [0.22, 1, 0.36, 1] };

  const startToggle = (next) => {
    if (reduceMotion) {
      // no animation: just switch instantly
      setTheme(next);
      return;
    }

    if (animatingRef.current) return; // block spamming
    if (next === uiTheme) return;

    animatingRef.current = true;
    pendingRef.current = next;

    // ✅ start animation ONLY (do not switch app theme yet)
    setUiTheme(next);
  };

  const isDarkUI = uiTheme === "dark";

  return (
    <div
      className="
        relative inline-flex items-center select-none
        rounded-full bg-white ring-1 ring-black/10 shadow-sm
        dark:bg-white dark:ring-white/10 p-1
      "
      role="tablist"
      aria-label="Theme"
    >
      {/* ✅ Thumb */}
      <motion.span
        aria-hidden="true"
        className={[
          "absolute left-1 top-1 size-9 rounded-full shadow-md will-change-transform",
          isDarkUI ? "bg-black" : "bg-primary",
        ].join(" ")}
        initial={false} // ✅ IMPORTANT: don’t run mount animation / mount-complete callbacks
        animate={{ x: isDarkUI ? THUMB_X : 0 }}
        transition={thumbTransition}
        onAnimationComplete={() => {
          // ✅ only commit theme if this completion came from a user toggle
          if (!animatingRef.current) return;

          const pending = pendingRef.current;
          pendingRef.current = null;
          animatingRef.current = false;

          // ✅ NOW switch the whole app theme (dark class + colors)
          if (pending && pending !== theme) setTheme(pending);
        }}
      />

      {/* Light */}
      <button
        type="button"
        onClick={() => startToggle("light")}
        role="tab"
        aria-selected={!isDarkUI}
        aria-label="Switch to light mode"
        title="Light"
        className="
          relative z-10 grid size-9 place-items-center rounded-full
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
        "
      >
        <motion.div
          initial={false}
          animate={{ opacity: isDarkUI ? 0.45 : 1, scale: isDarkUI ? 0.92 : 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: DURATION * 0.6 }}
        >
          <FiSun className={isDarkUI ? "h-5 w-5 text-gray-600" : "h-5 w-5 text-white"} />
        </motion.div>
      </button>

      {/* Dark */}
      <button
        type="button"
        onClick={() => startToggle("dark")}
        role="tab"
        aria-selected={isDarkUI}
        aria-label="Switch to dark mode"
        title="Dark"
        className="
          relative z-10 grid size-9 place-items-center rounded-full
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60
        "
      >
        <motion.div
          initial={false}
          animate={{ opacity: isDarkUI ? 1 : 0.45, scale: isDarkUI ? 1 : 0.92 }}
          transition={reduceMotion ? { duration: 0 } : { duration: DURATION * 0.6 }}
        >
          <FiMoon className={isDarkUI ? "h-5 w-5 text-white" : "h-5 w-5 text-gray-900"} />
        </motion.div>
      </button>
    </div>
  );
};

export default ThemeToggleBtn;
