import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useAppContext } from "./context/AppContext";
import Layout from "./components/Layout";
import Tasks from "./pages/Tasks";
import Feeds from "./pages/Feeds";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Notifications from "./pages/Notifications";


const getInitialTheme = () => {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
};

const RequireAuth = ({ children, userData }) => {
  if (!userData) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const App = () => {
  const [theme, setTheme] = useState(getInitialTheme());
  const { userData } = useAppContext();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Routes>
      <Route
        path="/admin/login"
        element={!userData ? <Login /> : <Navigate to="/" replace />}
      />

      <Route
        path="/"
        element={
          <RequireAuth userData={userData}>
            <Layout theme={theme} setTheme={setTheme} />
          </RequireAuth>
        }
      >
        <Route index element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;