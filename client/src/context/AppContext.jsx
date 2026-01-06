import React, { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { employees } from "../assets/assets";

export const AppContext = createContext();

const LS_USER = "userData_v1";
const safeLower = (v) => (v ?? "").toString().trim().toLowerCase();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem(LS_USER);
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email, password) => {
    const emailNorm = safeLower(email);
    const pw = (password ?? "").toString();

    if (!emailNorm || !pw) {
      return { success: false, message: "Office email and password are required." };
    }

    const found = (employees || []).find((emp) => {
      const empEmail = safeLower(emp?.officeEmail);
      const empPw = (emp?.password ?? "").toString();
      return empEmail === emailNorm && empPw === pw;
    });

    if (!found) {
      return { success: false, message: "Invalid email or password" };
    }

    // Remove passwords from stored session
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

  // helper: get current logged-in employee id (no staff fallback)
  const currentEmployeeId = userData?.id || null;

  // helper: can edit profile?
  const canEditEmployee = (targetEmployeeId) => {
    if (!userData?.id) return false;
    if (userData?.designationId === "DES-004") return true; // HR can edit anyone
    return userData.id === targetEmployeeId; // employee can edit own profile
  };

  const value = useMemo(
    () => ({
      userData,
      login,
      logout,
      currentEmployeeId,
      canEditEmployee,
      navigate,
    }),
    [userData, navigate]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
