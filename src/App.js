import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import TodoApp from "./components/TodoApp";
import AuthTabs from "./components/AuthTabs";

export default function App() {
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  if (!user) {
    return (
      <div>
        <div className="flex justify-end p-4">
          <button
            onClick={() => setDark((d) => !d)}
            className="px-4 py-2 rounded font-bold bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow transition"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
        <AuthTabs />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end p-4 gap-2">
        <button
          onClick={() => setDark((d) => !d)}
          className="px-4 py-2 rounded font-bold bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow transition"
        >
          {dark ? "🌙 Dark" : "☀️ Light"}
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600 transition"
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      </div>
      <TodoApp />
    </div>
  );
}