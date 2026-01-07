// src/context/AppContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  employees,
  notifications as seedNotifications,
  tasks as seedTasks,
  projects as seedProjects,
} from "../assets/assets";

export const AppContext = createContext();

const LS_USER = "userData_v1";
const LS_NOTIFS = "app_notifications_v1";
const LS_TASKS = "app_tasks_v1";

const safeLower = (v) => (v ?? "").toString().trim().toLowerCase();
const safeStr = (v) => (v ?? "").toString();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem(LS_USER);
    return stored ? JSON.parse(stored) : null;
  });

  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem(LS_NOTIFS);
    return stored ? JSON.parse(stored) : seedNotifications || [];
  });

  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem(LS_TASKS);
    return stored ? JSON.parse(stored) : seedTasks || [];
  });

  const projects = seedProjects || [];

  useEffect(() => {
    localStorage.setItem(LS_NOTIFS, JSON.stringify(notifications || []));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(LS_TASKS, JSON.stringify(tasks || []));
  }, [tasks]);

  const login = (email, password) => {
    const emailNorm = safeLower(email);
    const pw = safeStr(password);

    if (!emailNorm || !pw) {
      return { success: false, message: "Office email and password are required." };
    }

    const found = (employees || []).find((emp) => {
      const empEmail = safeLower(emp?.officeEmail);
      const empPw = safeStr(emp?.password);
      return empEmail === emailNorm && empPw === pw;
    });

    if (!found) return { success: false, message: "Invalid email or password" };

    const safeUser = {
      ...found,
      password: undefined,
      oldPassword: undefined,
      isHR: found?.designationId === "DES-004",
    };

    setUserData(safeUser);
    localStorage.setItem(LS_USER, JSON.stringify(safeUser));
    navigate("/");
    return { success: true, user: safeUser };
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem(LS_USER);
    navigate("/admin/login");
  };

  const currentEmployeeId = userData?.id || null;

  const canEditEmployee = (targetEmployeeId) => {
    if (!userData?.id) return false;
    if (userData?.designationId === "DES-004") return true;
    return userData.id === targetEmployeeId;
  };

  /* ==========================
     ✅ Notifications
  ========================== */
  const userNotifications = useMemo(() => {
    if (!currentEmployeeId) return [];
    return (notifications || [])
      .filter((n) => n.userId === currentEmployeeId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [notifications, currentEmployeeId]);

  const unreadCount = useMemo(() => {
    return (userNotifications || []).filter((n) => !n.opened).length;
  }, [userNotifications]);

  const markNotificationOpened = (notificationId, opened = true) => {
    setNotifications((prev) =>
      (prev || []).map((n) => (n.id === notificationId ? { ...n, opened: !!opened } : n))
    );
  };

  const markAllNotificationsOpened = (opened = true) => {
    if (!currentEmployeeId) return;
    setNotifications((prev) =>
      (prev || []).map((n) => (n.userId === currentEmployeeId ? { ...n, opened: !!opened } : n))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications((prev) => (prev || []).filter((n) => n.id !== notificationId));
  };

  const clearMyNotifications = () => {
    if (!currentEmployeeId) return;
    setNotifications((prev) => (prev || []).filter((n) => n.userId !== currentEmployeeId));
  };

  const addNotification = (notif) => {
    if (!notif?.id) return;
    setNotifications((prev) => [notif, ...(prev || [])]);
  };

  /* ==========================
     ✅ Tasks
  ========================== */
  const userTasks = useMemo(() => {
    if (!currentEmployeeId) return [];
    return (tasks || [])
      .filter((t) => (t.assignedEmployees || []).includes(currentEmployeeId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [tasks, currentEmployeeId]);

  const addTask = (task) => {
    if (!task?.id) return;
    setTasks((prev) => [task, ...(prev || [])]);
  };

  const updateTask = (taskId, patch = {}, historyEntry = null) => {
    const now = new Date().toISOString();
    setTasks((prev) =>
      (prev || []).map((t) => {
        if (t.id !== taskId) return t;

        const next = { ...t, ...patch, updatedAt: patch?.updatedAt || now };

        // ✅ rules
        if (safeLower(next.status) === "completed") {
          next.progress = 100;
          next.completedAt = next.completedAt || now;
        }
        if (Number(next.progress) === 100) {
          next.status = "completed";
          next.completedAt = next.completedAt || now;
        }

        if (historyEntry) {
          next.history = [
            ...(t.history || []),
            {
              at: historyEntry.at || now,
              by: historyEntry.by || currentEmployeeId || "System",
              action: historyEntry.action || "updated",
              summary: historyEntry.summary || "Updated task.",
              changes: historyEntry.changes,
            },
          ];
        }

        return next;
      })
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => (prev || []).filter((t) => t.id !== taskId));
  };

  const value = useMemo(
    () => ({
      // auth
      userData,
      login,
      logout,
      navigate,
      currentEmployeeId,
      canEditEmployee,

      // ✅ add employees to context (for names)
      employees,

      // notifications
      notifications,
      setNotifications,
      userNotifications,
      unreadCount,
      markNotificationOpened,
      markAllNotificationsOpened,
      deleteNotification,
      clearMyNotifications,
      addNotification,

      // tasks
      tasks,
      setTasks,
      projects,
      userTasks,
      addTask,
      updateTask,
      deleteTask,
    }),
    [
      userData,
      navigate,
      currentEmployeeId,
      notifications,
      userNotifications,
      unreadCount,
      tasks,
      projects,
      userTasks,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
