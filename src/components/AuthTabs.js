import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function AuthTabs() {
  const [tab, setTab] = useState("login");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Highly visible heading */}
      <h1 className="text-4xl font-extrabold text-center mb-12 text-white drop-shadow-2xl">
        Welcome to TaskMaster!
      </h1>
      <div className="bg-white/90 dark:bg-gray-900/90 p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="flex mb-8">
          <button
            className={`flex-1 py-2 font-bold rounded-l-2xl transition ${
              tab === "login"
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow"
                : "bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-300 border border-pink-200 dark:border-gray-700"
            }`}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 font-bold rounded-r-2xl transition ${
              tab === "signup"
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow"
                : "bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-300 border border-pink-200 dark:border-gray-700"
            }`}
            onClick={() => setTab("signup")}
          >
            Sign Up
          </button>
        </div>
        {tab === "login" ? <Login hideCard /> : <Signup hideCard />}
      </div>
    </div>
  );
}