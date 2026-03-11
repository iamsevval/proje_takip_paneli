import { useState, useEffect } from "react";
import HomePage from "./Pages/HomePage";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
      
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 left-4 md:left-10 z-[100] p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-110 transition transform text-xl"
        title="Temayı Değiştir"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <HomePage />
    </div>
  );
}

export default App;