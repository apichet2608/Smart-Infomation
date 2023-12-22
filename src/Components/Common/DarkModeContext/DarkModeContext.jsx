import React, { createContext, useContext, useState, useEffect } from "react";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  // ตรวจสอบว่า Browser หรือระบบปฏิบัติการชอบ Dark Mode หรือไม่
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    // กำหนดให้ Dark Mode ใช้ค่าจาก Browser หากไม่มีการบันทึกค่าไว้
    return storedDarkMode ? JSON.parse(storedDarkMode) : prefersDarkMode;
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // บันทึก Dark Mode ลง Local Storage เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // เพิ่ม useEffect เพื่อตรวจจับการเปลี่ยนแปลงใน Browser's preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      // อัปเดต Dark Mode ตาม Browser's preference
      setIsDarkMode(mediaQuery.matches);
    };

    // เพิ่ม Event Listener เพื่อตรวจจับการเปลี่ยนแปลง
    mediaQuery.addEventListener("change", handleChange);
    // ลบ Event Listener เมื่อ Component ถูก Unmounted
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
